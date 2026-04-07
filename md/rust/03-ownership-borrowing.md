# Ownership dan Borrowing

## Aturan Ownership

1. Setiap value di Rust punya variabel yang disebut **owner**-nya
2. Hanya boleh ada **satu owner dalam satu waktu**
3. Ketika owner keluar dari scope, value akan di-**drop**

## Memindahkan Values (Moving)

```rust
let s1 = String::from("hello");
let s2 = s1; // s1 dipindahkan ke s2

// println!("{}", s1); // Error! s1 sudah tidak valid
println!("{}", s2); // OK!
```

## Meng-clone Values

```rust
let s1 = String::from("hello");
let s2 = s1.clone();

println!("{}", s1); // OK!
println!("{}", s2); // OK!
```

## Borrowing dengan References

```rust
fn main() {
    let s1 = String::from("hello");
    let len = hitung_panjang(&s1);
    println!("Panjang '{}' adalah {}", s1, len);
}

fn hitung_panjang(s: &String) -> usize {
    s.len()
}
```

## Mutable References

```rust
fn main() {
    let mut s = String::from("hello");
    ubah(&mut s);
    println!("{}", s); // "hello, world"
}

fn ubah(some_string: &mut String) {
    some_string.push_str(", world");
}
```

## Aturan Borrowing

> ⚠️ **Penting:** Kamu hanya boleh punya:
> - **Satu mutable reference** ATAU
> - **Berapapun immutable references**

```rust
let mut s = String::from("hello");

let r1 = &s; // OK
let r2 = &s; // OK
// let r3 = &mut s; // Error! Tidak boleh mutable saat immutable ada

println!("{}, {}, {}", r1, r2, s);
// r1 dan r2 keluar dari scope di sini

let r3 = &mut s; // OK sekarang
```

## Dangling References

```rust
// fn dangling() -> &String {
//     let s = String::from("hello");
//     &s // Error! s keluar dari scope
// }

fn no_dangling() -> String {
    let s = String::from("hello");
    s // Kembalikan ownership
}
```

## Tipe Slice

```rust
let s = String::from("hello world");

// String slice
let hello = &s[0..5];  // "hello"
let world = &s[6..11]; // "world"

// Shorthand
let hello = &s[..5];
let world = &s[6..];
let full = &s[..]; // Seluruh string

// Slice type
let slice: &str = &s[0..5];
```

## String vs &str

```rust
// String - owned, heap-allocated
let owned: String = String::from("hello");

// &str - borrowed string slice
let borrowed: &str = &owned;
let literal: &str = "hello";

// Function parameters
fn print_string(s: &str) {  // Terima &str, bukan &String
    println!("{}", s);
}

print_string(&owned);  // OK - auto deref
print_string("world"); // OK
```

## Ownership dalam Functions

```rust
// Function mengambil ownership
fn take_ownership(s: String) {
    println!("{}", s);
} // s keluar dari scope, di-drop

// Function meminjam (borrow)
fn borrow_string(s: &String) {
    println!("{}", s);
} // s hanya borrow, tidak di-drop

// Function mengembalikan ownership
fn give_ownership() -> String {
    String::from("hello")
}

fn main() {
    let s = String::from("hello");
    
    take_ownership(s);  // s dipindahkan
    // println!("{}", s); // Error!
    
    let s2 = String::from("world");
    borrow_string(&s2);  // s2 dipinjam
    println!("{}", s2);  // OK!
    
    let s3 = give_ownership();  // s3 dapat ownership
}
```

## Drop Trait

```rust
struct MyStruct {
    data: String,
}

impl Drop for MyStruct {
    fn drop(&mut self) {
        println!("Dropping MyStruct with data: {}", self.data);
    }
}

fn main() {
    let a = MyStruct {
        data: String::from("test"),
    };
    // Otomatis di-drop di akhir scope
}
```
