# Zen Zalepik - Platform Catatan Pembelajaran

Platform pembelajaran interaktif berbasis web dengan tracking progress, sub-chapter, dan sistem sertifikat.

## 📋 Daftar Isi

- [Struktur Project](#struktur-project)
- [Cara Menambah Course Baru](#cara-menambah-course-baru)
- [Cara Menambah Chapter](#cara-menambah-chapter)
- [Cara Menambah Sub-Chapter](#cara-menambah-sub-chapter)
- [Cara Membuat Konten Markdown](#cara-membuat-konten-markdown)
- [Contoh Lengkap](#contoh-lengkap)
- [Tips & Best Practices](#tips--best-practices)

---

## 📁 Struktur Project

```
zen-zalepik/
├── index.html                    # File HTML utama
├── css/
│   └── styles.css               # Custom styles
├── js/
│   ├── config.js                # ⭐ Konfigurasi courses
│   ├── data.js                  # ⭐ Data chapters & sub-chapters
│   ├── database.js              # IndexedDB operations
│   ├── utils.js                 # Utility functions
│   ├── router.js                # Navigation router
│   ├── ui.js                    # UI rendering
│   └── app.js                   # Main application
└── md/                          # 📚 Folder materi pembelajaran
    ├── laravel/
    │   ├── 01-introduction.md
    │   ├── 02-eloquent-orm.md
    │   └── 03-blade-templates.md
    ├── python/
    │   ├── 01-basics.md
    │   ├── 02-data-structures.md
    │   └── 03-functions-modules.md
    ├── rust/
    │   ├── 01-fundamentals.md
    │   ├── 02-crud-egui-eframe.md
    │   └── 03-ownership-borrowing.md
    └── podman/
        ├── 01-introduction.md
        ├── 02-container-management.md
        └── 03-pods-networking.md
```

---

## 🎓 Cara Menambah Course Baru

### **Step 1: Tambah Konfigurasi Course**

Buka file `js/config.js` dan tambahkan konfigurasi course baru di dalam `COURSES_CONFIG`:

```javascript
const COURSES_CONFIG = {
    // ... courses existing ...
    
    nama-course-baru: {
        id: 'nama-course-baru',           // ID unik (lowercase, tanpa spasi)
        title: 'Nama Course',             // Nama course yang ditampilkan
        icon: 'ri-icon-line',             // Icon dari RemixIcon
        iconColor: 'text-color-500',      // Warna icon
        description: 'Deskripsi course',  // Deskripsi singkat
        color: 'from-color-500 to-color-500', // Gradient color
        mdFolder: 'md/nama-course-baru/'  // Folder materi
    }
};
```

**Contoh: Menambah Course "JavaScript"**

```javascript
javascript: {
    id: 'javascript',
    title: 'JavaScript',
    icon: 'ri-javascript-line',
    iconColor: 'text-yellow-500',
    description: 'Bahasa Pemrograman Web Interaktif',
    color: 'from-yellow-400 to-orange-500',
    mdFolder: 'md/javascript/'
}
```

### **Step 2: Buat Folder Materi**

Buat folder baru di direktori `md/`:

```bash
mkdir md/javascript
```

---

## 📖 Cara Menambah Chapter

### **Step 1: Tambah Chapter ke data.js**

Buka file `js/data.js` dan tambahkan chapter di dalam course yang sesuai:

```javascript
const CHAPTERS_DATA = {
    nama-course: [
        // ... chapters existing ...
        
        {
            id: 'nama-course-X',              // ID chapter (unik)
            title: 'Judul Chapter',           // Judul chapter
            mdFile: 'md/nama-course/XX-file.md', // Path file markdown
            subChapters: [                    // Array sub-chapters
                {
                    id: 'nama-course-X-1',    // ID sub-chapter
                    title: 'Judul Sub-Chapter 1',
                    mdFile: 'md/nama-course/XX-file.md#section-1'
                },
                {
                    id: 'nama-course-X-2',
                    title: 'Judul Sub-Chapter 2',
                    mdFile: 'md/nama-course/XX-file.md#section-2'
                },
                {
                    id: 'nama-course-X-3',
                    title: 'Judul Sub-Chapter 3',
                    mdFile: 'md/nama-course/XX-file.md#section-3'
                }
            ]
        }
    ]
};
```

**Penting:**
- `id` harus unik untuk setiap chapter
- `mdFile` adalah path ke file markdown
- Setiap chapter **WAJIB** memiliki minimal 1 sub-chapter
- ID sub-chapter format: `{chapter-id}-{nomor}`

**Contoh: Menambah Chapter ke Course JavaScript**

```javascript
javascript: [
    {
        id: 'javascript-1',
        title: 'Dasar-dasar JavaScript',
        mdFile: 'md/javascript/01-basics.md',
        subChapters: [
            {
                id: 'javascript-1-1',
                title: 'Variabel dan Tipe Data',
                mdFile: 'md/javascript/01-basics.md#variabel-dan-tipe-data'
            },
            {
                id: 'javascript-1-2',
                title: 'Fungsi dan Scope',
                mdFile: 'md/javascript/01-basics.md#fungsi-dan-scope'
            },
            {
                id: 'javascript-1-3',
                title: 'Control Flow',
                mdFile: 'md/javascript/01-basics.md#control-flow'
            }
        ]
    }
]
```

---

## 📝 Cara Menambah Sub-Chapter

Sub-chapter ditambahkan bersamaan dengan chapter di `js/data.js`. Setiap sub-chapter memiliki:

```javascript
{
    id: 'chapter-id-nomor',           // ID unik sub-chapter
    title: 'Judul Sub-Chapter',       // Judul yang ditampilkan
    mdFile: 'path/file.md#anchor'     // Path + anchor ke section
}
```

**Format Anchor:**
- Anchor sesuai dengan heading di file markdown
- Heading `## Variabel dan Tipe Data` menjadi `#variabel-dan-tipe-data`
- Spasi diganti dengan tanda hubung (`-`)
- Huruf kecil semua (lowercase)

**Contoh:**

```markdown
# Dasar-dasar JavaScript

## Variabel dan Tipe Data    <!-- #variabel-dan-tipe-data -->
Konten di sini...

## Fungsi dan Scope          <!-- #fungsi-dan-scope -->
Konten di sini...

## Control Flow              <!-- #control-flow -->
Konten di sini...
```

```javascript
subChapters: [
    {
        id: 'javascript-1-1',
        title: 'Variabel dan Tipe Data',
        mdFile: 'md/javascript/01-basics.md#variabel-dan-tipe-data'
    },
    {
        id: 'javascript-1-2',
        title: 'Fungsi dan Scope',
        mdFile: 'md/javascript/01-basics.md#fungsi-dan-scope'
    }
]
```

---

## 📄 Cara Membuat Konten Markdown

### **Buat File Markdown**

Buat file `.md` di folder course yang sesuai:

```bash
# Contoh untuk course JavaScript
touch md/javascript/01-basics.md
```

### **Format Markdown yang Didukung**

File markdown mendukung semua format standard plus syntax highlighting:

```markdown
# Judul Utama (H1)

## Judul Section (H2) - Ini jadi anchor

### Judul Sub-Section (H3)

Paragraf biasa dengan **teks bold** dan *teks italic*.

## Fitur Utama

- ✨ Fitur pertama
- 🚀 Fitur kedua
- 💡 Fitur ketiga

## Code Examples

### JavaScript

\`\`\`javascript
// Variabel
const nama = "John";
let umur = 25;

// Function
function sapa(nama) {
    return `Hello, ${nama}!`;
}

console.log(sapa(nama));
\`\`\`

### Python

\`\`\`python
# Variabel
nama = "John"
umur = 25

# Function
def sapa(nama):
    return f"Hello, {nama}!"

print(sapa(nama))
\`\`\`

## Table

| Fitur | JavaScript | Python |
|-------|-----------|--------|
| Typing | Dynamic | Dynamic |
| OOP | Yes | Yes |
| Async | Yes | Yes |

## Blockquote

> **Note:** Ini adalah catatan penting
> yang perlu diperhatikan.

## List Berurut

1. Step pertama
2. Step kedua
3. Step ketiga

## Link

[Documentation](https://example.com)
```

### **Syntax Highlighting yang Didukung**

- `javascript` / `js`
- `python` / `py`
- `php`
- `rust`
- `html`
- `css`
- `bash` / `shell`
- `sql`
- `json`
- `typescript` / `ts`
- `java`
- `go`
- Dan banyak lagi...

---

## 🎯 Contoh Lengkap

### **Menambah Course "Go" dari Nol**

#### **1. Update `js/config.js`**

```javascript
go: {
    id: 'go',
    title: 'Go',
    icon: 'ri-code-line',
    iconColor: 'text-cyan-500',
    description: 'Bahasa Pemrograman Sistem Modern',
    color: 'from-cyan-500 to-blue-500',
    mdFolder: 'md/go/'
}
```

#### **2. Buat Folder**

```bash
mkdir md/go
```

#### **3. Buat File Markdown** (`md/go/01-basics.md`)

```markdown
# Dasar-dasar Go

## Apa itu Go?

Go adalah bahasa pemrograman open-source yang dikembangkan oleh Google.

## Instalasi

\`\`\`bash
# Install via package manager
sudo apt install golang
```

## Hello World

\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
\`\`\`

## Variabel dan Tipe Data

Go memiliki tipe data yang kuat dan statik.

\`\`\`go
package main

import "fmt"

func main() {
    var nama string = "John"
    umur := 25
    const PI = 3.14
    
    fmt.Println(nama, umur, PI)
}
\`\`\`

## Functions

\`\`\`go
package main

import "fmt"

func add(a int, b int) int {
    return a + b
}

func main() {
    result := add(5, 3)
    fmt.Println(result)
}
\`\`\`
```

#### **4. Update `js/data.js`**

```javascript
go: [
    {
        id: 'go-1',
        title: 'Dasar-dasar Go',
        mdFile: 'md/go/01-basics.md',
        subChapters: [
            {
                id: 'go-1-1',
                title: 'Apa itu Go?',
                mdFile: 'md/go/01-basics.md#apa-itu-go'
            },
            {
                id: 'go-1-2',
                title: 'Instalasi',
                mdFile: 'md/go/01-basics.md#instalasi'
            },
            {
                id: 'go-1-3',
                title: 'Variabel dan Tipe Data',
                mdFile: 'md/go/01-basics.md#variabel-dan-tipe-data'
            }
        ]
    },
    {
        id: 'go-2',
        title: 'Functions dan Packages',
        mdFile: 'md/go/02-functions.md',
        subChapters: [
            {
                id: 'go-2-1',
                title: 'Function Basics',
                mdFile: 'md/go/02-functions.md#function-basics'
            },
            {
                id: 'go-2-2',
                title: 'Multiple Return Values',
                mdFile: 'md/go/02-functions.md#multiple-return-values'
            },
            {
                id: 'go-2-3',
                title: 'Packages',
                mdFile: 'md/go/02-functions.md#packages'
            }
        ]
    },
    {
        id: 'go-3',
        title: 'Concurrency dengan Goroutines',
        mdFile: 'md/go/03-concurrency.md',
        subChapters: [
            {
                id: 'go-3-1',
                title: 'Goroutines',
                mdFile: 'md/go/03-concurrency.md#goroutines'
            },
            {
                id: 'go-3-2',
                title: 'Channels',
                mdFile: 'md/go/03-concurrency.md#channels'
            },
            {
                id: 'go-3-3',
                title: 'Select Statement',
                mdFile: 'md/go/03-concurrency.md#select-statement'
            }
        ]
    }
]
```

#### **5. Test**

Refresh browser dan course "Go" akan muncul di dashboard!

---

## 💡 Tips & Best Practices

### **1. Naming Convention**

✅ **Good:**
```javascript
id: 'javascript-1'
id: 'javascript-1-1'
mdFile: 'md/javascript/01-basics.md'
```

❌ **Bad:**
```javascript
id: 'JavaScript 1'           // Ada spasi, uppercase
id: 'js_1_1'                 // Inconsistent
mdFile: 'md/js/basics.md'    // Nama folder tidak match
```

### **2. Struktur Chapter & Sub-Chapter**

- Setiap chapter **WAJIB** memiliki sub-chapters
- Minimal **3 sub-chapters** per chapter (recommended)
- ID sub-chapter harus sequential: `chapter-1`, `chapter-2`, `chapter-3`

### **3. File Markdown**

✅ **Good Structure:**
```markdown
# Judul Chapter

## Sub-Chapter 1
Konten...

## Sub-Chapter 2
Konten...

## Sub-Chapter 3
Konten...
```

❌ **Bad Structure:**
```markdown
# Judul Chapter

Konten tanpa heading H2...

### Heading H3 langsung (skip H2)
```

### **4. Anchor Naming**

Heading markdown → Anchor URL:

| Heading | Anchor |
|---------|--------|
| `## Variabel dan Tipe Data` | `#variabel-dan-tipe-data` |
| `## Hello World` | `#hello-world` |
| `## What is OOP?` | `#what-is-oop` |
| `## Setup Environment` | `#setup-environment` |

**Rules:**
- Lowercase semua
- Spasi → tanda hubung (`-`)
- Hapus karakter special

### **5. Code Blocks**

Selalu sertakan language identifier:

✅ **Good:**
````markdown
\`\`\`javascript
const x = 5;
\`\`\`
````

❌ **Bad:**
````markdown
\`\`\`
const x = 5;
\`\`\`
````

### **6. Images**

Simpan gambar di folder `assets/` dan reference dengan relative path:

```markdown
![Deskripsi](../../assets/gambar.png)
```

### **7. Progress Tracking**

- Sertifikat muncul otomatis setelah **SEMUA** sub-chapter selesai
- Progress bar di dashboard dihitung dari total sub-chapter
- User bisa revisi chapter yang sudah selesai

### **8. Icon Selection**

Gunakan icon dari [RemixIcon](https://remixicon.com/):

```html
<i class="ri-{{icon-name}}-line"></i>
<i class="ri-{{icon-name}}-fill"></i>
```

**Popular icons:**
- `ri-code-line` - Programming
- `ri-book-open-line` - Tutorial
- `ri-terminal-line` - CLI/Console
- `ri-database-line` - Database
- `ri-cloud-line` - Cloud/DevOps

---

## 🚀 Quick Reference

### **Template Course Config**

```javascript
nama-course: {
    id: 'nama-course',
    title: 'Nama Course',
    icon: 'ri-icon-line',
    iconColor: 'text-color-500',
    description: 'Deskripsi',
    color: 'from-color-500 to-color-500',
    mdFolder: 'md/nama-course/'
}
```

### **Template Chapter**

```javascript
{
    id: 'course-X',
    title: 'Judul Chapter',
    mdFile: 'md/course/XX-file.md',
    subChapters: [
        { id: 'course-X-1', title: 'Sub 1', mdFile: 'md/course/XX-file.md#section-1' },
        { id: 'course-X-2', title: 'Sub 2', mdFile: 'md/course/XX-file.md#section-2' },
        { id: 'course-X-3', title: 'Sub 3', mdFile: 'md/course/XX-file.md#section-3' }
    ]
}
```

### **Template Markdown**

```markdown
# Judul Chapter

## Section 1
Konten...

## Section 2
Konten...

## Section 3
Konten...
```

---

## ❓ FAQ

**Q: Apakah bisa chapter tanpa sub-chapter?**  
A: Tidak, sistem dirancang dengan sub-chapter untuk tracking progress yang lebih granular.

**Q: Berapa minimal sub-chapter per chapter?**  
A: Minimal 1, tapi direkomendasikan 3 sub-chapter untuk struktur yang baik.

**Q: Bagaimana jika ingin update materi yang sudah ada?**  
A: Cukup edit file `.md` yang bersangkutan. Tidak perlu update `data.js` kecuali mengubah struktur.

**Q: Apakah bisa menambah chapter tanpa restart aplikasi?**  
A: Ya, cukup refresh browser setelah update `data.js`.

**Q: Di mana data progress disimpan?**  
A: Di IndexedDB browser (lokal). Bisa di-export/import sebagai backup.

---

## 📞 Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini.

---

**Happy Learning! 🎓✨**
