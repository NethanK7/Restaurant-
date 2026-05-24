'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import SectionReveal from '@/components/ui/SectionReveal'
import GoldButton from '@/components/ui/GoldButton'

gsap.registerPlugin(ScrollTrigger)

const sections = [
  {
    title: 'The Space',
    subtitle: 'Architecture of Desire',
    body: 'Designed by Studio Zara Khalil, the ZAFRAN dining room is a meditation on shadow and light. Black granite floors. Hammered brass ceilings. Booths lined in deep burgundy velvet. Every surface a canvas; every corner a secret. The room does not command attention — it earns it.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80',
    imageAlt: 'ZAFRAN restaurant interior',
    stat: { num: '36', label: 'Seats Only' },
  },
  {
    title: 'The Kitchen',
    subtitle: 'Theatre of Fire',
    body: 'Our open kitchen is the beating heart of ZAFRAN. Watch Chef Arjun and his team coax ancient techniques from fire, smoke, and stone. The tandoor burns at 480°C. The spice blends are ground each morning. Nothing arrives from a factory. Nothing is rushed.',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1920&q=80',
    imageAlt: 'Spices and kitchen ingredients',
    stat: { num: '12', label: 'Chefs On Station' },
  },
  {
    title: 'The Service',
    subtitle: 'A Study in Presence',
    body: 'Our service team trains for three months before their first shift. Each member fluent in the story behind every dish, the provenance of every ingredient. You will not feel attended to — you will feel anticipated. This is not service. It is a form of hospitality that has no word in English.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=1920&q=80',
    imageAlt: 'Elegant fine dining service',
    stat: { num: '1:3', label: 'Staff to Guest Ratio' },
  },
]

function ParallaxSection({
  section,
  index,
}: {
  section: typeof sections[0]
  index: number
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    const img = imageRef.current
    if (!el || !img) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { y: '-10%' },
        {
          y: '10%',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  const isEven = index % 2 === 0

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden py-24">
      {/* Parallax image */}
      <div
        className={`absolute inset-0 ${isEven ? 'left-0 right-1/3' : 'left-1/3 right-0'} overflow-hidden`}
        data-cursor="view"
      >
        <div ref={imageRef} className="absolute inset-[-20%]">
          <Image
            src={section.image}
            alt={section.imageAlt}
            fill
            className="object-cover opacity-60"
            sizes="(max-width: 768px) 100vw, 70vw"
          />
        </div>
        <div className={`absolute inset-0 ${
          isEven
            ? 'bg-gradient-to-r from-obsidian/20 via-obsidian/40 to-obsidian'
            : 'bg-gradient-to-l from-obsidian/20 via-obsidian/40 to-obsidian'
        }`} />
      </div>

      {/* Fill rest with obsidian */}
      <div className={`absolute ${isEven ? 'left-2/3 right-0' : 'left-0 right-2/3'} inset-y-0 bg-obsidian`} />

      {/* Content */}
      <div className="relative max-w-[1400px] mx-auto px-8 w-full">
        <div className={`flex ${isEven ? 'justify-end' : 'justify-start'}`}>
          <div className="max-w-lg">
            <SectionReveal>
              <span className="font-body text-[10px] tracking-[0.5em] text-gold/50 uppercase block mb-4">
                {String(index + 1).padStart(2, '0')} / 03
              </span>
              <h2
                className="font-display font-light text-ivory mb-3 leading-tight"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
              >
                {section.title}
              </h2>
              <h3 className="font-display italic text-gold/60 text-xl mb-8">{section.subtitle}</h3>
              <div className="w-12 h-[1px] bg-gold/30 mb-8" />
              <p className="font-body text-sm text-ivory-dim/60 leading-loose mb-10">{section.body}</p>
              <div className="flex items-center gap-6">
                <div>
                  <div className="font-display text-4xl text-gold font-light">{section.stat.num}</div>
                  <div className="font-body text-[10px] tracking-[0.2em] uppercase text-ivory-dim/40 mt-1">
                    {section.stat.label}
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ExperiencePageClient() {
  return (
    <main className="bg-obsidian">
      {/* Hero */}
      <section className="min-h-[70vh] flex items-center justify-center relative overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(201,168,76,0.05),transparent)]" />
        <div className="relative text-center px-8 max-w-4xl mx-auto">
          <SectionReveal>
            <span className="font-body text-[10px] tracking-[0.5em] text-gold/50 uppercase block mb-6">The ZAFRAN World</span>
            <h1
              className="font-display font-light text-ivory mb-8 leading-tight"
              style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
            >
              The Experience
            </h1>
            <div className="w-16 h-[1px] bg-gold/40 mx-auto mb-8" />
            <p className="font-body text-ivory-dim/50 text-sm leading-loose max-w-md mx-auto">
              Three worlds converge in a single evening. The space, the fire, the service — each a chapter in a story that has no ending.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Three parallax sections */}
      {sections.map((section, i) => (
        <ParallaxSection key={section.title} section={section} index={i} />
      ))}

      {/* Chef quote */}
      <section className="py-40 px-8 bg-deep-noir relative overflow-hidden">
        {/* Geometric SVG motif */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none select-none">
          <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="300,10 590,590 10,590" stroke="#C9A84C" strokeWidth="1" fill="none"/>
            <polygon points="300,60 540,560 60,560" stroke="#C9A84C" strokeWidth="0.5" fill="none"/>
            <circle cx="300" cy="300" r="250" stroke="#C9A84C" strokeWidth="0.5" fill="none"/>
            <circle cx="300" cy="300" r="200" stroke="#C9A84C" strokeWidth="0.3" fill="none"/>
            <line x1="50" y1="300" x2="550" y2="300" stroke="#C9A84C" strokeWidth="0.5"/>
            <line x1="300" y1="50" x2="300" y2="550" stroke="#C9A84C" strokeWidth="0.5"/>
            <line x1="120" y1="120" x2="480" y2="480" stroke="#C9A84C" strokeWidth="0.3"/>
            <line x1="480" y1="120" x2="120" y2="480" stroke="#C9A84C" strokeWidth="0.3"/>
            {/* Octagon */}
            <polygon
              points="300,80 460,140 520,300 460,460 300,520 140,460 80,300 140,140"
              stroke="#C9A84C" strokeWidth="0.5" fill="none"
            />
          </svg>
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <SectionReveal>
            <div className="w-8 h-[1px] bg-gold/30 mx-auto mb-10" />
            <blockquote
              className="font-display italic font-light text-ivory leading-relaxed mb-10"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
            >
              &ldquo;Fire does not distinguish between cultures.<br />Neither do we.&rdquo;
            </blockquote>
            <cite className="font-body text-xs tracking-[0.4em] text-gold/50 uppercase not-italic block mb-12">
              Chef Arjun Al-Rashid — Executive Chef
            </cite>
            <div className="w-8 h-[1px] bg-gold/30 mx-auto mb-12" />
            <GoldButton href="/reservations">Reserve Your Evening</GoldButton>
          </SectionReveal>
        </div>
      </section>
    </main>
  )
}
