# Saas-Platform

![Rilis](https://img.shields.io/badge/versi-v1.0.0-1b211d)
![Status](https://img.shields.io/badge/status-prototipe-a83f20)
![HTML5](https://img.shields.io/badge/HTML5-landing_page-e34f26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-responsif-1572b6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-browser_fitur-f7df1e?logo=javascript&logoColor=1b211d)
![Lisensi ISC](https://img.shields.io/badge/lisensi-ISC-505a53)

PixelShift menyediakan alat untuk mengolah gambar. Pilih alat dari beranda, lalu gunakan konversi PDF langsung di browser.

> **Status fitur:** konversi gambar menjadi PDF tersedia di browser. Hapus background, kompres gambar, ubah format, ubah ukuran, dan unduh video TikTok masih dalam pengembangan dan belum menerima file atau tautan.

## Metode Pengembangan Proyek

Proyek ini dibangun menggunakan pendekatan hibrida antara otomatisasi kecerdasan buatan (*AI-assisted*) dan kontrol logika manusia:

- **Frontend Development**: Antarmuka pengguna dan struktur tata letak dioptimalkan menggunakan bantuan agen AI untuk efisiensi kecepatan dan implementasi desain.
- **Pemrosesan gambar**: validasi file dan konversi PDF berjalan di browser. Gambar tidak dikirim ke server.

## Fitur

- **Konversi ke PDF:** buat PDF satu halaman dari gambar JPG, PNG, atau WebP di browser.
- **Hapus background:** ditampilkan sebagai alat dalam pengembangan; pemrosesan belum aktif.
- **Alat gambar lain:** kompres, ubah format, dan ubah ukuran ditampilkan sebagai alat dalam pengembangan.
- **Unduh video TikTok:** ditampilkan sebagai alat dalam pengembangan; input tautan belum aktif.
- **Pratinjau lokal:** browser membaca gambar yang dipilih tanpa mengunggahnya ke server.
- **Validasi file:** menerima format JPG, PNG, dan WebP, dengan batas ukuran 15 MB.
- **Tampilan responsif:** tata letak menyesuaikan layar ponsel, tablet, dan desktop.

## Teknologi

Proyek menggunakan HTML, CSS, dan JavaScript native dengan ES modules. Konversi PDF berjalan di browser; Node.js menyediakan server statis lokal. Tidak ada dependency tambahan atau proses build.

## Instalasi dan menjalankan secara lokal

### Persyaratan

- Node.js dan npm.
- Browser modern.

### Jalankan server lokal

Dari folder utama proyek, jalankan:

```powershell
npm start
```

Buka [http://127.0.0.1:8000](http://127.0.0.1:8000) di browser. Server menyajikan file statis dari folder `Frontend/`. Untuk menghentikannya, tekan `Ctrl+C` di terminal.

## Panduan penggunaan

1. Buka beranda aplikasi.
2. Pilih kartu **Gambar ke PDF**.
3. Pilih gambar melalui area unggah atau tarik dan lepaskan gambar ke area tersebut.
4. Pilih **Konversi ke PDF**, lalu tekan **Buat PDF**.
5. Tekan **Unduh PDF** setelah hasil siap.

Untuk menghapus background, pilih alat tersebut untuk melihat status integrasinya. Halaman memberi pesan jika format gambar tidak didukung, ukuran file melebihi 15 MB, atau browser gagal membuat PDF. Pemilihan dan konversi gambar berlangsung di browser.

## Mesin pencari

Halaman beranda dan alat PDF memiliki judul, deskripsi, metadata berbagi, dan instruksi agar mesin pencari dapat mengindeksnya. `Frontend/robots.txt` mengizinkan crawling. Sitemap dan URL kanonis memerlukan domain produksi; keduanya belum dibuat karena proyek ini belum memiliki domain publik. Saat deploy, jadikan `Frontend/` sebagai root situs agar `robots.txt` dan `sitemap.xml` tersedia di lokasi standar.

Setelah situs tersedia melalui HTTPS pada domain utamanya, buat sitemap dan URL kanonis dengan perintah berikut dari folder utama:

```powershell
npm run seo:sitemap -- https://domain-publik.example
```

Ganti alamat contoh dengan domain sebenarnya, tanpa path tambahan. Perintah ini menulis `Frontend/sitemap.xml`, memperbarui arahan sitemap di `Frontend/robots.txt`, dan menambahkan URL kanonis ke halaman beranda dan PDF. Unggah file hasilnya bersama situs.

Kemudian tambahkan properti domain di Google Search Console, verifikasi kepemilikan, dan kirim `https://domain-publik.example/sitemap.xml` melalui menu **Sitemaps**. `robots.txt` akan ditemukan Google pada root domain. Arahkan variasi domain HTTP dan `www` ke satu alamat HTTPS utama, lalu periksa halaman memakai **URL Inspection** dan minta pengindeksan. Situs lokal `127.0.0.1` tidak dapat dirayapi Google. Crawling dan pengindeksan baru bisa diminta setelah deploy publik, dan Google tetap menentukan apakah serta kapan halaman dimasukkan ke hasil pencarian.

## Struktur proyek

```text
.
├── Frontend
│   ├── css
│   │   └── style.css
│   ├── js
│   │   ├── app.js
│   │   ├── file-validation.js
│   │   ├── home.js
│   │   ├── image-to-pdf.js
│   │   ├── illustrations.js
│   │   └── tools.js
│   ├── index.html
│   ├── pdf.html
│   ├── robots.txt
│   └── server.js
├── scripts
│   └── generate-sitemap.js
├── package.json
└── README.md
```

Belum ada folder backend karena alat TikTok masih dalam pengembangan.

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
