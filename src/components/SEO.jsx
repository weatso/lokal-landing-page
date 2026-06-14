import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://pakailokal.com'
const DEFAULT_IMAGE = `${SITE_URL}/lokal.png`

export default function SEO({
  title = 'LOKAL — Ekosistem Digital untuk UMKM',
  description = 'Ekosistem terintegrasi untuk mengotomatiskan operasional UMKM Anda. Zero-friction — saking sederhananya, staf baru bisa menguasai dalam 3 menit.',
  canonical = '',
  image = DEFAULT_IMAGE,
  type = 'website',
}) {
  const fullUrl = `${SITE_URL}${canonical}`
  const fullTitle = title.includes('LOKAL') ? title : `${title} | LOKAL`

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type"        content={type} />
      <meta property="og:url"         content={fullUrl} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={image} />
      <meta property="og:locale"      content="id_ID" />
      <meta property="og:site_name"   content="LOKAL" />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />

      {/* Robots */}
      <meta name="robots" content="index, follow" />
    </Helmet>
  )
}
