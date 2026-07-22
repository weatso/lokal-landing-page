export const DEFAULT_PRICING = {
  'pos-fnb': {
    title: 'LOKAL POS F&B',
    basePrices: [
      { id: 'core', area: 'CORE ENGINE (1 Cabang)', price: 50000 },
    ],
    addons: [],
    discount6m: 10, discount12m: 20,
    promoCodes: [] as { id: string; code: string; discount: number; isActive: boolean }[]
  },
  'iwash': {
    title: 'LOKAL x Iwash',
    basePrices: [
      { id: '1', area: 'Starter', price: 150000 },
      { id: '2', area: 'Pro', price: 250000 },
      { id: '3', area: 'Enterprise', price: 500000 }
    ],
    addons: [] as any[], discount6m: 0, discount12m: 0,
    promoCodes: [{ id: 'p1', code: 'IWASHLOKAL', discount: 20, isActive: true }]
  },
  'valet-indonesia': {
    title: 'LOKAL x ValetIndonesia',
    basePrices: [
      { id: '1', area: 'Harga Standar', price: 999000 },
      { id: '2', area: 'Harga Promo', price: 299000 }
    ],
    addons: [] as any[], discount6m: 0, discount12m: 0,
    promoCodes: [{ id: 'p1', code: 'VALET2024', discount: 25, isActive: true }]
  },
  'brosurhub': {
    title: 'LOKAL x BrosurHub',
    basePrices: [
      { id: '1', area: 'Basic (Per Tahun)', price: 59000 },
      { id: '2', area: 'Standard (Per Tahun)', price: 119000 },
      { id: '3', area: 'Premium (Per Tahun)', price: 169000 }
    ],
    addons: [] as any[], discount6m: 0, discount12m: 0,
    promoCodes: [{ id: 'p1', code: 'BROSURDIGITAL', discount: 20, isActive: true }]
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
  },
  'wa-blast': {
    title: 'WA Blasting',
    basePrices: [
      { id: '1', name: 'Blast Starter', price: 318000, kontak: 500, original: 435000, perNomor: '636', badge: 'PALING HEMAT' },
      { id: '2', name: 'Blast Growth', price: 1390000, kontak: 2500, original: 1900000, perNomor: '556', badge: '' },
      { id: '3', name: 'Blast Scale', price: 4760000, kontak: 10000, original: 6520000, perNomor: '476', badge: '' },
    ],
    addons: [] as any[],
    promoCodes: [] as { id: string; code: string; discount: number; isActive: boolean }[]
  }
}
