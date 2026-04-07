Siap. Berikut **materi lengkap & terstruktur Laravel (job-ready)** berdasarkan poin yang tadi kita bahas. Ini bukan sekadar teori—langsung bisa kamu jadikan **panduan belajar + praktik project nyata**.

---

# 🚀 ROADMAP & MATERI LENGKAP LARAVEL (SIAP KERJA)

## 🧩 0. FUNDAMENTAL (WAJIB KUAT)

Sebelum masuk Laravel:

* PHP dasar (OOP, array, function)
* HTTP (GET, POST, request/response)
* MVC concept

---

# 🧱 1. BASIC LARAVEL (FOUNDATION)

## 🔹 Routing

```php
Route::get('/posts', [PostController::class, 'index']);
```

## 🔹 Controller

```bash
php artisan make:controller PostController
```

## 🔹 Blade (View)

```blade
@foreach ($posts as $post)
    <h1>{{ $post->title }}</h1>
@endforeach
```

---

# 🗄️ 2. DATABASE & ELOQUENT

## 🔹 Migration

```bash
php artisan make:migration create_posts_table
```

## 🔹 Model

```bash
php artisan make:model Post
```

## 🔹 CRUD DASAR

```php
Post::create($data);
Post::all();
Post::find($id);
$post->update($data);
$post->delete();
```

---

# 🧾 3. VALIDATION (WAJIB)

```php
$request->validate([
    'title' => 'required|max:255',
    'content' => 'required'
]);
```

👉 Best practice:

* gunakan **Form Request**

```bash
php artisan make:request StorePostRequest
```

---

# 🔐 4. AUTHENTICATION

Gunakan:

* Laravel Breeze (recommended untuk belajar)

```bash
composer require laravel/breeze --dev
php artisan breeze:install
npm install && npm run dev
php artisan migrate
```

Fitur:

* login
* register
* logout

---

# 🛡️ 5. AUTHORIZATION (ROLE & PERMISSION)

## 🔹 Middleware

```php
Route::middleware(['auth'])->group(function () {
    Route::resource('posts', PostController::class);
});
```

## 🔹 Role sederhana

Tambahkan kolom `role` di users:

```php
if (auth()->user()->role !== 'admin') {
    abort(403);
}
```

👉 Advanced:

* spatie/laravel-permission

---

# 🔗 6. RELASI DATABASE (SUPER PENTING)

## 🔹 One to Many

```php
// User.php
public function posts()
{
    return $this->hasMany(Post::class);
}

// Post.php
public function user()
{
    return $this->belongsTo(User::class);
}
```

## 🔹 Pakai relasi

```php
$post->user->name;
$user->posts;
```

---

# ⚡ 7. QUERY OPTIMIZATION

## 🔹 Eager Loading

```php
Post::with('user')->get();
```

👉 Hindari:

```php
Post::all(); // lalu akses user (N+1 problem)
```

---

# 📄 8. PAGINATION

```php
$posts = Post::paginate(10);
```

Blade:

```blade
{{ $posts->links() }}
```

---

# 📡 9. API (WAJIB MODERN DEV)

## 🔹 Route API

```php
Route::apiResource('posts', PostController::class);
```

## 🔹 Response JSON

```php
return response()->json($posts);
```

## 🔹 API Resource

```bash
php artisan make:resource PostResource
```

---

# ⚡ 10. LIVE / REAL-TIME

## 🔹 Cara cepat:

* Laravel Livewire

```bash
composer require livewire/livewire
```

Contoh:

```php
class Counter extends Component
{
    public $count = 0;

    public function increment()
    {
        $this->count++;
    }
}
```

👉 Alternatif:

* AJAX (fetch / axios)
* WebSocket (advanced)

---

# 📁 11. FILE UPLOAD

```php
$path = $request->file('image')->store('images');
```

---

# 🧠 12. DEBUGGING (PENTING BANGET)

Tools:

```php
dd($data);
dump($data);
```

Log:

```php
Log::info($data);
```

---

# 🧪 13. MINI PROJECT (WAJIB PRAKTIK)

## 🎯 Project: Sistem Post / Blog

Fitur minimal:

* login/register
* CRUD post
* relasi user-post
* pagination
* upload gambar
* API endpoint
* live search (Livewire)

---

# 📊 STRUKTUR BELAJAR (STEP BY STEP)

## 🔰 Level 1 (Basic)

* routing
* controller
* blade
* CRUD

## ⚙️ Level 2 (Intermediate)

* validation
* auth
* relasi
* pagination

## 🚀 Level 3 (Advanced)

* API
* live (Livewire)
* optimization
* role & permission

---

# 🎯 TARGET AKHIR (JOB READY)

Kalau kamu sudah bisa:
✅ CRUD
✅ Auth
✅ Relasi
✅ API
✅ Live interaction
✅ Debugging

👉 Artinya:

> Kamu sudah **siap apply junior Laravel developer**

---

# 💡 TIPS BIAR CEPAT JAGO

1. Jangan cuma baca → langsung praktik
2. Fokus 1 project end-to-end
3. Biasakan baca error
4. Gunakan Git

---

Kalau kamu mau, next step aku bisa:
👉 bikinkan **project nyata step-by-step (dari nol sampai deploy)**
👉 atau **latihan soal + challenge biar makin matang**

Tinggal bilang aja mau ke arah mana 👍
