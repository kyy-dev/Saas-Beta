# Saas-Platform

![Rilis](https://img.shields.io/badge/versi-v1.0.0-1b211d)
![Status](https://img.shields.io/badge/status-prototipe-a83f20)
![HTML5](https://img.shields.io/badge/HTML5-landing_page-e34f26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-responsif-1572b6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-browser_fitur-f7df1e?logo=javascript&logoColor=1b211d)
![Lisensi ISC](https://img.shields.io/badge/lisensi-ISC-505a53)

Landing page untuk alat pengolahan gambar: **Image to PDF Converter** dan **AI Background Remover (Tanpa Adobe)**. Antarmuka menyediakan pemilihan gambar dan pratinjau lokal di browser.

> **Status fitur:** rilis ini adalah prototipe antarmuka. Konversi ke PDF dan penghapusan background belum tersedia; keduanya memerlukan integrasi layanan pemrosesan.

## Metode Pengembangan Proyek

Proyek ini dibangun menggunakan pendekatan hibrida antara otomatisasi kecerdasan buatan (*AI-assisted*) dan kontrol logika manusia:

- **Frontend Development**: Antarmuka pengguna dan struktur tata letak dioptimalkan menggunakan bantuan agen AI untuk efisiensi kecepatan dan implementasi desain.
- **Backend & Business Logic**: Seluruh alur logika, pengkodean sistem, serta penanganan fungsionalitas inti dikembangkan dan dikelola sepenuhnya secara manual melalui logika pemrograman murni untuk memastikan keamanan dan kontrol penuh.

## Fitur

- **Image to PDF Converter:** pilih gambar JPG, PNG, atau WebP dan lihat pratinjau. Pembuatan PDF belum diaktifkan.
- **AI Background Remover:** pilih gambar untuk menyiapkan alur remover. Pemrosesan background belum diaktifkan.
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
3. Untuk mencoba alur PDF, gunakan **Pilih gambar untuk PDF**. Untuk alur remover, gunakan **Pilih gambar untuk remover**.
4. Periksa pratinjau dan status file pada halaman.

Jika format tidak didukung, file melebihi batas ukuran, atau browser tidak dapat membaca gambar, halaman akan menampilkan pesan status. Pemilihan gambar belum menghasilkan file PDF atau gambar tanpa background sampai layanan pemrosesan diintegrasikan.

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

- Menambahkan landing page responsif untuk Image to PDF Converter dan AI Background Remover.
- Menyediakan pemilihan file, pratinjau lokal, validasi format, dan pesan status.
- Menandai konversi PDF dan penghapusan background sebagai fitur yang memerlukan integrasi.

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
