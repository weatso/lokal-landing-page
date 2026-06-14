# PRODUCT REQUIREMENT DOCUMENT (PRD) & DEVELOPMENT BRIEF
## Project Name: LOKAL Landing Page Ecosystem
**Tagline:** #pakailokalaja  
**Target Market:** Strictly UMKM (Micro, Small, and Medium Enterprises)  
**Core Philosophy:** Zero-Friction UI (Saking sederhananya, bisa dikuasai dalam 3 menit tanpa training)

---

## 1. STRATEGIC POSITIONING & GUARDRAILS
1. **Target Isolation:** LOKAL hanya melayani segmen UMKM. Sistem harus ringkas, pragmatis, dan bebas dari birokrasi enterprise. Jika ada prospek skala korporasi besar, mereka harus dialihkan secara tegas ke lini premium **WEATSO**.
2. **Architecture Layout:** Seluruh produk pemasaran wajib diletakkan di bawah **Subdirektori** (cth: `pakailokal.com/pos-fnb`), BUKAN subdomain. Subdomain hanya digunakan untuk pintu masuk operasional aplikasi (cth: `app.pakailokal.com`). Hal ini penting untuk memusatkan kekuatan SEO pada domain utama.
3. **Core Philosophy Implementation:** Hindari penggunaan bahasa teknis IT yang kaku. Fokus pada kemudahan ekstrem (Zero-Friction). Antarmuka harus bersih, teks berbobot tebal, mudah dibaca, dan fungsional (bukan UI dekoratif yang memperlambat *loading*).

---

## 2. DESIGN SYSTEM & COLOR PALETTE
Desain menggunakan aturan rasio visual **60-30-10** berdasarkan ekstraksi logo resmi LOKAL. Sifat UI harus tangguh, merakyat, mudah dibaca di luar ruangan, dan tidak mengintimidasi calon klien UMKM.

### A. Light Mode (Default)
* **Background Utama (60%):** Off-White lembut (`#FAFAFA`). Jangan gunakan putih pekat (`#FFFFFF`) agar tidak silau di mata pengguna lapangan.
* **Warna Teks Paragraf:** Abu-abu Arang (`#333333`). Memberikan kontras yang kuat namun nyaman di mata dibanding hitam pekat.
* **Primary Brand Color (30%):** *Dark Teal/Cyan* (diambil dari teks logo 'lokal'). Digunakan untuk *Headlines (H1, H2)*, *Navbar*, dan *borders* kartu.
* **Accent/Action Color (10%):** *Tangerine/Orange* (diambil dari ikon panah logo). **Hanya** boleh digunakan untuk elemen konversi komersial:
  * Tombol *Call to Action* (CTA) Utama.
  * *Hover states* pada navigasi penting.
  * Ikon penanda keunggulan produk.

### B. Dark Mode Support
* **Background Utama:** *Deep Charcoal* (`#121212`). Jangan gunakan hitam mati (`#000000`).
* **Background Kartu/Komponen:** `#1E1E1E` dengan teks putih pucat untuk menjaga keterbacaan tinggi.

---

## 3. PAGES SPECIFICATIONS

### PAGE 1: MAIN LANDING PAGE (`pakailokal.com/`)
Halaman ini bertindak sebagai "Resepsionis Cerdas". Tugas utamanya adalah mengenalkan identitas LOKAL, melakukan filtrasi pasar, dan mengarahkan pengguna ke solusi spesifik bisnis mereka melalui seksi *routing*.

#### Seksi 1: Hero Section (Atas Lipatan Layar)
* **Visual:** Latar belakang gradasi gelap yang elegan (*dark gradients*) untuk membangun kredibilitas keamanan sistem. Teks berwarna terang kontras.
* **Headline Utama:** Digitalisasi Bisnis Tanpa Bikin Pusing Kepala.
* **Sub-Headline:** Ekosistem terintegrasi untuk mengotomatiskan operasional UMKM Anda. Kami membangun sistem ini dengan prinsip *zero-friction*. Saking sederhananya antarmuka kami, staf lapangan atau karyawan baru tanpa pengalaman teknologi apa pun bisa langsung menguasainya di bawah 3 menit. Tanpa pusing, tanpa training panjang.
* **Tombol CTA (Warna Oranye Logo):** Pilih Solusi Bisnis Anda ↓  
  *(Mekanisme Teknis: Anchor Link dengan efek smooth scroll langsung meluncur ke Seksi 4: Routing).*

#### Seksi 2: Exclusive Filter (Pagar Pembatas Klien)
* **Visual:** Transisi ke latar belakang Off-White (`#FAFAFA`). Kotak pembatas berdesain tegas dengan latar belakang kontras.
* **Copywriting:** > **PENTING:** LOKAL dirancang khusus demi kelincahan dan kecepatan operasional **UMKM**. Kami membuang semua birokrasi sistem yang rumit. Jika Anda adalah korporasi besar skala *enterprise*, sistem ini tidak akan cocok untuk Anda. [Untuk Solusi Korporasi Besar, Klik di Sini ke WEATSO].

#### Seksi 3: Core Problem Section (Efisiensi & Waktu)
* **Headline:** Berhenti Pusing Mengurus Operasional Manual. Biarkan Sistem yang Bekerja.
* **Copywriting:** > Bisnis terhambat bukan karena kurang pembeli, tapi karena operasional yang berantakan. Antrean yang tidak terlacak, jadwal yang bentrok, hingga pencatatan kertas yang memakan waktu. LOKAL mengotomatiskan tugas-tugas administratif tersebut, sehingga Anda dan tim bisa kembali fokus melayani pelanggan dan mengembangkan skala bisnis.

