// Main Data Module - Import dan export semua chapters data

import { laravelChapters } from './laravel.js';
import { pythonChapters } from './python.js';
import { rustChapters } from './rust.js';
import { podmanChapters } from './podman.js';

// Gabungkan semua chapters data
export const CHAPTERS_DATA = {
    laravel: laravelChapters,
    python: pythonChapters,
    rust: rustChapters,
    podman: podmanChapters
};

// Export individual chapters untuk keperluan spesifik
export { laravelChapters } from './laravel.js';
export { pythonChapters } from './python.js';
export { rustChapters } from './rust.js';
export { podmanChapters } from './podman.js';
