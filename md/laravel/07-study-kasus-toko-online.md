Baik — saya akan tulis **1 artikel utuh, runut, dari nol sampai jadi** tanpa terputus-putus. Ini bisa kamu baca seperti **panduan belajar + praktik langsung**.

---

# 🛒 Membangun Toko Online dengan Laravel (Dari Nol Sampai Siap Kerja)

## 📌 Pendahuluan

Di artikel ini kita akan membangun **aplikasi toko online sederhana tapi “real-world ready”** menggunakan Laravel.

Target akhir:

* User bisa daftar & belanja
* Admin bisa kelola produk
* Ada API untuk integrasi
* Ada fitur interaktif (live)
* Struktur sudah sesuai standar kerja

Tools utama:

* Laravel
* Laravel Breeze
* Laravel Sanctum
* Laravel Livewire

---

# ⚙️ 1. Setup Project

Install Laravel:

```bash
composer create-project laravel/laravel toko-online
cd toko-online
php artisan serve
```

Buka di browser:

```
http://127.0.0.1:8000
```

---

# 🗄️ 2. Setup Database

Edit file `.env`:

```env
DB_DATABASE=toko_online
DB_USERNAME=root
DB_PASSWORD=
```

Lalu jalankan:

```bash
php artisan migrate
```

---

# 🔐 3. Authentication (Login & Register)

Install auth:

```bash
composer require laravel/breeze --dev
php artisan breeze:install
npm install && npm run dev
php artisan migrate
```

Sekarang sudah ada:

* login
* register
* logout

---

# 🧩 4. Desain Database

Kita buat beberapa tabel:

## 🔹 Categories

```bash
php artisan make:model Category -m
```

Isi migration:

```php
$table->id();
$table->string('name');
$table->timestamps();
```

---

## 🔹 Products

```bash
php artisan make:model Product -m
```

```php
$table->id();
$table->foreignId('category_id')->constrained();
$table->string('name');
$table->integer('price');
$table->integer('stock');
$table->string('image')->nullable();
$table->timestamps();
```

---

## 🔹 Orders

```bash
php artisan make:model Order -m
```

```php
$table->id();
$table->foreignId('user_id')->constrained();
$table->integer('total_price');
$table->string('status')->default('pending');
$table->timestamps();
```

---

## 🔹 Order Items

```bash
php artisan make:model OrderItem -m
```

```php
$table->id();
$table->foreignId('order_id')->constrained();
$table->foreignId('product_id')->constrained();
$table->integer('quantity');
$table->integer('price');
$table->timestamps();
```

---

Jalankan:

```bash
php artisan migrate
```

---

# 🔗 5. Relasi Model

## Product.php

```php
public function category()
{
    return $this->belongsTo(Category::class);
}
```

## Order.php

```php
public function items()
{
    return $this->hasMany(OrderItem::class);
}
```

## User.php

```php
public function orders()
{
    return $this->hasMany(Order::class);
}
```

---

# 🛠️ 6. CRUD Produk (Admin)

Buat controller:

```bash
php artisan make:controller ProductController --resource
```

## 🔹 Store (Tambah Produk)

```php
public function store(Request $request)
{
    $request->validate([
        'name' => 'required',
        'price' => 'required|numeric',
        'stock' => 'required|integer'
    ]);

    Product::create($request->all());

    return redirect()->back();
}
```

---

## 🔹 Index (List Produk)

```php
public function index()
{
    $products = Product::with('category')->paginate(10);
    return view('products.index', compact('products'));
}
```

---

## 🔹 Update

```php
public function update(Request $request, Product $product)
{
    $product->update($request->all());
    return redirect()->back();
}
```

---

## 🔹 Delete

```php
public function destroy(Product $product)
{
    $product->delete();
    return redirect()->back();
}
```

---

# 🧾 7. Validation (Penting!)

Selalu validasi input:

```php
$request->validate([
    'name' => 'required',
    'price' => 'numeric'
]);
```

Tanpa ini → aplikasi rawan error & bug

---

# 🛡️ 8. Authorization (Admin Only)

Tambahkan kolom `role` di users:

```php
if (auth()->user()->role !== 'admin') {
    abort(403);
}
```

---

# 🛒 9. Keranjang (Cart)

Sederhana pakai session:

```php
session()->push('cart', [
    'product_id' => $product->id,
    'qty' => 1
]);
```

Ambil cart:

```php
$cart = session('cart', []);
```

---

# 💳 10. Checkout

## Logic:

1. ambil cart
2. hitung total
3. simpan order
4. simpan item

```php
$total = 0;

foreach ($cart as $item) {
    $total += $item['qty'] * $item['price'];
}

$order = Order::create([
    'user_id' => auth()->id(),
    'total_price' => $total
]);
```

---

# 📡 11. API (RESTful)

## Route API

```php
Route::prefix('v1')->group(function () {
    Route::apiResource('products', ProductController::class);
});
```

---

## Response JSON

```php
return response()->json([
    'data' => $products
]);
```

---

# 🔐 12. API Authentication

Install:

```bash
composer require laravel/sanctum
php artisan migrate
```

Login API:

```php
$user = User::where('email', $request->email)->first();

if (!Hash::check($request->password, $user->password)) {
    return response()->json(['message' => 'Login gagal'], 401);
}

$token = $user->createToken('api-token')->plainTextToken;

return response()->json(['token' => $token]);
```

---

# ⚡ 13. Live Feature (Tanpa Reload)

Install:

```bash
composer require livewire/livewire
```

Contoh Live Search:

```php
class SearchProduct extends Component
{
    public $query = '';

    public function render()
    {
        $products = Product::where('name', 'like', '%'.$this->query.'%')->get();

        return view('livewire.search-product', compact('products'));
    }
}
```

---

# 📁 14. Upload Gambar

```php
$path = $request->file('image')->store('products');
```

---

# 📄 15. Pagination

```php
$products = Product::paginate(10);
```

```blade
{{ $products->links() }}
```

---

# ⚡ 16. Optimasi Query

Gunakan:

```php
Product::with('category')->get();
```

Agar tidak kena **N+1 problem**

---

# 🚫 17. Error Handling API

```php
return response()->json([
    'message' => 'Data tidak ditemukan'
], 404);
```

---

# 🧪 18. Testing

Gunakan:

* Postman

Test:

* login API
* CRUD produk
* checkout

---

# 🎯 19. Alur Sistem

## 👤 User:

1. daftar
2. login
3. lihat produk
4. tambah ke cart
5. checkout

## 🛠️ Admin:

1. login
2. kelola produk
3. lihat order

---

# 🧠 Penutup

Kalau kamu sudah mengikuti semua langkah ini, berarti kamu sudah menguasai:

✅ CRUD
✅ Authentication
✅ Authorization
✅ Relasi database
✅ API + Token
✅ Live interaction
✅ Upload file
✅ Pagination
✅ Debugging dasar

---

# 🚀 Kesimpulan Akhir

Project ini bukan sekadar latihan.

> Ini sudah setara dengan **project junior Laravel developer di dunia kerja**

---

Kalau kamu ingin naik level berikutnya, kamu bisa lanjut ke:

* payment gateway
* notifikasi email
* dashboard admin
* deployment ke server

---

Kalau kamu mau, saya bisa lanjutkan:
👉 jadikan ini **project coding harian step-by-step (hari 1–14)**
👉 atau bantu **review hasil coding kamu biar sesuai standar kerja**

Tinggal bilang 👍
