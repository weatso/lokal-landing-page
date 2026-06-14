import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function ProductCard({ logo, title, description, ctaLabel, href, delay = 0, cover = false }) {
  return (
    <div
      className="bg-white rounded-2xl p-5 md:p-6 border border-[#1A7A7A]/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row items-center gap-6 group"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Logo Container */}
      <div className="w-full md:w-48 h-28 md:h-32 shrink-0 bg-[#FAFAFA] rounded-xl flex items-center justify-center p-4 border border-[#1A7A7A]/5 group-hover:border-[#1A7A7A]/20 transition-colors overflow-hidden">
        <img
          src={logo}
          alt={title}
          className={`w-full h-full mix-blend-multiply ${cover ? 'object-contain scale-125' : 'object-contain'}`}
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1 text-center md:text-left">
        <h3 className="font-bold text-xl text-[#1A7A7A] leading-snug">{title}</h3>
        <p className="text-[#333333]/70 text-sm md:text-base leading-relaxed">{description}</p>
      </div>

      {/* CTA */}
      <Link
        to={href}
        className="btn-primary shrink-0 text-sm py-3 px-6 w-full md:w-auto justify-center mt-2 md:mt-0"
      >
        {ctaLabel}
        <ArrowRight size={16} />
      </Link>
    </div>
  )
}
