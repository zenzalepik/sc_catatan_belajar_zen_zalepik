// IndexedDB Database Functions
let db = null;

const database = {
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            
            request.onerror = () => reject(request.error);
            
            request.onupgradeneeded = (event) => {
                const database = event.target.result;
                
                // Users store
                if (!database.objectStoreNames.contains('users')) {
                    const userStore = database.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
                    userStore.createIndex('name', 'name', { unique: false });
                }
                
                // Progress store
                if (!database.objectStoreNames.contains('progress')) {
                    const progressStore = database.createObjectStore('progress', { keyPath: 'id', autoIncrement: true });
                    progressStore.createIndex('userId', 'userId', { unique: false });
                    progressStore.createIndex('chapterId', 'chapterId', { unique: false });
                }
                
                // Certificates store
                if (!database.objectStoreNames.contains('certificates')) {
                    const certStore = database.createObjectStore('certificates', { keyPath: 'id', autoIncrement: true });
                    certStore.createIndex('userId', 'userId', { unique: false });
                }
            };
            
            request.onsuccess = (event) => {
                db = event.target.result;
                resolve(db);
            };
        });
    },

    // User Functions
    async addUser(name) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['users'], 'readwrite');
            const store = transaction.objectStore('users');
            const request = store.add({ name, createdAt: new Date() });
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    async getUserByName(name) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['users'], 'readonly');
            const store = transaction.objectStore('users');
            const index = store.index('name');
            const request = index.get(name);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    async getAllUsers() {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['users'], 'readonly');
            const store = transaction.objectStore('users');
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    // Progress Functions
    async saveProgress(userId, chapterId, courseId, completed) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['progress'], 'readwrite');
            const store = transaction.objectStore('progress');
            const index = store.index('userId');
            const request = index.getAll(userId);
            
            request.onsuccess = () => {
                const existing = request.result.find(p => p.chapterId === chapterId);
                
                if (existing) {
                    existing.completed = completed;
                    existing.completedAt = completed ? new Date() : null;
                    const updateRequest = store.put(existing);
                    updateRequest.onsuccess = () => resolve(updateRequest.result);
                    updateRequest.onerror = () => reject(updateRequest.error);
                } else {
                    const addRequest = store.add({
                        userId,
                        chapterId,
                        courseId,
                        completed,
                        completedAt: completed ? new Date() : null,
                        createdAt: new Date()
                    });
                    addRequest.onsuccess = () => resolve(addRequest.result);
                    addRequest.onerror = () => reject(addRequest.error);
                }
            };
            
            request.onerror = () => reject(request.error);
        });
    },

    async getUserProgress(userId) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['progress'], 'readonly');
            const store = transaction.objectStore('progress');
            const index = store.index('userId');
            const request = index.getAll(userId);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    // Certificate Functions
    async addCertificate(userId, chapterId, chapterName) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['certificates'], 'readwrite');
            const store = transaction.objectStore('certificates');
            const request = store.add({
                userId,
                chapterId,
                chapterName,
                earnedAt: new Date()
            });
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    async getUserCertificates(userId) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['certificates'], 'readonly');
            const store = transaction.objectStore('certificates');
            const index = store.index('userId');
            const request = index.getAll(userId);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    async checkChapterCompletion(userId, chapterId) {
        const progress = await this.getUserProgress(userId);
        const chapterProgress = progress.find(p => p.chapterId === chapterId);
        return chapterProgress && chapterProgress.completed;
    },

    // Export/Import Functions
    async exportAllData() {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['users', 'progress', 'certificates'], 'readonly');
            
            const usersStore = transaction.objectStore('users');
            const progressStore = transaction.objectStore('progress');
            const certificatesStore = transaction.objectStore('certificates');
            
            Promise.all([
                new Promise(r => usersStore.getAll().onsuccess = e => r(e.target.result)),
                new Promise(r => progressStore.getAll().onsuccess = e => r(e.target.result)),
                new Promise(r => certificatesStore.getAll().onsuccess = e => r(e.target.result))
            ]).then(([users, progress, certificates]) => {
                resolve({
                    version: DB_VERSION,
                    exportDate: new Date().toISOString(),
                    data: { users, progress, certificates }
                });
            });
        });
    },

    async importData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = async (event) => {
                try {
                    const importData = JSON.parse(event.target.result);
                    
                    if (!importData.data || !importData.data.users) {
                        throw new Error('Invalid backup file format');
                    }
                    
                    const transaction = db.transaction(['users', 'progress', 'certificates'], 'readwrite');
                    
                    transaction.objectStore('users').clear();
                    transaction.objectStore('progress').clear();
                    transaction.objectStore('certificates').clear();
                    
                    importData.data.users.forEach(user => transaction.objectStore('users').add(user));
                    importData.data.progress.forEach(progress => transaction.objectStore('progress').add(progress));
                    importData.data.certificates.forEach(cert => transaction.objectStore('certificates').add(cert));
                    
                    transaction.oncomplete = () => {
                        resolve({
                            usersCount: importData.data.users.length,
                            progressCount: importData.data.progress.length,
                            certificatesCount: importData.data.certificates.length
                        });
                    };
                    
                    transaction.onerror = () => reject(transaction.error);
                } catch (error) {
                    reject(error);
                }
            };
            
            reader.onerror = () => reject(reader.error);
            reader.readAsText(file);
        });
    }
};
