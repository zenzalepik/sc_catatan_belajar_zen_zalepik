# Struktur Data

## Lists (Daftar)

### Membuat Lists

```python
# List dasar
buah = ["apel", "pisang", "ceri"]

# Tipe campuran
campuran = [1, "hello", 3.14, True]

# List bersarang
matriks = [[1, 2], [3, 4]]

# List comprehension
kuadrat = [x**2 for x in range(10)]
genap = [x for x in range(20) if x % 2 == 0]
```

### Mengakses Elemen

```python
buah = ["apel", "pisang", "ceri"]

print(buah[0])      # "apel"
print(buah[-1])     # "ceri" (item terakhir)
print(buah[1:3])    # ["pisang", "ceri"]
print(buah[:2])     # ["apel", "pisang"]
print(buah[1:])     # ["pisang", "ceri"]
```

### Method List

```python
buah = ["apel", "pisang"]

# Menambahkan elemen
buah.append("jeruk")           # Tambah di akhir
buah.insert(1, "anggur")       # Sisip di index
buah.extend(["mangga", "nanas"])  # Perluas list

# Menghapus elemen
buah.remove("pisang")          # Hapus berdasarkan nilai
terakhir = buah.pop()          # Hapus dan kembalikan terakhir
del buah[0]                    # Hapus berdasarkan index
buah.clear()                   # Hapus semua

# Method lainnya
index = buah.index("apel")     # Cari index
count = buah.count("apel")     # Hitung kemunculan
buah.sort()                    # Urutkan
buah.reverse()                 # Balikkan urutan
```

## Dictionaries (Kamus)

### Membuat Dictionaries

```python
# Dictionary dasar
orang = {
    "nama": "John",
    "umur": 30,
    "kota": "New York"
}

# Menggunakan constructor dict
orang = dict(nama="John", umur=30)

# Dictionary comprehension
kuadrat = {x: x**2 for x in range(5)}
```

### Mengakses Nilai

```python
orang = {"nama": "John", "umur": 30}

print(orang["nama"])        # "John"
print(orang.get("umur"))    # 30
print(orang.get("pekerjaan"))     # None
print(orang.get("pekerjaan", "N/A"))  # "N/A" (default)

# Dapatkan semua keys, values, items
keys = orang.keys()
values = orang.values()
items = orang.items()
```

### Memodifikasi Dictionaries

```python
orang = {"nama": "John", "umur": 30}

# Update nilai
orang["umur"] = 31
orang["pekerjaan"] = "Engineer"  # Tambah key baru

# Update dengan dictionary lain
orang.update({"kota": "Jakarta", "umur": 32})

# Hapus
del orang["umur"]
nilai = orang.pop("kota")
orang.popitem()  # Hapus item terakhir
```

## Tuples

### Membuat Tuples

```python
# Tuple dasar
koordinat = (10, 20)
warna = ("merah", "hijau", "biru")

# Tuple dengan satu elemen
single = (5,)  # Perhatikan koma

# Tuple unpacking
x, y = koordinat
a, b, c = warna

# Swapping values
a, b = b, a
```

## Sets

### Membuat Sets

```python
# Set dasar
angka = {1, 2, 3, 4, 5}

# Dari list
dari_list = set([1, 2, 3, 2, 1])  # {1, 2, 3}

# Set comprehension
kuadrat = {x**2 for x in range(5)}
```

### Operasi Set

```python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

# Union (gabungan)
print(a | b)  # {1, 2, 3, 4, 5, 6}

# Intersection (irisan)
print(a & b)  # {3, 4}

# Difference (selisih)
print(a - b)  # {1, 2}
print(b - a)  # {5, 6}

# Symmetric difference
print(a ^ b)  # {1, 2, 5, 6}
```
