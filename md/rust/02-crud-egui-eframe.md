# Cheatshet CRUD dengan Egui Eframe

## Pengenalan Egui Eframe

**Egui** adalah library GUI immediate mode untuk Rust. **Eframe** adalah framework yang memungkinkan kamu menjalankan aplikasi egui secara native atau di web.

## Setup

Tambahkan ke `Cargo.toml`:

```toml
[dependencies]
eframe = "0.24"
egui = "0.24"
```

## Struktur Aplikasi Dasar

```rust
use eframe::egui;

struct MyApp {
    data: Vec<String>,
    item_baru: String,
}

impl eframe::App for MyApp {
    fn update(&mut self, ctx: &egui::Context, _frame: &mut eframe::Frame) {
        egui::CentralPanel::default().show(ctx, |ui| {
            ui.heading("Contoh CRUD");

            // CREATE
            ui.horizontal(|ui| {
                ui.text_edit_singleline(&mut self.item_baru);
                if ui.button("Tambah").clicked() {
                    self.data.push(self.item_baru.clone());
                    self.item_baru.clear();
                }
            });

            // READ
            for item in &self.data {
                ui.label(item);
            }
        });
    }
}

fn main() {
    let options = eframe::NativeOptions::default();
    eframe::run_native(
        "Aplikasi Saya",
        options,
        Box::new(|cc| Box::new(MyApp::default())),
    );
}
```

## Operasi CRUD Lengkap

```rust
use eframe::egui;

struct MyApp {
    data: Vec<String>,
    terpilih: Option<usize>,
    item_baru: String,
    item_edit: String,
}

impl Default for MyApp {
    fn default() -> Self {
        Self {
            data: Vec::new(),
            terpilih: None,
            item_baru: String::new(),
            item_edit: String::new(),
        }
    }
}

impl eframe::App for MyApp {
    fn update(&mut self, ctx: &egui::Context, _frame: &mut eframe::Frame) {
        egui::CentralPanel::default().show(ctx, |ui| {
            ui.heading("CRUD Lengkap");

            // CREATE
            ui.group(|ui| {
                ui.label("Buat:");
                ui.horizontal(|ui| {
                    ui.text_edit_singleline(&mut self.item_baru);
                    if ui.button("Tambah").clicked() {
                        if !self.item_baru.is_empty() {
                            self.data.push(self.item_baru.clone());
                            self.item_baru.clear();
                        }
                    }
                });
            });

            // READ
            ui.group(|ui| {
                ui.label("Daftar:");
                for (index, item) in self.data.iter().enumerate() {
                    ui.selectable_value(
                        &mut self.terpilih, 
                        Some(index), 
                        item
                    );
                }
            });

            // UPDATE
            if let Some(index) = self.terpilih {
                ui.group(|ui| {
                    ui.label("Edit:");
                    ui.text_edit_singleline(&mut self.item_edit);
                    if ui.button("Update").clicked() {
                        self.data[index] = self.item_edit.clone();
                    }
                });
            }

            // DELETE
            if let Some(index) = self.terpilih {
                if ui.button("Hapus").clicked() {
                    self.data.remove(index);
                    self.terpilih = None;
                }
            }
        });
    }
}
```

## Widget Egui Umum

```rust
// Button
if ui.button("Klik saya").clicked() {
    // Aksi
}

// Checkbox
ui.checkbox(&mut aktif, "Aktif");

// Radio button
ui.radio_value(&mut pilihan, 1, "Opsi 1");
ui.radio_value(&mut pilihan, 2, "Opsi 2");

// Slider
ui.slider(&mut nilai, 0..=100);

// Text input
ui.text_edit_singleline(&mut teks);
ui.text_edit_multiline(&mut teks_panjang);

// Combo box
egui::ComboBox::from_label("Pilih")
    .selected_text(format!("{}", terpilih))
    .show_ui(ui, |ui| {
        ui.selectable_value(&mut terpilih, 0, "Opsi 1");
        ui.selectable_value(&mut terpilih, 1, "Opsi 2");
    });
```

## Layout

```rust
// Vertical (default)
ui.vertical(|ui| {
    ui.label("Atas");
    ui.label("Bawah");
});

// Horizontal
ui.horizontal(|ui| {
    ui.label("Kiri");
    ui.label("Kanan");
});

// Grid
egui::Grid::new("grid_saya")
    .num_columns(2)
    .show(ui, |ui| {
        ui.label("Nama:");
        ui.label("John");
        ui.label("Umur:");
        ui.label("30");
    });

// Scroll area
egui::ScrollArea::vertical().show(ui, |ui| {
    for i in 0..100 {
        ui.label(format!("Item {}", i));
    }
});
```

## Panel

```rust
// Top panel
egui::TopBottomPanel::top("top_panel").show(ctx, |ui| {
    ui.heading("Header");
});

// Bottom panel
egui::TopBottomPanel::bottom("bottom_panel").show(ctx, |ui| {
    ui.label("Footer");
});

// Left side panel
egui::SidePanel::left("side_panel").show(ctx, |ui| {
    ui.label("Sidebar");
});

// Central panel
egui::CentralPanel::default().show(ctx, |ui| {
    ui.label("Konten utama");
});
```
