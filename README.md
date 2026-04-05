# CRUD Mahasiswa JSON

Aplikasi CRUD Mahasiswa sederhana menggunakan Node.js, Express, Bootstrap, jQuery, DataTables, dan file JSON.

## Fitur

- Tambah mahasiswa
- Lihat data mahasiswa
- Edit data mahasiswa
- Hapus data mahasiswa
- Data disimpan dalam `data/mahasiswa.json`

## Cara Menjalankan

1. Install dependensi:
   ```bash
   npm install
   ```
2. Jalankan server:
   ```bash
   npm start
   ```
3. Buka browser dan akses:
   ```text
   http://localhost:3000
   ```

## Struktur Proyek

- `app.js`: server Express dan endpoint API
- `data/mahasiswa.json`: data mahasiswa
- `public/`: file frontend (HTML, CSS, JS)
- `public/js/`: skrip jQuery untuk form, tabel, dan edit
- `public/css/style.css`: gaya tampilan

## Catatan

Server statis melayani semua file dari folder `public`, dan API berada di route `/api/mahasiswa`.
