# FreeWithRidho - Professional Portfolio

Selamat datang di repositori kode untuk **FreeWithRidho**, sebuah platform portofolio digital dan profil profesional yang dirancang dengan estetika modern, responsif, dan interaktif.

## 🚀 Fitur Utama
- **Desain Modern**: Tema gelap dengan aksen *neon blue*, animasi interaktif, dan efek *glassmorphism* yang elegan.
- **Responsif Penuh**: Tampilan antarmuka yang sangat optimal untuk perangkat seluler maupun layar desktop yang lebar.
- **Keamanan Lanjutan**: Dilengkapi skrip untuk memblokir klik kanan, mencegah blok teks (copypaste), dan menonaktifkan *Inspect Element* (F12, Ctrl+U) untuk melindungi karya digital Anda.
- **Sistem Keamanan API**: Konfigurasi kunci rahasia (API Keys) yang disuntikkan secara dinamis melalui proses *build* terpisah, sehingga tidak bocor ke publik.

## 🛠️ Teknologi yang Digunakan
- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript
- **Backend / Alat Build**: Node.js & Express
- **Database**: Firebase Firestore (Manajemen Persetujuan Cookie)
- **Aset Ekstra**: FontAwesome 6 & Google Fonts (Poppins)

## 📦 Panduan Instalasi (Menjalankan secara Lokal)

1. Instal dependensi NodeJS:
   ```bash
   npm install
   ```
2. Buat file bernama `.env` di direktori paling luar (root) dan masukkan konfigurasi Firebase Anda:
   ```env
   FIREBASE_API_KEY=xxx
   FIREBASE_AUTH_DOMAIN=xxx
   FIREBASE_PROJECT_ID=xxx
   FIREBASE_STORAGE_BUCKET=xxx
   FIREBASE_MESSAGING_SENDER_ID=xxx
   FIREBASE_APP_ID=xxx
   FIREBASE_MEASUREMENT_ID=xxx
   ```
3. Jalankan server pengembangan:
   ```bash
   npm start
   ```
4. Buka web browser Anda dan kunjungi `http://localhost:3000`.

## 🌐 Panduan Deployment (Netlify)
Proyek ini telah dikonfigurasi agar siap di-hosting ke Netlify dengan pengaturan berikut:
- **Base directory**: *(Kosong)*
- **Build command**: `npm run build`
- **Publish directory**: `dist`

Pastikan Anda memasukkan variabel rahasia Firebase ke dalam menu *Environment Variables* di dashboard Netlify.

---
*Didesain dan dikembangkan secara eksklusif untuk FreeWithRidho.*