# CRUD Mahasiswa JSON
Oleh:
2311102279
Natasya Intan Sukma Jiwanti
S1-IF-11-04

1. Deksripsi Source Code
Aplikasi CRUD Mahasiswa yang memiliki fitur - fitur seperti dibawah:
## Fitur
**1. Login Admin**
Fitur login digunakan untuk membatasi akses ke sistem agar hanya admin yang dapat mengelola data mahasiswa. Username dan password disimpan di dalam JavaScript:
   Username: admin
   Password: admin123
Sistem menggunakan localStorage untuk menyimpan status login:
   isLoggedIn
   adminUsername
Jika login berhasil, maka pengguna kan diarahkan ke halaman dashboard (index.html), sedangkan jika gagal akan muncul alert “Username atau password salah”. Lalu, jika pengguna blm melakukan login namun mencoba mengakses halaman lain akan otomatis redirect ke login.html.

**2. Tambah Mahasiswa**
Fitur untuk menambahkan data mahasiswa baru melalui form input.
Input yang diisi:
a. NIM
b. Nama
c. Fakultas
d. Jurusan
e. Angkatan
f. Email
g. Proses:
h. Form divalidasi (tidak boleh kosong)
i. Data dikirim ke server menggunakan AJAX (POST)

Data yang telah diinput akan diteruskan ke endpoint /api/mahasiswa. Jika berhasil akan muncul notifikasi sukses, dan form di-reset, lalu akan langsung redirect ke halaman tabel. Namun, apabila gagal akan muncul pesan error

**3. Lihat Data Mahasiswa**
Fitur Lihat Data Mahasiswa digunakan untuk menampilkan seluruh data mahasiswa yang telah tersimpan dalam sistem ke dalam bentuk tabel interaktif. Data yang ditampilkan bersumber dari file JSON (mahasiswa.json) melalui API yang disediakan oleh backend Node.js.

Pada fitur ini, sistem akan secara otomatis mengambil data dari server menggunakan metode HTTP GET ke endpoint /api/mahasiswa. Data yang diterima dalam format JSON kemudian diolah menggunakan jQuery dan ditampilkan dalam bentuk tabel menggunakan plugin jQuery DataTables, sehingga tampilan menjadi lebih interaktif dan mudah digunakan oleh pengguna.

Teknologi yang digunakan:
- jQuery → untuk melakukan request AJAX dan manipulasi DOM
- jQuery DataTables → untuk menampilkan tabel interaktif
- API JSON (Node.js) → sebagai sumber data mahasiswa

Cara Kerja:
1. Ketika halaman tabel dibuka (table.html), sistem akan menjalankan AJAX request.
2. Sistem mengirim permintaan ke server menggunakan GET /api/mahasiswa
3. Server membaca data dari file mahasiswa.json dan mengirimkan kembali dalam format JSON.
4. Data diterima oleh frontend dan ditampilkan ke dalam tabel HTML.
5. Plugin DataTables diaktifkan untuk memberikan fitur tambahan pada tabel.

Pada tabel juga tersedia fitur fitur seperti:
a. Pagination, data ditampilkan per halaman (misalnya 5 data per halaman), sehingga tidak terlalu panjang dan lebih rapi.
b. Search (Pencarian), pengguna dapat mencari data mahasiswa berdasarkan kata kunci seperti nama, NIM, atau jurusan.
c. Sorting (Pengurutan), data dapat diurutkan berdasarkan kolom tertentu, seperti nama atau angkatan.
d. Responsive Table, tabel tetap dapat ditampilkan dengan baik di berbagai ukuran layar.

**4. Edit Data Mahasiswa**
Fitur Edit Data Mahasiswa digunakan untuk memperbarui atau mengubah data mahasiswa yang sudah tersimpan di dalam sistem. Fitur ini memudahkan admin dalam melakukan koreksi atau pembaruan data tanpa harus menghapus dan menambahkan data baru. Cara Kerja fitur ini:
1. Pada halaman tabel, admin menekan tombol Edit pada salah satu data mahasiswa.
2. Sistem akan mengarahkan pengguna ke halaman edit dengan membawa parameter ID: edit.html?id=...
3. Setelah halaman terbuka, sistem akan mengambil data mahasiswa berdasarkan ID tersebut melalui request ke GET /api/mahasiswa/id
4. Data yang diterima akan secara otomatis ditampilkan (auto-fill) ke dalam form edit.
5. Admin dapat mengubah data sesuai kebutuhan.
6. Setelah selesai, admin menekan tombol Update Data.
7. Sistem akan mengirimkan data terbaru ke server menggunakan PUT /api/mahasiswa/:id
8. Jika proses berhasil, maka sistem menampilkan notifikasi sukses dan engguna akan diarahkan kembali ke halaman tabel

**5. Hapus Data Mahasiswa**
Fitur Hapus Data Mahasiswa digunakan untuk menghapus data mahasiswa yang sudah tidak diperlukan dari sistem. Berikut rincian cara kerja fitur ini:
1. Admin menekan tombol Hapus pada data yang ingin dihapus.
2. Sistem akan menampilkan pesan konfirmasi "Yakin ingin menghapus data ini?"
3. Jika admin memilih OK, maka sistem akan mengirim request ke server dengan menggunakan DELETE /api/mahasiswa/:id
4. Server akan menghapus data tersebut dari file JSON.
5. Setelah berhasil akan muncul notifikasi bahwa data berhasil dihapus dan tabel akan diperbarui (reload) secara otomatis

**6. Penyimpanan Data**
Seluruh data akan disimpan dalam bentuk json pada file mahasiswa.json pada folder data. Untuk menyimpannya, digunakan Node.js dengan framework Express untuk mengelola data, dengan menggunakan dua fungsi utama:
a. readData() → digunakan untuk membaca data dari file JSON
b. writeData() → digunakan untuk menyimpan atau memperbarui data ke file JSON

Alur penyimpanan data:
1. Ketika ada permintaan dari frontend (tambah, edit, hapus)
2. Server membaca data lama dari JSON
3. Data diproses (ditambah, diubah, atau dihapus)
4. Data baru disimpan kembali ke file JSON

**7. Dashboard**
Fitur Dashboard Statistik digunakan untuk menampilkan ringkasan dan visualisasi data mahasiswa secara cepat dan informatif. Cara kerja fitur:
1. Saat halaman dashboard dibuka, sistem melakukan request ke GET /api/mahasiswa
2. Data mahasiswa diambil dari server
3. Data tersebut diolah menggunakan JavaScript untuk:
   a. Menghitung total data
   b. Mengelompokkan berdasarkan fakultas, jurusan, dan angkatan
4. Kemudian hasil pengolahan ditampilkan dalam bentuk:
   a. Statistik angka (card)
   b. Grafik batang sederhana (bar chart)
   c. Daftar distribusi data

**8. Logout**
Fitur Logout digunakan untuk mengakhiri sesi login admin dan mengamankan akses ke sistem.

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

## LINK PPT DAN VIDEO PRESENTASI
PPT: 
VIDEO: 
