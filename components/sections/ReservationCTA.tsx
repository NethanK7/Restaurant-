'use client'

import SectionReveal from '@/components/ui/SectionReveal'
import GoldButton from '@/components/ui/GoldButton'

export default function ReservationCTA() {
  return (
    <section className="relative py-20 md:py-40 px-6 md:px-8 overflow-hidden bg-burgundy">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-grain" />
      <div className="absolute inset-0 bg-gradient-to-b from-burgundy via-burgundy to-obsidian" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent to-gold/30" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-t from-transparent to-gold/30" />

      <div className="relative max-w-3xl mx-auto text-center">
        <SectionReveal>
          <span className="font-body text-[10px] tracking-[0.5em] text-gold/60 uppercase block mb-8">
            Experience Awaits
          </span>
          <h2
            className="font-display italic font-light text-ivory mb-8 leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Reserve Your<br />Evening at ZAFRAN
          </h2>
          <p className="font-body text-ivory-dim/60 text-sm leading-loose mb-12 max-w-md mx-auto">
            Tables are limited. Each service is an event.<br />We recommend booking at least two weeks in advance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GoldButton href="/reservations">Reserve a Table</GoldButton>
            <a
              href="tel:+97140000000"
              className="font-body text-xs tracking-[0.2em] uppercase text-ivory-dim/60 hover:text-gold transition-colors duration-300 py-3 px-2 block"
            >
              +971 4 000 0000
            </a>
          </div>

          <div className="mt-12 md:mt-16 flex items-center justify-center gap-6 md:gap-16 flex-wrap">
            {[
              { num: '36', label: 'Seats' },
              { num: '2', label: 'Seatings Per Night' },
              { num: '5', label: 'Course Minimum' },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-3xl text-gold font-light mb-1">{num}</div>
                <div className="font-body text-[10px] tracking-[0.2em] uppercase text-ivory-dim/40">{label}</div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
