# Fungsi dan Modul

## Mendefinisikan Fungsi

```python
# Fungsi dasar
def sapa(nama):
    return f"Hello, {nama}!"

print(sapa("Alice"))  # "Hello, Alice!"

# Dengan parameter default
def sapa(nama="Tamu"):
    return f"Hello, {nama}!"

print(sapa())         # "Hello, Tamu!"
print(sapa("Bob"))    # "Hello, Bob!"

# Multiple parameter
def tambah(a, b=10):
    return a + b

print(tambah(5))      # 15
print(tambah(5, 20))  # 25
```

## Return Values (Nilai Kembalian)

```python
# Single return
def kuadrat(x):
    return x ** 2

# Multiple returns
def dapatkan_orang():
    return "John", 30, "Engineer"

nama, umur, pekerjaan = dapatkan_orang()

# Return None (implisit)
def lakukan_sesuatu():
    print("Melakukan sesuatu")

hasil = lakukan_sesuatu()  # hasil adalah None
```

## *args dan **kwargs

```python
# *args untuk positional arguments
def jumlahkan_semua(*args):
    return sum(args)

print(jumlahkan_semua(1, 2, 3, 4))  # 10
print(jumlahkan_semua(1, 2))        # 3

# **kwargs untuk keyword arguments
def cetak_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

cetak_info(nama="John", umur=30, kota="NYC")

# Digabungkan
def func(a, b, *args, **kwargs):
    print(f"a: {a}, b: {b}")
    print(f"args: {args}")
    print(f"kwargs: {kwargs}")

func(1, 2, 3, 4, 5, nama="John", umur=30)
```

## Lambda Functions

```python
# Fungsi anonim
kuadrat = lambda x: x ** 2
print(kuadrat(5))  # 25

# Dengan map
angka = [1, 2, 3, 4]
kuadrat_list = list(map(lambda x: x ** 2, angka))
print(kuadrat_list)  # [1, 4, 9, 16]

# Dengan filter
genap = list(filter(lambda x: x % 2 == 0, angka))
print(genap)  # [2, 4]

# Dengan sorted
pasangan = [(1, 'satu'), (3, 'tiga'), (2, 'dua')]
pasangan_urut = sorted(pasangan, key=lambda x: x[0])
```

## Decorators

```python
# Decorator dasar
def decorator_saya(func):
    def wrapper():
        print("Sebelum fungsi")
        func()
        print("Setelah fungsi")
    return wrapper

@decorator_saya
def katakan_hello():
    print("Hello")

katakan_hello()
```

## Modules dan Packages

### Mengimport Module

```python
# Import seluruh module
import math
print(math.sqrt(16))  # 4.0

# Import spesifik
from math import sqrt, pi
print(sqrt(16))       # 4.0
print(pi)             # 3.14159...

# Import dengan alias
import datetime as dt
today = dt.date.today()

# Import semua (tidak direkomendasikan)
from math import *
```

### Membuat Module Sendiri

```python
# mymodule.py
def sapa(nama):
    return f"Hello, {nama}!"

def selamat_tinggal(nama):
    return f"Goodbye, {nama}!"

# main.py
import mymodule

print(mymodule.sapa("Alice"))
print(mymodule.selamat_tinggal("Bob"))
```

### Module Bawaan Python

```python
# math - Operasi matematika
import math
print(math.ceil(4.2))    # 5
print(math.floor(4.8))   # 4

# random - Angka acak
import random
print(random.randint(1, 10))
print(random.choice(['a', 'b', 'c']))

# datetime - Tanggal dan waktu
import datetime
now = datetime.datetime.now()
print(now.year)

# os - Operasi sistem
import os
print(os.getcwd())  # Working directory
```

## Scope Variabel

```python
# Global scope
global_var = "I'm global"

def my_function():
    # Local scope
    local_var = "I'm local"
    print(global_var)  # Bisa akses global
    
print(global_var)  # OK
# print(local_var)  # Error! Tidak bisa akses di luar fungsi

# Keyword global
def update_global():
    global global_var
    global_var = "Updated!"
```
