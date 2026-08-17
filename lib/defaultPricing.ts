export const DEFAULT_PRICING = {
  'pos-fnb': {
    title: 'Lokal F&B',
    basePrices: [
      { id: 'semarang', area: 'Semarang (LOKAL Area)', price: 50000 },
      { id: 'belitung', area: 'Belitung (LOKAL Area)', price: 50000 },
      { id: 'nasional', area: 'Area Lain (Indonesia)', price: 65000 },
    ],
    addons: [
      { id: 'meja-qr',       cat: 'Fitur Kasir & Dapur',   name: 'Manajemen Meja & QR Menu',          price: 50000, iconName: 'Coffee',    iconBg: 'bg-orange-100', iconColor: 'text-orange-600', desc: 'QR per meja, menu HP, pesanan masuk real-time.' },
      { id: 'stok-premium',  cat: 'Fitur Kasir & Dapur',   name: 'Stok Premium & Pencegah Oversell',  price: 35000, iconName: 'Package',   iconBg: 'bg-red-100',    iconColor: 'text-red-600',    desc: 'Kasir terkunci otomatis jika stok habis.' },
      { id: 'kds',           cat: 'Fitur Kasir & Dapur',   name: 'Kitchen Display & Checker (KDS)',   price: 35000, iconName: 'ChefHat',   iconBg: 'bg-yellow-100', iconColor: 'text-yellow-600', desc: 'Layar antrean dapur real-time. Otomatis pisah cetakan (kasir nota bayar, dapur checker).' },
      { id: 'payroll',       cat: 'Karyawan & Laporan',    name: 'Absensi & Penggajian',               price: 75000, iconName: 'UserCheck', iconBg: 'bg-emerald-100',iconColor: 'text-emerald-600',desc: 'Jam kerja, gaji, dan slip gaji digital.' },
      { id: 'keuangan',      cat: 'Karyawan & Laporan',    name: 'Dashboard Keuangan',                 price: 75000, iconName: 'PieChart',  iconBg: 'bg-blue-100',   iconColor: 'text-blue-600',   desc: 'Laporan Laba/Rugi bersih, bukan sekadar omzet.' },
      { id: 'crm',           cat: 'Pelanggan Setia',       name: 'Data Pelanggan & Loyalty',           price: 45000, iconName: 'Heart',     iconBg: 'bg-pink-100',   iconColor: 'text-pink-600',   desc: 'Catat pelanggan, riwayat, poin, & diskon khusus.' },
      { id: 'pager-digital', cat: 'Pelanggan Setia',       name: 'Layar Antrean (Digital Pager)',      price: 25000, iconName: 'Tv2',       iconBg: 'bg-cyan-100',   iconColor: 'text-cyan-600',   desc: 'Tampilan nomor antrean pesanan di Smart TV.' },
      { id: 'extra-branch',  cat: 'Cabang Ekstra',         name: 'Tambah Cabang Baru',                 price: 75, priceType: 'percentage', dynamic: true, iconName: 'Building2', iconBg: 'bg-purple-100', iconColor: 'text-purple-600', desc: 'Cabang baru otomatis mewarisi semua fitur aktif.' },
      { id: 'pager-fisik',   cat: 'Sekali Bayar',          name: 'Integrasi Alat Pager Fisik',         price: 350000, oneTime: true, iconName: 'Vibrate', iconBg: 'bg-gray-100', iconColor: 'text-gray-600', desc: 'Sambungkan sistem ke alat pager yang bergetar.' },
      { id: 'migrasi',       cat: 'Sekali Bayar',          name: 'Jasa Pindah Data & Setup',           price: 500000, oneTime: true, iconName: 'HardDrive', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600', desc: 'Tim kami bantu masukkan semua menu & stok.' },
    ],
    discount6m: 10, discount12m: 20,
    promoCodes: [] as { id: string; code: string; discount: number; isActive: boolean }[]
  },
  'pos-retail': {
    title: 'Lokal Retail',
    basePrices: [
      { id: 'semarang', area: 'Semarang (LOKAL Area)', price: 50000 },
      { id: 'belitung', area: 'Belitung (LOKAL Area)', price: 50000 },
      { id: 'nasional', area: 'Area Lain (Indonesia)', price: 65000 },
    ],
    addons: [
      { id: 'stok-premium',  cat: 'Operasional',           name: 'Stok Premium (Wajib Retail)',       price: 35000, iconName: 'Package',   iconBg: 'bg-red-100',    iconColor: 'text-red-600',    desc: 'Pengunci kasir, indikator warna stok menipis, dan draf restock otomatis.' },
      { id: 'crm',           cat: 'Pelanggan Setia',       name: 'CRM & Poin Loyalitas',              price: 45000, iconName: 'Heart',     iconBg: 'bg-pink-100',   iconColor: 'text-pink-600',   desc: 'Sistem member VIP (misal: komunitas Vape/Pet).' },
      { id: 'keuangan',      cat: 'Karyawan & Laporan',    name: 'Dashboard Laba/Rugi Bersih',        price: 75000, iconName: 'PieChart',  iconBg: 'bg-blue-100',   iconColor: 'text-blue-600',   desc: 'Laporan Laba/Rugi bersih, bukan sekadar omzet.' },
      { id: 'payroll',       cat: 'Karyawan & Laporan',    name: 'Absensi Staf',                      price: 75000, iconName: 'UserCheck', iconBg: 'bg-emerald-100',iconColor: 'text-emerald-600',desc: 'Jam kerja, gaji, dan slip gaji digital.' },
      { id: 'extra-branch',  cat: 'Cabang Ekstra',         name: 'Tambah Cabang Baru',                 price: 75, priceType: 'percentage', dynamic: true, iconName: 'Building2', iconBg: 'bg-purple-100', iconColor: 'text-purple-600', desc: 'Cabang baru otomatis mewarisi semua fitur aktif.' },
      { id: 'pager-fisik',   cat: 'Sekali Bayar',          name: 'Integrasi Scanner Barcode Bluetooth', price: 350000, oneTime: true, iconName: 'Zap', iconBg: 'bg-gray-100', iconColor: 'text-gray-600', desc: 'Scanner kasir wireless mempermudah input barang.' },
      { id: 'migrasi',       cat: 'Sekali Bayar',          name: 'Jasa Pindah Data & Setup',          price: 500000, oneTime: true, iconName: 'HardDrive', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600', desc: 'Tim kami bantu masukkan semua stok & barcode.' },
    ],
    discount6m: 10, discount12m: 20,
    promoCodes: [] as { id: string; code: string; discount: number; isActive: boolean }[]
  },
  'pos-beauty': {
    title: 'Lokal Beauty',
    basePrices: [
      { id: 'semarang', area: 'Semarang (LOKAL Area)', price: 50000 },
      { id: 'belitung', area: 'Belitung (LOKAL Area)', price: 50000 },
      { id: 'nasional', area: 'Area Lain (Indonesia)', price: 65000 },
    ],
    addons: [
      { id: 'payroll',       cat: 'Karyawan & Laporan',    name: 'Absensi & Payroll Komisi',          price: 75000, iconName: 'Scissors',  iconBg: 'bg-emerald-100',iconColor: 'text-emerald-600',desc: 'Hitung gaji, lembur, dan bagi hasil layanan per staf otomatis.' },
      { id: 'keuangan',      cat: 'Karyawan & Laporan',    name: 'Dashboard Laba/Rugi Bersih',        price: 75000, iconName: 'PieChart',  iconBg: 'bg-blue-100',   iconColor: 'text-blue-600',   desc: 'Laporan Laba/Rugi bersih, bukan sekadar omzet.' },
      { id: 'crm',           cat: 'Pelanggan Setia',       name: 'CRM Pelanggan & Loyalty',           price: 45000, iconName: 'Heart',     iconBg: 'bg-pink-100',   iconColor: 'text-pink-600',   desc: 'Rekam riwayat perawatan/potongan, beri poin member.' },
      { id: 'stok-premium',  cat: 'Operasional',           name: 'Stok Premium (Ritel Salon)',        price: 35000, iconName: 'Package',   iconBg: 'bg-red-100',    iconColor: 'text-red-600',    desc: 'Bila menjual produk fisik (Pomade, Serum, Hair Tonic).' },
      { id: 'extra-branch',  cat: 'Cabang Ekstra',         name: 'Tambah Cabang Baru',                 price: 75, priceType: 'percentage', dynamic: true, iconName: 'Building2', iconBg: 'bg-purple-100', iconColor: 'text-purple-600', desc: 'Cabang baru otomatis mewarisi semua fitur aktif.' },
      { id: 'migrasi',       cat: 'Sekali Bayar',          name: 'Jasa Pindah Data & Setup',          price: 500000, oneTime: true, iconName: 'HardDrive', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600', desc: 'Tim kami bantu masukkan semua layanan & staf.' },
    ],
    discount6m: 10, discount12m: 20,
    promoCodes: [] as { id: string; code: string; discount: number; isActive: boolean }[]
  },
  'jasa-landing-page': {
    title: 'LOKAL Web Studio',
    basePrices: [
      { id: 'landing-page', name: 'Landing Page 1 Halaman', prices: { '0.5': 1850000, '1': 2500000, '2': 4200000, '3': 5500000 }, desc: 'Website satu halaman yang fokus pada konversi.' },
      { id: 'company-profile', name: 'Company Profile (Max 3 Hal)', prices: { '0.5': 2500000, '1': 3500000, '2': 5800000, '3': 7700000 }, desc: 'Menampilkan profil bisnis, visi, misi, dan layanan.' },
      { id: 'katalog', name: 'Katalog Digital (Max 5 Hal)', prices: { '0.5': 3000000, '1': 4000000, '2': 6700000, '3': 8800000 }, desc: 'Katalog interaktif, ideal untuk toko fisik.' },
    ],
    addons: [
      { id: 'gmaps', name: 'Integrasi Google My Business (Maps)', price: 250000, type: 'flat' },
      { id: 'seo', name: 'Setup SEO Foundation & Meta Pixel', price: 300000, type: 'flat' },
      { id: 'dashboard', name: 'Web Performance Dashboard', price: 750000, type: 'yearly' },
      { id: 'extra-pages', name: 'Tambahan Halaman (Per Halaman)', price: 250000, type: 'flat' },
    ],
    promoCodes: [] as { id: string; code: string; discount: number; isActive: boolean }[]
  }
}
