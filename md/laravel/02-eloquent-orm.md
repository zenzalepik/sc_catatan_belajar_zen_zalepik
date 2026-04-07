# Dasar-dasar Eloquent ORM

## Apa itu Eloquent?

Eloquent adalah sistem **ORM (Object-Relational Mapping)** bawaan Laravel. ORM memungkinkan kamu bekerja dengan database menggunakan objek PHP daripada menulis query SQL.

## Membuat Model

```bash
php artisan make:model Post
```

## Operasi CRUD Dasar

### Create (Buat)

```php
$post = new Post();
$post->title = 'Judul Postingan';
$post->content = 'Isi postingan di sini';
$post->save();

// Atau menggunakan method create
$post = Post::create([
    'title' => 'Judul Postingan',
    'content' => 'Isi postingan di sini'
]);
```

### Read (Baca)

```php
// Ambil semua postingan
$posts = Post::all();

// Cari berdasarkan ID
$post = Post::find(1);

// Cari berdasarkan kolom
$post = Post::where('status', 'published')->first();
```

### Update (Perbarui)

```php
$post = Post::find(1);
$post->title = 'Judul Diperbarui';
$post->save();

// Atau menggunakan method update
Post::where('id', 1)->update(['title' => 'Judul Diperbarui']);
```

### Delete (Hapus)

```php
$post = Post::find(1);
$post->delete();

// Atau menggunakan destroy
Post::destroy(1);
```

## Query Builder

```php
$posts = Post::where('status', 'published')
    ->orderBy('created_at', 'desc')
    ->limit(10)
    ->get();
```

## Relasi

```php
// One to Many (Satu ke Banyak)
class Post extends Model {
    public function comments() {
        return $this->hasMany(Comment::class);
    }
}

// Penggunaan
$post = Post::find(1);
$comments = $post->comments;
```

## Mass Assignment

```php
// Di dalam Model kamu
protected $fillable = ['title', 'content', 'status'];

// Atau guard semua atribut
protected $guarded = [];
```
