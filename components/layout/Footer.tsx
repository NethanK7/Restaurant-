import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-gold/10 py-20 px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl tracking-[0.5em] text-gold font-light mb-4">ZAFRAN</h2>
          <p className="font-body text-xs tracking-[0.3em] text-ivory-dim uppercase">Where Two Civilizations Dine</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="font-body text-xs tracking-[0.2em] uppercase text-gold mb-4">Location</h3>
            <p className="font-body text-sm text-ivory-dim leading-loose">
              The Crown Tower, Level 32<br />
              Sheikh Zayed Road<br />
              Dubai, UAE
            </p>
          </div>
          <div>
            <h3 className="font-body text-xs tracking-[0.2em] uppercase text-gold mb-4">Hours</h3>
            <p className="font-body text-sm text-ivory-dim leading-loose">
              Tuesday — Sunday<br />
              Dinner: 7:00 PM — 12:00 AM<br />
              Closed Monday
            </p>
          </div>
          <div>
            <h3 className="font-body text-xs tracking-[0.2em] uppercase text-gold mb-4">Contact</h3>
            <p className="font-body text-sm text-ivory-dim leading-loose">
              reservations@zafran.ae<br />
              +971 4 000 0000
            </p>
            <div className="flex gap-6 mt-4">
              {['Instagram', 'Facebook', 'Twitter'].map((s) => (
                <a key={s} href="#" className="nav-link font-body text-xs text-ivory-dim hover:text-gold transition-colors duration-300">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gold/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-ivory-dim/50">© 2024 ZAFRAN. All rights reserved.</p>
          <div className="flex gap-8">
            {[
              { href: '/menu', label: 'Menu' },
              { href: '/experience', label: 'Experience' },
              { href: '/reservations', label: 'Reservations' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-xs tracking-[0.15em] uppercase text-ivory-dim/50 hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
