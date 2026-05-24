'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const panels = [
  {
    title: 'The Spice Routes of India',
    body: 'From the saffron meadows of Kashmir to the pepper coasts of Kerala — a civilization built on flavour. Ten thousand years of culinary alchemy, each spice a word in a language older than writing.',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1920&q=80',
    accent: 'India',
    imageAlt: 'Vibrant saffron and spices from India',
  },
  {
    title: 'The Desert Tables of Arabia',
    body: 'Smoke, resin, and rose — Arabia feeds the soul before it feeds the body. Where every meal is ceremony and every flame tells a story of ancient hospitality without end.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=1920&q=80',
    accent: 'Arabia',
    imageAlt: 'Traditional Arabic food spread',
  },
  {
    title: 'The Confluence',
    body: 'ZAFRAN is where these two ancient worlds finally sit at the same table. Neither erased, both honoured — a new language forged in fire, gold, and smoke.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80',
    accent: 'ZAFRAN',
    imageAlt: 'ZAFRAN restaurant interior — luxurious dining room',
  },
]

export default function HorizontalStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const panelsEl = panelsRef.current
    if (!container || !panelsEl) return

    const ctx = gsap.context(() => {
      const totalWidth = panelsEl.scrollWidth - window.innerWidth

      gsap.to(panelsEl, {
        x: () => -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${totalWidth + window.innerWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Animate text in each panel
      panelsEl.querySelectorAll('.panel-content').forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll('.panel-text-elem'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'left 70%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ height: '100vh' }}
    >
      <div
        ref={panelsRef}
        className="panels-wrapper h-full"
        style={{ width: `${panels.length * 100}vw` }}
      >
        {panels.map((panel, i) => (
          <div
            key={panel.accent}
            className="story-panel"
            data-cursor="view"
          >
            {/* Background image */}
            <Image
              src={panel.image}
              alt={panel.imageAlt}
              fill
              className="object-cover"
              sizes="100vw"
            />
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/60 to-obsidian/30" />
            <div className="absolute inset-0 bg-obsidian/30" />

            {/* Content */}
            <div className="panel-content absolute inset-0 flex items-end pb-24 px-16 md:px-24">
              <div className="max-w-xl">
                <p className="panel-text-elem font-body text-[10px] tracking-[0.5em] text-gold/60 uppercase mb-4">
                  {String(i + 1).padStart(2, '0')} / 03
                </p>
                <span className="panel-text-elem block font-display italic text-8xl text-gold/10 font-light leading-none mb-4 -ml-1">
                  {panel.accent}
                </span>
                <h2
                  className="panel-text-elem font-display font-light text-ivory mb-6 leading-tight"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
                >
                  {panel.title}
                </h2>
                <p className="panel-text-elem font-body text-ivory-dim/70 text-sm leading-loose max-w-sm">
                  {panel.body}
                </p>
              </div>
            </div>

            {/* Panel number indicator */}
            <div className="absolute bottom-12 right-16 flex gap-2">
              {panels.map((_, j) => (
                <div
                  key={j}
                  className={`h-[1px] transition-all duration-500 ${j === i ? 'w-8 bg-gold' : 'w-4 bg-ivory/20'}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
