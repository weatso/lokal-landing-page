import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface ProductCardProps {
  logo: string
  preTitle?: string
  title: React.ReactNode
  description: string
  ctaLabel: string
  href: string
  cover?: boolean
  isCollab?: boolean
}

export default function ProductCard({
  logo,
  preTitle,
  title,
  description,
  ctaLabel,
  href,
  cover = false,
  isCollab = false,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 border border-[#1A7A7A]/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row items-center gap-6 group">
      {/* Logo Container */}
      <div className="w-full md:w-48 h-28 md:h-32 shrink-0 bg-[#FAFAFA] rounded-xl flex items-center justify-center p-4 border border-[#1A7A7A]/5 group-hover:border-[#1A7A7A]/20 transition-colors overflow-hidden">
        <Image
          src={logo}
          alt={typeof title === 'string' ? title : "Product"}
          width={160}
          height={96}
          className={`w-full h-full mix-blend-multiply ${cover ? 'object-contain scale-125' : 'object-contain'}`}
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1 text-center md:text-left">
        <div>
          {preTitle && <span className="text-xs font-bold text-[#E8681A] uppercase tracking-wider block mb-1">{preTitle}</span>}
          <h3 className="font-bold text-xl text-[#1A7A7A] leading-snug">{title}</h3>
        </div>
        <p className="text-[#333333]/70 text-sm md:text-base leading-relaxed">{description}</p>
      </div>

      {/* CTA */}
      <Link
        href={href}
        className="btn-primary shrink-0 text-sm py-3 px-6 w-full md:w-auto justify-center mt-2 md:mt-0"
      >
        {ctaLabel}
        <ArrowRight size={16} />
      </Link>
    </div>
  )
}
