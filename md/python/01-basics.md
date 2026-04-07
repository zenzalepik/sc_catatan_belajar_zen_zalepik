# Dasar-dasar Python

## Apa itu Python?

Python adalah **bahasa pemrograman tingkat tinggi yang diinterpretasikan** yang dikenal karena kesederhanaan dan keterbacaannya. Python cocok untuk pemula dan cukup powerful untuk para ahli.

## Fitur Utama

- 🎯 **Mudah dipelajari** sintaksnya
- 📚 **Pustaka standar yang besar**
- 🖥️ **Lintas platform**
- 🚀 Cocok untuk pengembangan web, data science, AI, dan otomatisasi

## Hello World

```python
print("Hello, World!")
```

## Variabel dan Tipe Data

```python
# Variabel
nama = "John"
umur = 25
tinggi = 5.9
adalah_mahasiswa = True

# Tipe data
print(type(nama))    # <class 'str'>
print(type(umur))    # <class 'int'>
print(type(tinggi))  # <class 'float'>
print(type(adalah_mahasiswa)) # <class 'bool'>

# Multiple assignment
x, y, z = 1, 2, 3
a = b = c = 0
```

## String

```python
teks = "Hello, Python!"

# Method string
print(teks.lower())        # "hello, python!"
print(teks.upper())        # "HELLO, PYTHON!"
print(teks.split(","))     # ['Hello', ' Python!']
print(teks.replace("H", "J"))  # "Jello, Python!"
print(len(teks))           # 14

# F-strings (Python 3.6+)
nama = "Alice"
print(f"Hello, {nama}!")   # "Hello, Alice!"
```

## Control Structures

### If-Else

```python
umur = 18

if umur >= 18:
    print("Dewasa")
elif umur >= 13:
    print("Remaja")
else:
    print("Anak-anak")
```

### For Loop

```python
# Range
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# Dengan awal dan akhir
for i in range(2, 6):
    print(i)  # 2, 3, 4, 5

# Dengan step
for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8

# Iterasi atas list
buah = ["apel", "pisang", "ceri"]
for b in buah:
    print(b)
```

### While Loop

```python
hitung = 0
while hitung < 5:
    print(hitung)
    hitung += 1

# Dengan else
while hitung < 5:
    print(hitung)
    hitung += 1
else:
    print("Perulangan selesai")
```

## Komentar

```python
# Komentar satu baris

"""
Komentar multi-baris
atau docstring
"""

def fungsi_saya():
    """Ini adalah docstring"""
    pass
```

## Input/Output

```python
# Input
nama = input("Masukkan nama kamu: ")
umur = int(input("Masukkan umur kamu: "))

# Output
print("Hello,", nama)
print(f"Kamu berumur {umur} tahun")
```
