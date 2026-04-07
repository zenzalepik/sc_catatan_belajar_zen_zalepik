Berikut **cheatsheet belajar Laravel** dari nol sampai bisa **CRUD + Live (real-time / interaktif)**. Ini dibuat ringkas tapi tetap praktis dipakai 👇

---

# 🚀 CHEATSHEET BELAJAR LARAVEL (CRUD → LIVE)

## 1. ⚙️ Setup Awal

```bash
composer create-project laravel/laravel nama-project
cd nama-project
php artisan serve
```

Akses:

```
http://127.0.0.1:8000
```

---

## 2. 🧱 Struktur Penting

* `routes/web.php` → routing
* `app/Models` → model
* `app/Http/Controllers` → controller
* `resources/views` → blade (UI)
* `database/migrations` → struktur DB

---

## 3. 🗄️ Setup Database

Edit `.env`

```env
DB_DATABASE=nama_db
DB_USERNAME=root
DB_PASSWORD=
```

---

## 4. 🧩 Migration (Buat Tabel)

```bash
php artisan make:migration create_posts_table
```

Isi migration:

```php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->text('content');
    $table->timestamps();
});
```

Jalankan:

```bash
php artisan migrate
```

---

## 5. 🧠 Model

```bash
php artisan make:model Post
```

Isi Model:

```php
class Post extends Model
{
    protected $fillable = ['title', 'content'];
}
```

---

## 6. 🎮 Controller (CRUD)

```bash
php artisan make:controller PostController --resource
```

### Contoh isi penting:

#### 🔹 CREATE

```php
public function store(Request $request)
{
    Post::create($request->all());
    return redirect()->route('posts.index');
}
```

#### 🔹 READ

```php
public function index()
{
    $posts = Post::all();
    return view('posts.index', compact('posts'));
}
```

#### 🔹 UPDATE

```php
public function update(Request $request, Post $post)
{
    $post->update($request->all());
    return redirect()->route('posts.index');
}
```

#### 🔹 DELETE

```php
public
```
