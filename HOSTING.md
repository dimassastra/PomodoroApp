# Cara Hosting Website Pomodoro

## 1. GitHub Pages (Gratis)

### Langkah-langkah:

1. **Buat akun GitHub** jika belum memilikinya (https://github.com/signup)
2. **Buat repositori baru** di GitHub:
   - Kunjungi https://github.com/new
   - Beri nama repositori (misalnya: `pomodoro-sman4-denpasar`)
   - Pilih "Public" dan klik "Create repository"

3. **Inisialisasi Git di direktori proyek dan unggah file**:
```bash
# Arahkan ke direktori proyek
cd C:\Users\Dimas\CascadeProjects\PomodoroApp

# Inisialisasi Git
git init

# Tambahkan semua file ke staging
git add .

# Buat commit pertama
git commit -m "Initial commit"

# Tambahkan remote repository
git remote add origin https://github.com/USERNAME/pomodoro-sman4-denpasar.git
# (Ganti USERNAME dengan username GitHub Anda)

# Unggah ke GitHub
git push -u origin master
```

4. **Aktifkan GitHub Pages**:
   - Kunjungi repositori Anda di GitHub
   - Klik "Settings" > pilih "Pages" di sidebar
   - Di "Source", pilih "master" (atau "main") sebagai branch
   - Klik "Save"
   - GitHub akan memberikan URL (biasanya https://username.github.io/pomodoro-sman4-denpasar/)

## 2. Netlify (Gratis & Mudah)

Netlify menawarkan hosting yang lebih mudah dengan antarmuka drag-and-drop.

### Langkah-langkah:

1. **Buat akun Netlify** (https://app.netlify.com/signup)
2. **Upload proyek Anda**:
   - Login ke Netlify
   - Seret dan lepas seluruh folder proyek ke area "Drag and drop your site folder here"
   - Tunggu proses upload dan deployment selesai
   - Netlify akan memberikan URL acak (Anda bisa mengubahnya nanti)

3. **Kustom domain (opsional)**:
   - Di dashboard Netlify, klik situs Anda
   - Klik "Domain settings"
   - Klik "Add custom domain" dan ikuti instruksinya

## 3. Vercel (Gratis)

Vercel sangat cocok untuk website statis dan menawarkan performa yang sangat baik.

### Langkah-langkah:

1. **Buat akun Vercel** (https://vercel.com/signup)
2. **Instal Vercel CLI**:
```bash
npm install -g vercel
```

3. **Deploy proyek**:
```bash
# Arahkan ke direktori proyek
cd C:\Users\Dimas\CascadeProjects\PomodoroApp

# Login ke Vercel (jika belum)
vercel login

# Deploy
vercel
```

4. **Ikuti instruksi** di prompt command line
   - Vercel akan memberikan URL untuk website Anda

## 4. Firebase Hosting (Gratis)

Firebase dari Google menawarkan hosting yang cepat dan andal.

### Langkah-langkah:

1. **Buat akun Firebase** (https://firebase.google.com/)
2. **Buat proyek baru** di Firebase Console
3. **Instal Firebase CLI**:
```bash
npm install -g firebase-tools
```

4. **Inisialisasi dan deploy**:
```bash
# Login ke Firebase
firebase login

# Arahkan ke direktori proyek
cd C:\Users\Dimas\CascadeProjects\PomodoroApp

# Inisialisasi proyek Firebase (pilih Hosting saat diminta)
firebase init

# Deploy ke Firebase
firebase deploy
```

5. **Firebase akan memberikan URL** untuk website Anda

## 5. Shared Hosting (Berbayar)

Jika membutuhkan solusi lebih profesional, pertimbangkan penyedia hosting seperti:

- **Hostinger** - Mulai dari Rp15.000/bulan
- **Niagahoster** - Mulai dari Rp21.000/bulan
- **DomaiNesia** - Mulai dari Rp25.000/bulan

### Langkah-langkah umum:

1. Daftar dan beli paket hosting
2. Beli domain (opsional, misalnya pomodoro-sman4.com)
3. Upload file melalui File Manager atau FTP
4. Arahkan domain ke folder yang berisi website

## Rekomendasi

Untuk proyek ini, **GitHub Pages** atau **Netlify** adalah pilihan terbaik karena:
1. Gratis selamanya untuk kebutuhan dasar
2. Mudah digunakan dan tidak memerlukan konfigurasi server
3. Performa sangat baik untuk website statis
4. Mendukung SSL otomatis (https)

Jika Anda ingin nama domain khusus (misalnya pomodoro-sman4.id), Anda perlu membeli domain dari penyedia domain seperti Namecheap, GoDaddy, atau lokal seperti IDwebhost, lalu mengarahkannya ke GitHub Pages atau Netlify Anda.
