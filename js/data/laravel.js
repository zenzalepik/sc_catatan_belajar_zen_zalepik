// Laravel Course Chapters Data

export const laravelChapters = [
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
