// ========================================
// UI Rendering Functions
// ========================================

const ui = {
    // ==================== Render Courses Grid ====================
    renderCoursesGrid() {
        const container = document.getElementById('courses-grid');
        container.innerHTML = Object.values(COURSES_CONFIG).map(course => {
            // Get first letter of course title
            const initial = course.title.charAt(0).toUpperCase();
            
            return `
            <div class="card bg-white hover:shadow-soft-lg transition-all duration-300 cursor-pointer course-card border border-gray-200 group" data-course="${course.id}">
                <div class="card-body p-6">
                    <!-- Icon with gradient background -->
                    <div class="w-16 h-16 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span class="text-3xl font-display font-bold text-white">${initial}</span>
                    </div>

                    <h3 class="text-xl font-display font-bold text-gray-900 mb-2">${course.title}</h3>
                    <p class="text-gray-600 mb-6 course-description text-sm leading-relaxed">${course.description}</p>

                    <!-- Progress Section -->
                    <div class="mb-6 mt-auto">
                        <div class="flex justify-between items-center mb-2">
                            <span class="font-medium text-gray-600 text-sm">Progress</span>
                            <span class="progress-text font-bold text-primary-600 text-sm">0% Selesai</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden progress-bar">
                            <div class="progress-fill h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" style="width: 0%"></div>
                        </div>
                    </div>

                    <!-- Action Button -->
                    <button class="w-full py-3 px-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 flex items-center justify-center gap-2 group/btn start-course" data-course="${course.id}">
                        <span>Mulai Belajar</span>
                        <i class="ri-arrow-right-line group-hover/btn:translate-x-1 transition-transform"></i>
                    </button>
                </div>
            </div>
        `;
        }).join('');

        // Add click listeners
        container.querySelectorAll('.course-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const courseId = card.dataset.course;
                router.showChaptersList(courseId);
            });
        });

        // Add click listeners to buttons
        container.querySelectorAll('.start-course').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const courseId = button.dataset.course;
                router.showChaptersList(courseId);
            });
        });
    },

    // ==================== Render Chapters List ====================
    createChapterListView(courseId) {
        const course = COURSES_CONFIG[courseId];
        const chapters = CHAPTERS_DATA[courseId];
        const container = document.getElementById('chapters-list-container');
        
        // Get first letter of course title
        const initial = course.title.charAt(0).toUpperCase();

        container.innerHTML = `
            <div class="card shadow-soft-lg mb-8 overflow-hidden border border-gray-200 rounded-3xl">
                <div class="card-body bg-gradient-to-r ${course.color} text-white p-8">
                    <div class="flex items-center gap-5">
                        <div class="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-lg flex-shrink-0">
                            <span class="text-3xl font-display font-bold text-white">${initial}</span>
                        </div>
                        <div>
                            <h1 class="text-3xl font-display font-bold mb-1">${course.title}</h1>
                            <p class="opacity-90 text-sm leading-relaxed">${course.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-3 mb-6">
                <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
                    <i class="ri-book-mark-line text-white text-xl"></i>
                </div>
                <h2 class="text-2xl font-display font-bold text-gray-900">Daftar Chapter</h2>
            </div>

            <div class="space-y-3" id="chapters-list-view"></div>
        `;

        const chaptersListView = document.getElementById('chapters-list-view');

        chapters.forEach((chapter, index) => {
            const chapterCard = document.createElement('div');
            chapterCard.className = 'chapter-card card bg-white border border-gray-200 hover:border-primary-300 rounded-2xl';
            chapterCard.innerHTML = `
                <div class="card-body p-5 chapter-header flex justify-between items-center cursor-pointer">
                    <div class="flex items-center gap-4">
                        <span class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0">
                            ${index + 1}
                        </span>
                        <span class="font-semibold text-lg chapter-title text-gray-900">${chapter.title}</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="badge badge-ghost status-badge pending text-xs px-4 py-2 rounded-full font-medium" id="status-list-${chapter.id}">
                            <i class="ri-time-line mr-1"></i> Belum Selesai
                        </span>
                        <i class="ri-arrow-right-s-line text-2xl text-gray-400"></i>
                    </div>
                </div>
            `;

            chaptersListView.appendChild(chapterCard);
        });

        // Add event listeners
        chaptersListView.querySelectorAll('.chapter-header').forEach(header => {
            header.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const chapterId = header.closest('.chapter-card').querySelector('.status-badge').id.replace('status-list-', '');
                const chapterCard = header.closest('.chapter-card');

                // Allow re-visiting completed chapters for review
                if (chapterCard.classList.contains('completed')) {
                    utils.showNotification('Membuka chapter yang sudah selesai untuk ditinjau', 'success');
                }

                await this.openIsolatedChapter(courseId, chapterId);
            });
        });

        // Load existing progress
        this.loadChapterListProgress(courseId);
    },

    // ==================== Load Chapter Progress ====================
    async loadChapterListProgress(courseId) {
        if (!app.currentUser) return;

        try {
            const progress = await database.getUserProgress(app.currentUser.id);

            CHAPTERS_DATA[courseId].forEach(chapter => {
                const chapterProgress = progress.find(p => p.chapterId === chapter.id);

                if (chapterProgress && chapterProgress.completed) {
                    const statusBadge = document.getElementById(`status-list-${chapter.id}`);
                    const chapterCard = document.querySelector(`#status-list-${chapter.id}`)?.closest('.chapter-card');

                    if (statusBadge) {
                        statusBadge.innerHTML = '<i class="ri-check-line mr-1"></i> Selesai';
                        statusBadge.classList.remove('pending', 'badge-ghost');
                        statusBadge.classList.add('completed', 'badge-success');
                    }

                    if (chapterCard) {
                        chapterCard.classList.add('completed');
                    }
                }
            });
        } catch (error) {
            console.error('Error loading progress:', error);
        }
    },

    // ==================== Isolated Chapter View ====================
    async openIsolatedChapter(courseId, chapterId) {
        const course = COURSES_CONFIG[courseId];
        const chapter = CHAPTERS_DATA[courseId].find(c => c.id === chapterId);
        const container = document.getElementById('material-container');

        router.showMaterialView();

        // Show loading state
        container.innerHTML = `
            <div class="max-w-4xl mx-auto">
                <div class="card shadow-soft-lg bg-white animate-pulse rounded-3xl">
                    <div class="card-body p-8">
                        <div class="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div class="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                </div>
            </div>
        `;

        // Load markdown content
        const contentHtml = await utils.loadMarkdownFile(chapter.mdFile);
        
        // Get first letter of course title
        const initial = course.title.charAt(0).toUpperCase();

        container.innerHTML = `
            <div class="max-w-4xl mx-auto animate-slide-up">
                <!-- Navigation -->
                <div class="mb-6 flex items-center justify-between">
                    <button class="back-to-chapters-top-btn inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                        <i class="ri-arrow-left-line"></i> Kembali ke Daftar Chapter
                    </button>
                    <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-700">
                        <span class="w-6 h-6 rounded bg-gradient-to-br ${course.color} flex items-center justify-center text-white text-xs font-bold">${initial}</span>
                        ${course.title}
                    </span>
                </div>

                <!-- Content Card -->
                <div class="card shadow-soft-lg bg-white border border-gray-200 overflow-hidden rounded-3xl">
                    <!-- Header -->
                    <div class="card-body bg-gradient-to-r ${course.color} text-white p-8">
                        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <p class="text-white/80 text-sm font-medium mb-1 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                    Chapter ${CHAPTERS_DATA[courseId].findIndex(c => c.id === chapterId) + 1}
                                </p>
                                <h1 class="text-3xl font-display font-bold chapter-title-large">${chapter.title}</h1>
                            </div>
                            <div class="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-lg flex-shrink-0">
                                <span class="text-2xl font-display font-bold text-white">${initial}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Markdown Content -->
                    <div class="p-8 content-body-wrapper bg-white">
                        <div class="content-body prose prose-lg max-w-none ${chapter.id}-content">
                            ${contentHtml}
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="card-actions justify-center p-6 pt-0 gap-4 bg-white">
                        <button class="complete-chapter-btn py-3.5 px-8 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 inline-flex items-center gap-2" data-chapter="${chapterId}" data-course="${courseId}">
                            <i class="ri-checkbox-circle-line text-xl"></i> Selesaikan Chapter Ini
                        </button>
                        <button class="back-to-chapters-btn py-3.5 px-8 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all inline-flex items-center gap-2">
                            <i class="ri-arrow-left-line"></i> Kembali
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners to back buttons
        container.querySelectorAll('.back-to-chapters-top-btn, .back-to-chapters-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                router.showChaptersList(courseId);
            });
        });

        // Add copy buttons and language labels to code blocks
        this.addCopyButtonsAndLanguageLabels(container);

        // Apply Prism syntax highlighting
        this.applySyntaxHighlighting(container);

        // Add event listener for complete button
        container.querySelector('.complete-chapter-btn').addEventListener('click', async (e) => {
            e.stopPropagation();
            const btn = e.target.closest('button');

            if (btn.disabled) return;
            btn.disabled = true;

            // Save progress
            await database.saveProgress(app.currentUser.id, chapterId, courseId, true);

            // Add certificate
            await database.addCertificate(app.currentUser.id, chapterId, `${course.title} - ${chapter.title}`);

            // Show success state
            btn.classList.add('bg-gradient-to-r', 'from-success', 'to-emerald-500');
            btn.classList.remove('from-primary-500', 'to-primary-600');
            btn.innerHTML = '<i class="ri-check-line"></i> Chapter Selesai!';

            // Update back button
            const backBtn = container.querySelector('.back-to-chapters-btn');
            backBtn.innerHTML = '<i class="ri-refresh-line"></i> Lihat Daftar Chapter';
            backBtn.onclick = () => {
                router.showChaptersList(courseId);
                // Update progress on the chapter list
                setTimeout(() => this.loadChapterListProgress(courseId), 100);
            };

            // Update dashboard progress
            this.updateDashboardProgress();

            // Show certificate popup
            this.showCertificatePopup(`${course.title} - ${chapter.title}`);
        });

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // ==================== Update Dashboard Progress ====================
    async updateDashboardProgress() {
        if (!app.currentUser) return;

        try {
            const progress = await database.getUserProgress(app.currentUser.id);

            Object.keys(COURSES_CONFIG).forEach(courseId => {
                const course = COURSES_CONFIG[courseId];
                const courseCard = document.querySelector(`.course-card[data-course="${courseId}"]`);

                if (courseCard) {
                    const completedChapters = progress.filter(p =>
                        p.courseId === courseId && p.completed
                    ).length;

                    const totalChapters = CHAPTERS_DATA[courseId].length;
                    const percentage = Math.round((completedChapters / totalChapters) * 100);

                    const progressBar = courseCard.querySelector('.progress-fill');
                    const progressText = courseCard.querySelector('.progress-text');

                    if (progressBar) {
                        progressBar.style.width = `${percentage}%`;
                    }
                    if (progressText) {
                        progressText.textContent = `${percentage}% Selesai`;
                    }
                }
            });
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    },

    // ==================== Load Certificates ====================
    async loadCertificates() {
        if (!app.currentUser) return;

        try {
            const certificates = await database.getUserCertificates(app.currentUser.id);
            const container = document.getElementById('certificates-list');

            if (certificates.length === 0) {
                container.innerHTML = `
                    <div class="col-span-full text-center py-20 bg-white rounded-3xl shadow-soft-lg border border-gray-100 animate-slide-up">
                        <div class="w-24 h-24 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center mx-auto mb-6">
                            <i class="ri-file-list-3-line text-5xl text-primary-600"></i>
                        </div>
                        <h3 class="text-2xl font-display font-bold text-gray-900 mb-3">Belum ada sertifikat</h3>
                        <p class="text-gray-500 mb-8 max-w-md mx-auto px-4 leading-relaxed">Selesaikan chapter untuk mendapatkan sertifikat dan lacak pencapaian belajarmu!</p>
                        <button class="inline-flex items-center gap-2 py-3 px-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 transition-all" onclick="router.showDashboard()">
                            <i class="ri-book-open-line"></i> Mulai Belajar
                        </button>
                    </div>
                `;
                return;
            }

            container.innerHTML = certificates.map((cert, index) => `
                <div class="card border-2 border-primary-100 hover:border-accent-300 hover:shadow-soft-lg transition-all duration-300 bg-white group animate-slide-up certificate-card" style="animation-delay: ${index * 0.1}s">
                    <div class="card-body text-center p-6">
                        <!-- Icon -->
                        <div class="w-20 h-20 rounded-full bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-accent-500/30">
                            <i class="ri-award-fill text-3xl text-white"></i>
                        </div>

                        <!-- Content -->
                        <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 leading-snug">${cert.chapterName}</h3>
                        <p class="text-sm text-gray-500 mb-4">Sertifikat Penyelesaian</p>

                        <!-- Date -->
                        <div class="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full mb-6">
                            <i class="ri-calendar-line text-primary-600"></i>
                            <span class="text-sm font-medium text-gray-700">${utils.formatDate(cert.earnedAt)}</span>
                        </div>

                        <!-- Print Button -->
                        <button class="w-full py-2.5 px-4 bg-gradient-to-r from-success to-emerald-500 hover:from-success/90 hover:to-emerald-500/90 text-white font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2" onclick="app.printCertificate('${cert.chapterName.replace(/'/g, "\\'")}', '${utils.formatDate(cert.earnedAt)}')">
                            <i class="ri-printer-line"></i> Cetak Sertifikat
                        </button>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading certificates:', error);
            document.getElementById('certificates-list').innerHTML = `
                <div class="col-span-full text-center py-16">
                    <p class="text-error">Failed to load certificates</p>
                </div>
            `;
        }
    },

    // ==================== Certificate Popup ====================
    showCertificatePopup(courseName) {
        const completionDate = utils.formatDate(new Date());

        // Remove existing overlay if any
        const existingOverlay = document.querySelector('.certificate-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }

        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in certificate-overlay';

        overlay.innerHTML = `
            <div class="bg-white rounded-3xl p-0 max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in">
                <!-- Certificate Preview -->
                <div class="m-8 rounded-2xl p-8 bg-gradient-to-br from-primary-50 via-accent-50 to-primary-50 border-2 border-primary-200">
                    <div class="text-center">
                        <!-- Header -->
                        <div class="mb-8">
                            <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 mb-4 shadow-lg shadow-primary-500/30">
                                <i class="ri-award-fill text-4xl text-white"></i>
                            </div>
                            <h1 class="text-3xl font-display font-bold text-gray-900 mb-2">Sertifikat Penyelesaian</h1>
                        </div>

                        <!-- Content -->
                        <div class="space-y-6">
                            <p class="text-gray-600 text-lg">Ini menandakan bahwa</p>
                            <h2 class="text-3xl font-display font-bold text-gray-900 bg-white px-8 py-4 rounded-xl shadow-sm inline-block mx-auto border border-gray-100">
                                ${app.currentUser.name}
                            </h2>
                            <p class="text-gray-600 text-lg">telah berhasil menyelesaikan chapter</p>
                            <h3 class="text-xl font-bold text-primary-600 bg-white px-6 py-3 rounded-xl shadow-sm inline-block mx-auto border border-primary-100">
                                ${courseName}
                            </h3>
                            <p class="text-sm text-gray-500 mt-6 inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100">
                                <i class="ri-calendar-line text-primary-500"></i> Selesai pada: ${completionDate}
                            </p>
                        </div>

                        <!-- Signature -->
                        <div class="mt-12 flex justify-center">
                            <div class="text-center">
                                <div class="w-40 h-20 mx-auto mb-3 relative">
                                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 80'%3E%3Cpath d='M10,60 Q30,40 50,60 T90,60 T130,60 T170,60' stroke='%236366f1' stroke-width='3' fill='none'/%3E%3C/svg%3E" alt="Signature" class="w-full h-full object-contain">
                                </div>
                                <p class="font-bold text-gray-900 font-display">Zen Zalepik</p>
                                <p class="text-xs text-gray-500">Learning Platform</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="px-6 pb-6 flex flex-col sm:flex-row gap-3">
                    <button class="flex-1 py-3 px-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 transition-all flex items-center justify-center gap-2" onclick="app.viewCertificate('${courseName.replace(/'/g, "\\'")}', '${completionDate}')">
                        <i class="ri-eye-line"></i> Lihat & Cetak
                    </button>
                    <button class="flex-1 py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all flex items-center justify-center gap-2" onclick="this.closest('.certificate-overlay').remove()">
                        <i class="ri-close-line"></i> Tutup
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Close on backdrop click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    },

    // ==================== Add Copy Buttons and Language Labels ====================
    addCopyButtonsAndLanguageLabels(container) {
        const codeBlocks = container.querySelectorAll('pre');
        
        // Language color mapping
        const languageColors = {
            'javascript': 'text-yellow-400',
            'js': 'text-yellow-400',
            'python': 'text-blue-400',
            'py': 'text-blue-400',
            'php': 'text-purple-400',
            'html': 'text-orange-500',
            'css': 'text-blue-500',
            'rust': 'text-orange-300',
            'sql': 'text-cyan-600',
            'json': 'text-yellow-300',
            'markdown': 'text-blue-600',
            'md': 'text-blue-600',
            'shell': 'text-green-400',
            'bash': 'text-green-400',
            'typescript': 'text-blue-400',
            'ts': 'text-blue-400',
            'jsx': 'text-cyan-400',
            'tsx': 'text-cyan-400',
            'vue': 'text-green-500',
            'java': 'text-red-400',
            'go': 'text-cyan-500',
            'ruby': 'text-red-500',
            'swift': 'text-orange-500',
            'kotlin': 'text-purple-500',
            'c': 'text-blue-300',
            'cpp': 'text-blue-400',
            'csharp': 'text-green-600',
            'cs': 'text-green-600',
        };

        codeBlocks.forEach((pre) => {
            // Skip if already processed
            if (pre.parentElement.classList.contains('code-block-wrapper')) {
                return;
            }

            // Get language from code element
            const code = pre.querySelector('code');
            let language = 'plaintext';
            
            if (code) {
                // Extract language from class (e.g., language-javascript, lang-php)
                const className = code.className;
                const langMatch = className.match(/language-(\w+)/) || className.match(/lang-(\w+)/);
                if (langMatch) {
                    language = langMatch[1].toLowerCase();
                }
            }

            // Get color class for language
            const colorClass = languageColors[language] || 'text-gray-400';

            // Wrap pre in relative container
            const wrapper = document.createElement('div');
            wrapper.className = 'code-block-wrapper relative';
            pre.parentNode.insertBefore(wrapper, pre);
            wrapper.appendChild(pre);

            // Create header with language label and copy button
            const header = document.createElement('div');
            header.className = 'code-block-header flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700 rounded-t-lg';
            header.innerHTML = `
                <div class="flex items-center gap-2">
                    <div class="flex gap-1.5">
                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                        <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div class="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span class="ml-3 text-xs font-medium ${colorClass} uppercase tracking-wide">${language}</span>
                </div>
                <button class="copy-code-btn px-3 py-1.5 bg-gray-700/80 hover:bg-gray-600 text-gray-300 hover:text-white text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 backdrop-blur-sm">
                    <i class="ri-file-copy-line"></i>
                    <span>Copy</span>
                </button>
            `;

            wrapper.insertBefore(header, pre);
            pre.classList.add('rounded-b-lg', '!mt-0');

            // Add copy button handler
            const copyBtn = header.querySelector('.copy-code-btn');
            copyBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();

                const codeText = code?.textContent || pre.textContent;

                try {
                    await navigator.clipboard.writeText(codeText);
                    
                    // Show success state
                    copyBtn.innerHTML = `
                        <i class="ri-check-line"></i>
                        <span>Copied!</span>
                    `;
                    copyBtn.classList.remove('bg-gray-700/80', 'hover:bg-gray-600');
                    copyBtn.classList.add('bg-success/80', 'hover:bg-success');

                    // Reset after 2 seconds
                    setTimeout(() => {
                        copyBtn.innerHTML = `
                            <i class="ri-file-copy-line"></i>
                            <span>Copy</span>
                        `;
                        copyBtn.classList.add('bg-gray-700/80', 'hover:bg-gray-600');
                        copyBtn.classList.remove('bg-success/80', 'hover:bg-success');
                    }, 2000);
                } catch (err) {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = codeText;
                    textArea.style.position = 'fixed';
                    textArea.style.left = '-999999px';
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                        document.execCommand('copy');
                        copyBtn.innerHTML = `
                            <i class="ri-check-line"></i>
                            <span>Copied!</span>
                        `;
                        setTimeout(() => {
                            copyBtn.innerHTML = `
                                <i class="ri-file-copy-line"></i>
                                <span>Copy</span>
                            `;
                        }, 2000);
                    } catch (err) {
                        console.error('Failed to copy:', err);
                    }
                    document.body.removeChild(textArea);
                }
            });
        });
    },

    // ==================== Apply Syntax Highlighting ====================
    applySyntaxHighlighting(container) {
        // Re-run Prism highlighting on all code blocks
        if (window.Prism) {
            Prism.highlightAllUnder(container);
        }
    }
};
