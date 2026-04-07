# Pengenalan Laravel

## Apa itu Laravel?

Laravel adalah framework web PHP gratis dan open-source yang dibuat oleh Taylor Otwell. Framework ini mengikuti pola arsitektur **model–view–controller (MVC)** dan mencakup fitur-fitur seperti routing, authentication, sessions, caching, dan banyak lagi.

## Fitur Utama

- ✨ **Sintaks yang elegan** dan ramah developer
- 🔐 **Sistem autentikasi** bawaan
- 🗄️ **Migrasi database** dan seeders
- 🎨 Engine **templating Blade**
- 🛠️ **Artisan CLI** untuk otomatisasi

## Instalasi

```bash
composer create-project laravel/laravel my-project
cd my-project
php artisan serve
```

## Routing Dasar

```php
// routes/web.php
Route::get('/', function () {
    return view('welcome');
});

Route::get('/about', function () {
    return view('about');
});
```

## Struktur Direktori

```
laravel/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   └── Middleware/
│   └── Models/
├── database/
│   ├── migrations/
│   └── seeders/
├── resources/
│   ├── views/
│   └── css/
├── routes/
│   └── web.php
└── .env
```

## Memulai

1. Install Laravel via Composer
2. Konfigurasi file `.env`
3. Jalankan migrasi: `php artisan migrate`
4. Mulai development server
5. Mulai bangun aplikasimu!
