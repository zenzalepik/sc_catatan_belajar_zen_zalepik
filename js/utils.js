// ========================================
// Utility Functions
// ========================================

const utils = {
    // ==================== Configure Marked.js ====================
    initMarked() {
        // Configure marked to use Prism-compatible code blocks
        marked.setOptions({
            highlight: function(code, lang) {
                if (window.Prism && Prism.languages[lang]) {
                    return Prism.highlight(code, Prism.languages[lang], lang);
                }
                return code;
            },
            breaks: true,
            gfm: true
        });
    },

    // ==================== Date Formatting ====================
    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // ==================== File Download ====================
    downloadFile(data, filename) {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    // ==================== Markdown Loading ====================
    async loadMarkdownFile(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}`);
            }
            const markdown = await response.text();
            return marked.parse(markdown);
        } catch (error) {
            console.error('Error loading markdown:', error);
            return `
                <div class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <i class="ri-error-warning-line text-5xl text-red-500 mb-4"></i>
                    <h3 class="text-xl font-bold text-red-700 mb-2">Content Not Available</h3>
                    <p class="text-red-600">Failed to load: ${filePath}</p>
                    <p class="text-red-500 text-sm mt-2">${error.message}</p>
                </div>
            `;
        }
    },

    // ==================== Toast Notifications ====================
    showNotification(message, type = 'success') {
        const container = document.getElementById('toast-container');

        const notification = document.createElement('div');
        notification.className = `toast toast-top toast-end z-50`;

        const alertClass = type === 'success' ? 'alert-success' :
                          type === 'error' ? 'alert-error' : 'alert-warning';

        const icon = type === 'success' ? 'ri-check-line' :
                    type === 'error' ? 'ri-error-warning-line' : 'ri-alert-line';

        notification.innerHTML = `
            <div class="alert ${alertClass} text-white shadow-lg min-w-[300px]">
                <i class="${icon} text-xl"></i>
                <span>${message}</span>
            </div>
        `;

        container.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            notification.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    },

    // ==================== Get Initials ====================
    getInitials(name) {
        if (!name) return 'U';
        return name.charAt(0).toUpperCase();
    },

    // ==================== Debounce Function ====================
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // ==================== Format File Size ====================
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    },

    // ==================== Show Loading Overlay ====================
    showLoading(message = 'Loading...') {
        const overlay = document.createElement('div');
        overlay.id = 'global-loading-overlay';
        overlay.className = 'fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center';
        overlay.innerHTML = `
            <div class="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-sm mx-4">
                <div class="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p class="text-gray-600 font-medium">${message}</p>
            </div>
        `;
        document.body.appendChild(overlay);
    },

    hideLoading() {
        const overlay = document.getElementById('global-loading-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }
    },

    // ==================== Confirm Dialog ====================
    async confirm(message, title = 'Confirm') {
        return new Promise((resolve) => {
            const overlay = document.createElement('div');
            overlay.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in';
            overlay.innerHTML = `
                <div class="bg-white rounded-2xl p-6 shadow-2xl max-w-sm mx-4 animate-scale-in">
                    <h3 class="text-xl font-bold text-gray-800 mb-2">${title}</h3>
                    <p class="text-gray-600 mb-6">${message}</p>
                    <div class="flex gap-3">
                        <button id="confirm-cancel" class="btn btn-ghost flex-1">Cancel</button>
                        <button id="confirm-ok" class="btn btn-primary flex-1">Confirm</button>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);

            const cleanup = () => {
                overlay.remove();
            };

            overlay.querySelector('#confirm-ok').addEventListener('click', () => {
                cleanup();
                resolve(true);
            });

            overlay.querySelector('#confirm-cancel').addEventListener('click', () => {
                cleanup();
                resolve(false);
            });

            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    cleanup();
                    resolve(false);
                }
            });
        });
    }
};
