// Rust Course Chapters Data

export const rustChapters = [
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
