// ========================================
// Router / Navigation Functions
// ========================================

const router = {
    showPage(pageId) {
        const pages = document.querySelectorAll('.page');
        const targetPage = document.getElementById(pageId);

        // Hide all pages immediately
        pages.forEach(page => {
            page.classList.add('hidden');
            page.classList.remove('active');
            page.style.opacity = '';
        });

        // Show target page
        if (targetPage) {
            targetPage.classList.remove('hidden');
            targetPage.classList.add('active');
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    showContentSection(sectionId) {
        const sections = document.querySelectorAll('.content-section');
        const targetSection = document.getElementById(sectionId);

        // Hide all sections
        sections.forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('active');
            section.style.opacity = '';
            section.style.display = '';
        });

        // Show target section with explicit styles
        if (targetSection) {
            targetSection.classList.remove('hidden');
            targetSection.classList.add('active');
            targetSection.style.display = 'block';
            targetSection.style.opacity = '1';
            targetSection.style.visibility = 'visible';
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    showDashboard() {
        this.showContentSection('dashboard-content');

        // Update nav links active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === 'dashboard') {
                link.classList.add('active');
            }
        });

        // Update progress
        if (ui.updateDashboardProgress) {
            ui.updateDashboardProgress();
        }
    },

    showChaptersList(courseId) {
        this.showContentSection('chapters-list-content');

        if (ui.createChapterListView) {
            ui.createChapterListView(courseId);
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    showMaterialView() {
        this.showContentSection('material-content');

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    showCertificates() {
        this.showContentSection('certificate-content');

        // Update nav links active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === 'certificate') {
                link.classList.add('active');
            }
        });

        // Load certificates
        if (ui.loadCertificates) {
            ui.loadCertificates();
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};
