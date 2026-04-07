// Course Chapters Data - Modular Version
// File ini menggantikan data.js yang lama dengan sistem modular

// Laravel Course Chapters Data
const laravelChapters = [
    {
        id: 'laravel-1',
        title: 'Pengenalan Laravel',
        mdFile: 'md/laravel/01-introduction.md',
        subChapters: [
            { id: 'laravel-1-1', title: 'Apa itu Laravel?', mdFile: 'md/laravel/01-introduction.md#apa-itu-laravel' },
            { id: 'laravel-1-2', title: 'Fitur Utama', mdFile: 'md/laravel/01-introduction.md#fitur-utama' },
            { id: 'laravel-1-3', title: 'Instalasi', mdFile: 'md/laravel/01-introduction.md#instalasi' }
        ]
    },
    {
        id: 'laravel-2',
        title: 'Dasar-dasar Eloquent ORM',
        mdFile: 'md/laravel/02-eloquent-orm.md',
        subChapters: [
            { id: 'laravel-2-1', title: 'Model & Migration', mdFile: 'md/laravel/02-eloquent-orm.md#model-migration' },
            { id: 'laravel-2-2', title: 'Query Builder', mdFile: 'md/laravel/02-eloquent-orm.md#query-builder' },
            { id: 'laravel-2-3', title: 'Relationships', mdFile: 'md/laravel/02-eloquent-orm.md#relationships' }
        ]
    },
    {
        id: 'laravel-3',
        title: 'Template Blade',
        mdFile: 'md/laravel/03-blade-templates.md',
        subChapters: [
            { id: 'laravel-3-1', title: 'Blade Syntax', mdFile: 'md/laravel/03-blade-templates.md#blade-syntax' },
            { id: 'laravel-3-2', title: 'Layouts', mdFile: 'md/laravel/03-blade-templates.md#layouts' },
            { id: 'laravel-3-3', title: 'Components', mdFile: 'md/laravel/03-blade-templates.md#components' }
        ]
    }
];

// Python Course Chapters Data
const pythonChapters = [
    {
        id: 'python-1',
        title: 'Dasar-dasar Python',
        mdFile: 'md/python/01-basics.md',
        subChapters: [
            { id: 'python-1-1', title: 'Variabel & Tipe Data', mdFile: 'md/python/01-basics.md#variabel-dan-tipe-data' },
            { id: 'python-1-2', title: 'String Operations', mdFile: 'md/python/01-basics.md#string' },
            { id: 'python-1-3', title: 'Control Structures', mdFile: 'md/python/01-basics.md#control-structures' }
        ]
    },
    {
        id: 'python-2',
        title: 'Struktur Data',
        mdFile: 'md/python/02-data-structures.md',
        subChapters: [
            { id: 'python-2-1', title: 'Lists & Tuples', mdFile: 'md/python/02-data-structures.md#lists-tuples' },
            { id: 'python-2-2', title: 'Dictionaries', mdFile: 'md/python/02-data-structures.md#dictionaries' },
            { id: 'python-2-3', title: 'Sets', mdFile: 'md/python/02-data-structures.md#sets' }
        ]
    },
    {
        id: 'python-3',
        title: 'Fungsi dan Modul',
        mdFile: 'md/python/03-functions-modules.md',
        subChapters: [
            { id: 'python-3-1', title: 'Function Basics', mdFile: 'md/python/03-functions-modules.md#function-basics' },
            { id: 'python-3-2', title: 'Lambda & Higher-Order', mdFile: 'md/python/03-functions-modules.md#lambda' },
            { id: 'python-3-3', title: 'Modules & Packages', mdFile: 'md/python/03-functions-modules.md#modules' }
        ]
    }
];

// Rust Course Chapters Data
const rustChapters = [
    {
        id: 'rust-1',
        title: 'Fundamental Rust',
        mdFile: 'md/rust/01-fundamentals.md',
        subChapters: [
            { id: 'rust-1-1', title: 'Variabel & Tipe Data', mdFile: 'md/rust/01-fundamentals.md#variabel-dan-mutability' },
            { id: 'rust-1-2', title: 'Functions', mdFile: 'md/rust/01-fundamentals.md#functions' },
            { id: 'rust-1-3', title: 'Control Flow', mdFile: 'md/rust/01-fundamentals.md#control-flow' }
        ]
    },
    {
        id: 'rust-2',
        title: 'Cheatshet CRUD dengan Egui Eframe',
        mdFile: 'md/rust/02-crud-egui-eframe.md',
        subChapters: [
            { id: 'rust-2-1', title: 'Setup Egui', mdFile: 'md/rust/02-crud-egui-eframe.md#setup-egui' },
            { id: 'rust-2-2', title: 'UI Components', mdFile: 'md/rust/02-crud-egui-eframe.md#ui-components' },
            { id: 'rust-2-3', title: 'CRUD Operations', mdFile: 'md/rust/02-crud-egui-eframe.md#crud-operations' }
        ]
    },
    {
        id: 'rust-3',
        title: 'Ownership dan Borrowing',
        mdFile: 'md/rust/03-ownership-borrowing.md',
        subChapters: [
            { id: 'rust-3-1', title: 'Ownership Rules', mdFile: 'md/rust/03-ownership-borrowing.md#ownership-rules' },
            { id: 'rust-3-2', title: 'Borrowing', mdFile: 'md/rust/03-ownership-borrowing.md#borrowing' },
            { id: 'rust-3-3', title: 'Lifetimes', mdFile: 'md/rust/03-ownership-borrowing.md#lifetimes' }
        ]
    }
];

// Podman Course Chapters Data
const podmanChapters = [
    {
        id: 'podman-1',
        title: 'Pengenalan Podman',
        mdFile: 'md/podman/01-introduction.md',
        subChapters: [
            { id: 'podman-1-1', title: 'Apa itu Podman?', mdFile: 'md/podman/01-introduction.md#apa-itu-podman' },
            { id: 'podman-1-2', title: 'Instalasi', mdFile: 'md/podman/01-introduction.md#instalasi' },
            { id: 'podman-1-3', title: 'Perintah Dasar', mdFile: 'md/podman/01-introduction.md#perintah-dasar' }
        ]
    },
    {
        id: 'podman-2',
        title: 'Manajemen Container',
        mdFile: 'md/podman/02-container-management.md',
        subChapters: [
            { id: 'podman-2-1', title: 'Running Containers', mdFile: 'md/podman/02-container-management.md#running-containers' },
            { id: 'podman-2-2', title: 'Container Lifecycle', mdFile: 'md/podman/02-container-management.md#container-lifecycle' },
            { id: 'podman-2-3', title: 'Image Management', mdFile: 'md/podman/02-container-management.md#image-management' }
        ]
    },
    {
        id: 'podman-3',
        title: 'Podman Pods dan Networking',
        mdFile: 'md/podman/03-pods-networking.md',
        subChapters: [
            { id: 'podman-3-1', title: 'Pod Basics', mdFile: 'md/podman/03-pods-networking.md#pod-basics' },
            { id: 'podman-3-2', title: 'Networking', mdFile: 'md/podman/03-pods-networking.md#networking' },
            { id: 'podman-3-3', title: 'Use Cases', mdFile: 'md/podman/03-pods-networking.md#use-cases' }
        ]
    }
];

// Gabungkan semua chapters menjadi satu object
const CHAPTERS_DATA = {
    laravel: laravelChapters,
    python: pythonChapters,
    rust: rustChapters,
    podman: podmanChapters
};
