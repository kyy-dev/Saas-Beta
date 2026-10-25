# Saas-Platform

![Rilis](https://img.shields.io/badge/versi-v1.0.0-1b211d)
![Status](https://img.shields.io/badge/status-prototipe-a83f20)
![HTML5](https://img.shields.io/badge/HTML5-landing_page-e34f26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-responsif-1572b6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-browser_fitur-f7df1e?logo=javascript&logoColor=1b211d)
![Lisensi ISC](https://img.shields.io/badge/lisensi-ISC-505a53)

Workspace PixelShift untuk mengolah gambar. Unggah satu gambar, pilih pekerjaan, lalu unduh hasil PDF langsung dari browser.

> **Status fitur:** konversi satu gambar menjadi PDF tersedia secara lokal di browser. Penghapusan background belum tersedia karena layanan pemroses belum terhubung.

## Metode Pengembangan Proyek

Proyek ini dibangun menggunakan pendekatan hibrida antara otomatisasi kecerdasan buatan (*AI-assisted*) dan kontrol logika manusia:

- **Frontend Development**: Antarmuka pengguna dan struktur tata letak dioptimalkan menggunakan bantuan agen AI untuk efisiensi kecepatan dan implementasi desain.
- **Backend & Business Logic**: Seluruh alur logika, pengkodean sistem, serta penanganan fungsionalitas inti dikembangkan dan dikelola sepenuhnya secara manual melalui logika pemrograman murni untuk memastikan keamanan dan kontrol penuh.

## Fitur

- **Konversi ke PDF:** buat PDF satu halaman dari gambar JPG, PNG, atau WebP di browser.
- **Hapus background:** pilihan alat ditampilkan, tetapi pemrosesan belum aktif sampai layanan terhubung.
- **Pratinjau lokal:** browser membaca gambar yang dipilih tanpa mengunggahnya ke server.
- **Validasi file:** menerima format JPG, PNG, dan WebP, dengan batas ukuran 15 MB.
- **Tampilan responsif:** tata letak menyesuaikan layar ponsel, tablet, dan desktop.

## Teknologi

Proyek saat ini menggunakan HTML, CSS, dan JavaScript native. `package.json` mencatat versi `1.0.0` dan lisensi `ISC`. Aplikasi frontend tidak membutuhkan proses build.

## Instalasi dan menjalankan secara lokal

### Persyaratan

- Browser modern.
- Python 3 jika ingin menjalankan server lokal.

### Buka langsung

Buka `Frontend/index.html` di browser. Cara ini cukup untuk mencoba antarmuka dan pratinjau gambar lokal.

### Jalankan server lokal

Di Windows, buka terminal pada folder `Frontend`, lalu jalankan:

```powershell
py -m http.server 8000
```

Buka [http://localhost:8000](http://localhost:8000) di browser. Untuk menghentikan server, tekan `Ctrl+C` di terminal.

## Panduan penggunaan

1. Buka halaman aplikasi.
2. Pilih gambar melalui area unggah atau tarik dan lepaskan gambar ke area tersebut.
3. Pilih **Konversi ke PDF**, lalu tekan **Buat PDF**.
4. Tekan **Unduh PDF** setelah hasil siap.

Untuk menghapus background, pilih alat tersebut untuk melihat status integrasinya. Halaman memberi pesan jika format gambar tidak didukung, ukuran file melebihi 15 MB, atau browser gagal membuat PDF. Pemilihan dan konversi gambar berlangsung di browser.

## Struktur proyek

```text
 Saas Platform (Folder Utama / Root)
 ┣  css
 ┃  ┗  style.css
 ┣  index.html
 ┣  package.json
 ┗  README.md
```

## Rilis

### v1.0.0 - Initial Release / Rilisan Pertama

- Menambahkan workspace PixelShift responsif dengan unggah gambar terpusat.
- Menyediakan pratinjau lokal, validasi format, dan pembuatan PDF di browser.
- Menampilkan status integrasi untuk penghapusan background yang belum tersedia.

## Kontribusi

Kontribusi dipersilakan. Untuk perubahan:

1. Fork repositori dan buat branch dari versi terbaru.
2. Buat perubahan yang fokus dan sertakan penjelasan singkat.
3. Uji halaman di browser pada ukuran layar ponsel dan desktop.
4. Buka pull request dengan ringkasan perubahan dan langkah pengujian.

## Pembuat

Dikembangkan oleh **kyy-dev**.

## Lisensi

Metadata proyek mencantumkan lisensi **ISC** pada `package.json`.
