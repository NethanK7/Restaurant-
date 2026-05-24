'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const ingredients = [
  { name: 'Saffron', description: 'Harvested in the valleys of Kashmir', x: '-120%', y: '-60%', delay: 0.1 },
  { name: 'Cardamom', description: 'Green pods, cold-cracked at dawn', x: '120%', y: '-40%', delay: 0.2 },
  { name: 'Rose Water', description: 'Distilled from Damascene petals', x: '-100%', y: '60%', delay: 0.3 },
  { name: 'Oud Smoke', description: 'Ancient Arabian resin, wood-burned', x: '110%', y: '70%', delay: 0.4 },
]

export default function PlateRevealSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const plateRef = useRef<HTMLDivElement>(null)
  const ingredientRefs = useRef<(HTMLDivElement | null)[]>([])
  const dishNameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${window.innerWidth < 768 ? '250%' : '400%'}`,
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      })

      // Plate rotation
      tl.fromTo(
        plateRef.current,
        { rotation: -8, scale: 0.85, opacity: 0 },
        { rotation: 8, scale: 1, opacity: 1, ease: 'none' },
        0
      )

      // Ingredients fly in one by one
      ingredientRefs.current.forEach((el, i) => {
        if (!el) return
        tl.fromTo(
          el,
          { x: ingredients[i].x, y: ingredients[i].y, opacity: 0, scale: 0.5 },
          { x: '0%', y: '0%', opacity: 1, scale: 1, ease: 'back.out(1.5)' },
          0.2 + i * 0.18
        )
      })

      // Dish name reveal
      tl.fromTo(
        dishNameRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, ease: 'power3.out' },
        0.85
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-deep-noir flex items-center justify-center"
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(201,168,76,0.06),transparent)]" />

      {/* Decorative label */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-10">
        <span className="font-body text-[10px] tracking-[0.5em] text-gold/40 uppercase">The Craft</span>
        <div className="w-8 h-[1px] bg-gold/20 mx-auto mt-2" />
      </div>

      {/* Plate container */}
      <div
        ref={plateRef}
        className="relative z-10"
        style={{ opacity: 0, willChange: 'transform' }}
        data-cursor="view"
      >
        <div className="relative w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] md:w-[480px] md:h-[480px]">
          {/* Plate glow ring */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.15),transparent_70%)]" />

          <Image
            src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80"
            alt="Signature dish — Saffron Rogan Josh"
            fill
            className="object-cover rounded-full"
            sizes="(max-width: 768px) 320px, 480px"
          />

          {/* Plate border ring */}
          <div className="absolute inset-0 rounded-full border border-gold/20" />
          <div className="absolute inset-2 rounded-full border border-gold/10" />
        </div>

        {/* Ingredients fly in from off-screen */}
        {ingredients.map((ingredient, i) => (
          <div
            key={ingredient.name}
            ref={(el) => { ingredientRefs.current[i] = el }}
            className="absolute top-1/2 left-1/2 hidden sm:block"
            style={{
              willChange: 'transform',
              marginTop: i < 2 ? '-140px' : '60px',
              marginLeft: i % 2 === 0 ? '-180px' : '100px',
            }}
          >
            <div className="bg-obsidian/90 backdrop-blur-sm border border-gold/20 px-3 py-2 min-w-[130px]">
              <p className="font-display text-gold text-sm font-medium mb-0.5">{ingredient.name}</p>
              <p className="font-body text-ivory-dim/60 text-[11px]">{ingredient.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile ingredient list — shown only on small screens */}
      <div className="sm:hidden absolute bottom-20 left-0 right-0 flex flex-wrap justify-center gap-2 px-6">
        {ingredients.map((ingredient) => (
          <div key={ingredient.name} className="bg-obsidian/90 border border-gold/20 px-3 py-1.5">
            <span className="font-display text-gold text-xs">{ingredient.name}</span>
          </div>
        ))}
      </div>

      {/* Dish name */}
      <div
        ref={dishNameRef}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center z-10"
        style={{ opacity: 0 }}
      >
        <h2
          className="font-display font-light text-ivory tracking-[0.15em] mb-2"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          Saffron Rogan Josh
        </h2>
        <p className="font-body text-ivory-dim/50 text-xs tracking-[0.3em] uppercase">
          36-hour slow-braised Kashmiri lamb
        </p>
      </div>
    </section>
  )
}
