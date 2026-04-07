// ========================================
// Main Application
// ========================================
const app = {
    currentUser: null,

    async init() {
        // Initialize database
        await database.init();

        // Initialize Marked.js configuration
        utils.initMarked();

        // Check if user is logged in
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showDashboard();
        }

        // Setup event listeners
        this.setupEventListeners();

        // Render courses
        ui.renderCoursesGrid();
    },

    showDashboard() {
        router.showPage('dashboard-page');
        const userName = this.currentUser.name;
        const userInitial = utils.getInitials(userName);
        
        // Update desktop user display
        document.getElementById('user-display').textContent = userName;
        document.getElementById('user-initial').textContent = userInitial;
        
        // Update mobile user display
        document.getElementById('mobile-user-display').textContent = userName;
        document.getElementById('mobile-user-avatar').textContent = userInitial;
        
        ui.updateDashboardProgress();
    },

    showLoading(show = true) {
        const indicator = document.getElementById('loading-indicator');
        if (show) {
            indicator.classList.remove('hidden');
        } else {
            indicator.classList.add('hidden');
        }
    },

    setupEventListeners() {
        // ==================== Login Form ====================
        document.getElementById('login-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            
            if (!username) {
                utils.showNotification('Please enter your name', 'warning');
                return;
            }

            this.showLoading(true);

            try {
                let user = await database.getUserByName(username);
                if (!user) {
                    const userId = await database.addUser(username);
                    user = { id: userId, name: username };
                }

                this.currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(user));
                utils.showNotification(`Selamat datang, ${user.name}!`, 'success');
                this.showDashboard();
            } catch (error) {
                utils.showNotification('Gagal login: ' + error.message, 'error');
            } finally {
                this.showLoading(false);
            }
        });

        // ==================== Import Data (Login Page) ====================
        document.getElementById('import-data-btn').addEventListener('click', () => {
            document.getElementById('import-file').click();
        });

        document.getElementById('import-file').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            this.showLoading(true);

            try {
                const result = await database.importData(file);
                utils.showNotification(
                    `✅ Impor berhasil! ${result.usersCount} user, ${result.progressCount} progres, ${result.certificatesCount} sertifikat`,
                    'success'
                );

                // Auto-login the first user if exists
                if (result.usersCount > 0) {
                    const users = await database.getAllUsers();
                    if (users && users.length > 0) {
                        this.currentUser = users[0];
                        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                        setTimeout(() => this.showDashboard(), 500);
                    }
                }

                setTimeout(() => location.reload(), 1500);
            } catch (error) {
                utils.showNotification('❌ Impor gagal: ' + error.message, 'error');
            } finally {
                this.showLoading(false);
                e.target.value = '';
            }
        });

        // ==================== Export Data ====================
        const handleExport = async () => {
            try {
                this.showLoading(true);
                const exportData = await database.exportAllData();
                const filename = `zenzalepik-backup-${new Date().toISOString().split('T')[0]}.json`;
                utils.downloadFile(exportData, filename);
                utils.showNotification('✅ Data berhasil diekspor!', 'success');
            } catch (error) {
                utils.showNotification('❌ Ekspor gagal: ' + error.message, 'error');
            } finally {
                this.showLoading(false);
            }
        };

        document.getElementById('export-data-btn').addEventListener('click', handleExport);
        document.getElementById('mobile-export-data-btn').addEventListener('click', handleExport);

        // ==================== Import Data (Nav) ====================
        const handleNavImport = () => {
            document.getElementById('nav-import-file').click();
        };

        document.getElementById('nav-import-data-btn').addEventListener('click', handleNavImport);
        document.getElementById('mobile-import-data-btn').addEventListener('click', handleNavImport);

        document.getElementById('nav-import-file').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            this.showLoading(true);

            try {
                const result = await database.importData(file);
                utils.showNotification(
                    `✅ Impor berhasil! ${result.usersCount} user, ${result.progressCount} progres, ${result.certificatesCount} sertifikat`,
                    'success'
                );
                setTimeout(() => location.reload(), 1500);
            } catch (error) {
                utils.showNotification('❌ Impor gagal: ' + error.message, 'error');
            } finally {
                this.showLoading(false);
                e.target.value = '';
            }
        });

        // ==================== Logout ====================
        const handleLogout = () => {
            localStorage.removeItem('currentUser');
            this.currentUser = null;
            router.showPage('login-page');
            document.getElementById('username').value = '';
            utils.showNotification('Berhasil keluar', 'success');
            this.closeMobileMenu();
        };

        document.getElementById('nav-logout-btn').addEventListener('click', handleLogout);
        document.getElementById('mobile-logout-btn').addEventListener('click', handleLogout);

        // ==================== Desktop Navigation ====================
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;

                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                if (page === 'dashboard') {
                    router.showDashboard();
                } else if (page === 'certificate') {
                    router.showCertificates();
                }
            });
        });

        // Back to Dashboard Button
        const backToDashboardBtn = document.getElementById('back-to-dashboard-btn');
        if (backToDashboardBtn) {
            backToDashboardBtn.addEventListener('click', (e) => {
                e.preventDefault();
                router.showDashboard();
            });
        }

        // ==================== Mobile Navigation ====================
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        const closeMobileMenuBtn = document.getElementById('close-mobile-menu');

        const openMobileMenu = () => {
            mobileMenuDrawer.classList.remove('translate-x-full');
            mobileMenuDrawer.classList.add('translate-x-0');
            mobileMenuOverlay.classList.remove('hidden', 'opacity-0');
            setTimeout(() => {
                mobileMenuOverlay.classList.add('opacity-100');
            }, 10);
            document.body.style.overflow = 'hidden';
        };

        this.closeMobileMenu = () => {
            mobileMenuDrawer.classList.remove('translate-x-0');
            mobileMenuDrawer.classList.add('translate-x-full');
            mobileMenuOverlay.classList.remove('opacity-100');
            mobileMenuOverlay.classList.add('opacity-0');
            setTimeout(() => {
                mobileMenuOverlay.classList.add('hidden');
            }, 300);
            document.body.style.overflow = '';
        };

        mobileMenuBtn.addEventListener('click', openMobileMenu);
        closeMobileMenuBtn.addEventListener('click', () => this.closeMobileMenu());
        mobileMenuOverlay.addEventListener('click', () => this.closeMobileMenu());

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.closeMobileMenu();

                if (page === 'dashboard') {
                    router.showDashboard();
                } else if (page === 'certificate') {
                    router.showCertificates();
                }
            });
        });
    },

    // ==================== Certificate Functions ====================
    printCertificate(courseName, completionDate) {
        const printWindow = window.open('', '_blank');
        
        if (!printWindow) {
            utils.showNotification('Izinkan popup untuk mencetak sertifikat', 'warning');
            return;
        }

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Certificate - ${courseName}</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css">
                <style>
                    @page { size: landscape; margin: 0; }
                    body {
                        font-family: 'Georgia', serif;
                        margin: 0;
                        padding: 40px;
                        background: white;
                    }
                    .certificate {
                        border: 20px solid #4f46e5;
                        padding: 60px;
                        text-align: center;
                        min-height: 80vh;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        position: relative;
                    }
                    .certificate::before {
                        content: '';
                        position: absolute;
                        top: 10px;
                        left: 10px;
                        right: 10px;
                        bottom: 10px;
                        border: 2px solid #4f46e5;
                        pointer-events: none;
                    }
                    h1 { 
                        font-size: 3rem; 
                        color: #4f46e5; 
                        margin-bottom: 40px;
                        font-weight: bold;
                    }
                    .cert-text { 
                        font-size: 1.2rem; 
                        color: #6b7280; 
                        margin: 20px 0;
                    }
                    .cert-name { 
                        font-size: 2.5rem; 
                        color: #1f2937; 
                        font-style: italic; 
                        margin: 30px 0;
                        font-weight: bold;
                    }
                    .cert-course { 
                        font-size: 2rem; 
                        color: #4f46e5; 
                        margin: 30px 0;
                    }
                    .cert-date { 
                        font-size: 1rem; 
                        color: #6b7280; 
                        margin-top: 40px;
                    }
                    .signature {
                        margin-top: 60px;
                        border-top: 2px solid #1f2937;
                        padding-top: 12px;
                        display: inline-block;
                        min-width: 200px;
                    }
                    @media print {
                        body { padding: 0; }
                        .certificate { border: 20px solid #4f46e5; }
                    }
                </style>
            </head>
            <body>
                <div class="certificate">
                    <h1><i class="ri-award-fill"></i> Certificate of Completion</h1>
                    <p class="cert-text">This certifies that</p>
                    <h2 class="cert-name">${this.currentUser.name}</h2>
                    <p class="cert-text">has successfully completed the chapter</p>
                    <h3 class="cert-course">${courseName}</h3>
                    <p class="cert-date"><i class="ri-calendar-line"></i> Completed on: ${completionDate}</p>
                    <div class="signature">
                        <p style="font-weight: bold;">Zen Zalepik</p>
                        <p style="font-size: 0.875rem; color: #6b7280;">Learning Platform</p>
                    </div>
                </div>
                <script>
                    window.onload = function() {
                        setTimeout(() => window.print(), 250);
                    }
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    },

    viewCertificate(courseName, completionDate) {
        // Close popup and open print view
        const overlay = document.querySelector('.certificate-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.remove();
                this.printCertificate(courseName, completionDate);
            }, 300);
        } else {
            this.printCertificate(courseName, completionDate);
        }
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => app.init());
