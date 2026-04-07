# Fundamental Rust

## Apa itu Rust?

Rust adalah **bahasa pemrograman sistem** yang berjalan sangat cepat, mencegah segfault, dan menjamin thread safety. Rust dikenal dengan ownership system dan zero-cost abstractions.

## Fitur Utama

- 🛡️ **Memory safety** tanpa garbage collection
- ⚡ **Zero-cost abstractions**
- 🎯 **Pattern matching**
- 🔍 **Type inference**
- 📦 Built-in **package manager (Cargo)**

## Instalasi

```bash
# Linux/Mac
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Windows
# Download rustup-init.exe dari https://rustup.rs
```

## Hello World

```rust
fn main() {
    println!("Hello, World!");
}
```

## Variabel dan Mutability

```rust
// Immutable by default
let x = 5;

// Mutable
let mut y = 10;
y = 15; // OK!

// Constants
const MAX_POINTS: u32 = 100_000;

// Shadowing
let x = 5;
let x = x + 1; // x sekarang 6
```

## Tipe Data

### Scalar Types

```rust
// Integers
let a: i32 = 42;      // Signed 32-bit
let b: u32 = 42;      // Unsigned 32-bit
let c: i64 = 1000;    // Signed 64-bit

// Floats
let float: f64 = 3.14;

// Boolean
let is_active: bool = true;

// Character
let letter: char = 'A';
```

### Compound Types

```rust
// Tuple
let tuple: (i32, f64, char) = (500, 6.4, 'A');
let (x, y, z) = tuple;

// Array
let arr: [i32; 5] = [1, 2, 3, 4, 5];
let first = arr[0];
```

## Functions

```rust
// Function dengan parameter
fn add(a: i32, b: i32) -> i32 {
    a + b
}

// Function tanpa return type (unit type)
fn print_hello() {
    println!("Hello!");
}

// Function dengan expression
fn multiply(x: i32, y: i32) -> i32 {
    x * y  // Tanpa semicolon = return
}
```

## Control Flow

```rust
// If-else
let number = 7;
if number < 5 {
    println!("Less than 5");
} else if number == 5 {
    println!("Equals 5");
} else {
    println!("Greater than 5");
}

// Loop
loop {
    println!("Again!");
    break;  // Exit loop
}

// While
let mut counter = 0;
while counter < 5 {
    println!("{}", counter);
    counter += 1;
}

// For
for i in 0..5 {
    println!("{}", i);  // 0, 1, 2, 3, 4
}

// For dengan array
let arr = [10, 20, 30];
for item in arr.iter() {
    println!("{}", item);
}
```

## Ownership

```rust
// Ownership rule: setiap value punya satu owner
let s1 = String::from("hello");
let s2 = s1;  // s1 dipindahkan ke s2 (move)
// println!("{}", s1);  // Error! s1 sudah tidak valid

// Borrowing (reference)
let s1 = String::from("hello");
let s2 = &s1;  // s2 borrow s1
println!("{}", s1);  // OK! s1 masih valid
println!("{}", s2);  // OK!

// Mutable borrow
let mut s = String::from("hello");
let r = &mut s;
r.push_str(", world!");
```