#### Seksi 4: Routing Section (Pusat Penyelamatan Bisnis)
* **Visual:** Ditampilkan dalam bentuk Grid 3-Kolom atau Kartu Vertikal yang bersih. Judul seksi dominan menggunakan warna *Teal*.
* **Headline Seksi:** Berhenti Pakai Cara Manual. Pilih Jalur Penyelamatan Anda:
* **Kartu 1: LOKAL POS F&B**
  * *Deskripsi:* Otomatiskan pencatatan pesanan, pantau ketersediaan stok, dan amankan laporan shift harian resto Anda dari mana saja secara *real-time*.
  * *CTA Tombol:* Kunci Laci Kasir Saya ➔ `[Halaman /pos-fnb]`
* **Kartu 2: LOKAL x Iwash**
  * *Deskripsi:* Lacak antrean kendaraan yang masuk dan biarkan sistem menghitung pembagian komisi karyawan Anda secara presisi setiap akhir *shift*.
  * *CTA Tombol:* Atur Cuci Mobil ➔ `[Halaman /iwash]`
* **Kartu 3: LOKAL x RentCar**
  * *Deskripsi:* Pangkas biaya operasional. Kelola ketersediaan armada dengan kalender pintar anti-bentrok, dan biarkan sistem mengurus rekapitulasi data.
  * *CTA Tombol:* Kelola Rental ➔ `[Halaman /rentcar]`
* **Kartu 4: LOKAL x ValetIndonesia**
  * *Deskripsi:* Tinggalkan tiket kertas. Berikan pengalaman premium dengan sistem serah-terima dan pelacakan karcis kendaraan digital via WhatsApp.
  * *CTA Tombol:* Digitalisasi Valet ➔ `[Halaman /valet-indonesia]`
* **Kartu 5: LOKAL x BrosurHub**
  * *Deskripsi:* Brosur Digital & WA Blasting. Bagikan katalog digital dan jangkau ratusan pelanggan lama Anda lewat WhatsApp. Alternatif paling cerdas untuk UMKM meningkatkan konversi promosi tanpa biaya website mahal.
  * *CTA Tombol:* Buat Profil Digital ➔ `[Halaman /brosurhub]`

#### Seksi 5: Final Action (Lead Magnet WhatsApp)
* **Headline:** Bingung Sistem Mana yang Sesuai?
* **Sub-text:** Tim LOKAL siap datang langsung ke lokasi usaha Anda di Semarang untuk memberikan demo gratis di tempat.
* **Tombol CTA Utama (Oranye Logo):** Hubungi CS LOKAL via WhatsApp (Jadwalkan Demo Gratis)

---

### PAGE 2: PORTAL INSTAGRAM LINK (`pakailokal.com/portal`)
Halaman ini bertindak sebagai pengganti Linktree khusus untuk diakses melalui perangkat *mobile* lewat tautan di Bio Instagram `@pakailokalaja`. Desain wajib bersih, membuang semua elemen navigasi *header* dan *footer* situs web utama agar proses pemuatan (*loading*) instan di HP pelanggan.

* **Latar Belakang:** `#FAFAFA` murni.
* **Header Atas:** Logo LOKAL di posisi tengah (centered) dengan teks kecil di bawahnya: `#pakailokalaja`.
* **Struktur Tombol Vertikal (Warna Teal Solid, Teks Putih):**
  1. `[ Aplikasi Kasir Kafe/Resto (LOKAL POS) ]` ➔ Menuju `/pos-fnb`
  2. `[ Sistem Manajemen Cuci Mobil (Iwash) ]` ➔ Menuju `/iwash`
  3. `[ Sistem Penjadwalan Rental Mobil (RentCar) ]` ➔ Menuju `/rentcar`
  4. `[ Sistem Tiket Digital Valet (ValetIndonesia) ]` ➔ Menuju `/valet-indonesia`
  5. `[ Kirim Brosur Digital & WA Blasting (BrosurHub) ]` ➔ Menuju `/brosurhub`
  6. `[ 📞 Undang Tim LOKAL ke Warung Anda (Demo Gratis) ]` ➔ Menuju Tautan Langsung API WhatsApp CS
* **Catatan Kaki (Small Muted Text):** Khusus Solusi Korporasi Besar/Enterprise, silakan akses [weatso.com].

---

## 4. FUTURE NOTE FOR DEVELOPER (PRICING STRATEGY REGION)
* **Spesifikasi Khusus Halaman `/pos-fnb`:** Di dalam halaman khusus POS F&B kelak, pengembang wajib menyediakan logika tampilan tarif berbasis wilayah (*pricing tier*). Sistem harus mampu menampilkan penawaran harga regional standar (Semarang) dan tarif khusus disinsentif/subsidi untuk wilayah terpencil (cth: Wilayah Belitung) demi pemerataan jangkauan digitalisasi. Jangan masukkan logika harga wilayah ini di halaman utama (`/`).

---

## 5. TECHNICAL PERFORMANCE REQUIREMENT
1. **Zero Layout Shift:** Penggunaan komponen UI tidak boleh menyebabkan pergeseran tata letak saat gambar logo dimuat.
2. **Instant Navigation Routing:** Perpindahan antar halaman subdirektori (`/`, `/portal`, `/pos-fnb`) wajib berjalan instan menggunakan *router* bawaan *framework* modern tanpa memuat ulang seluruh halaman dari nol.
3. **Responsive Scaling:** Tata letak kartu di Routing Section harus otomatis bertransisi dari 3-kolom (Desktop) menjadi 1-kolom vertikal rapat (Mobile/HP) tanpa merusak keterbacaan teks deskripsi.