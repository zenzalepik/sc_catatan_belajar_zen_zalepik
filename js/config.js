// Database Configuration
const DB_NAME = 'ZenZalepikLearning';
const DB_VERSION = 1;

// Course Materials Configuration
const COURSES_CONFIG = {
    laravel: {
        id: 'laravel',
        title: 'Laravel',
        icon: 'ri-php-line',
        iconColor: 'text-red-500',
        description: 'Framework PHP Modern untuk Pengembangan Web',
        color: 'from-red-500 to-orange-500',
        mdFolder: 'md/laravel/'
    },
    rust: {
        id: 'rust',
        title: 'Rust',
        icon: 'ri-git-pull-request-line',
        iconColor: 'text-orange-600',
        description: 'Bahasa Pemrograman Sistem',
        color: 'from-orange-500 to-yellow-500',
        mdFolder: 'md/rust/'
    },
    python: {
        id: 'python',
        title: 'Python',
        icon: 'ri-python-line',
        iconColor: 'text-blue-500',
        description: 'Bahasa Pemrograman Serba Guna',
        color: 'from-blue-500 to-green-500',
        mdFolder: 'md/python/'
    },
    podman: {
        id: 'podman',
        title: 'Podman',
        icon: 'ri-container-line',
        iconColor: 'text-blue-600',
        description: 'Container Engine untuk Deployment Modern',
        color: 'from-blue-600 to-cyan-500',
        mdFolder: 'md/podman/'
    }
};
