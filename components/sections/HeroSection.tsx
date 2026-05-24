'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Ember particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Disable particles on touch devices and respect reduced motion
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(pointer: coarse)').matches
    if (isReducedMotion) return

    let animFrame: number
    let particles: Array<{
      x: number; y: number; size: number; speedX: number; speedY: number;
      opacity: number; color: string; life: number; maxLife: number;
    }> = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const colors = ['#C9A84C', '#E8652A', '#E8C96D', '#F5ECD7']

    const spawnParticle = () => {
      const maxLife = 180 + Math.random() * 120
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        size: 1 + Math.random() * 2.5,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: -(0.6 + Math.random() * 1.2),
        opacity: 0.4 + Math.random() * 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife,
      })
    }

    let frame = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++

      if (frame % (isMobile ? 6 : 3) === 0) {
        spawnParticle()
        if (!isMobile) spawnParticle()
      }

      particles = particles.filter((p) => p.life < p.maxLife)

      for (const p of particles) {
        p.life++
        p.x += p.speedX + Math.sin(p.life * 0.03) * 0.3
        p.y += p.speedY
        const progress = p.life / p.maxLife
        const alpha = p.opacity * (1 - progress)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * (1 - progress * 0.5), 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = alpha
        ctx.fill()
        ctx.globalAlpha = 1

        // Glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
        grad.addColorStop(0, p.color + '40')
        grad.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.globalAlpha = alpha * 0.5
        ctx.fill()
        ctx.globalAlpha = 1
      }

      animFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // GSAP entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    // Letter-by-letter title
    const title = titleRef.current
    if (title) {
      const text = title.textContent || ''
      title.innerHTML = text
        .split('')
        .map((char) =>
          char === ' '
            ? '<span class="inline-block">&nbsp;</span>'
            : `<span class="inline-block" style="opacity:0;transform:translateY(60px)">${char}</span>`
        )
        .join('')

      tl.to(title.querySelectorAll('span'), {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.04,
        ease: 'power3.out',
      })
    }

    // Gold line draw
    if (lineRef.current) {
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.4, ease: 'power3.inOut', transformOrigin: 'left' },
        '-=0.6'
      )
    }

    // Tagline
    if (taglineRef.current) {
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.8'
      )
    }

    // Scroll indicator
    if (scrollRef.current) {
      tl.fromTo(
        scrollRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )
    }
  }, [])

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-obsidian flex items-center justify-center">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
        alt="Fine dining restaurant ambiance"
        fill
        priority
        className="object-cover opacity-30"
        sizes="100vw"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/30 to-obsidian/90 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/50 via-transparent to-obsidian/50 z-[1]" />

      {/* Ember particles */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[2] pointer-events-none" />

      {/* Hero content */}
      <div className="relative z-[3] text-center px-6 max-w-5xl mx-auto w-full">
        <div className="mb-6">
          <span className="font-body text-xs tracking-[0.5em] text-gold/70 uppercase">Est. 2024 · Dubai</span>
        </div>

        <h1
          ref={titleRef}
          className="font-display font-light tracking-[0.35em] text-ivory mb-8"
          style={{ fontSize: 'clamp(2.8rem, 12vw, 8rem)', lineHeight: '1.05' }}
        >
          ZAFRAN
        </h1>

        <div
          ref={lineRef}
          className="w-32 h-[1px] bg-gradient-to-r from-gold via-ember to-gold mx-auto mb-8"
          style={{ transformOrigin: 'left' }}
        />

        <p
          ref={taglineRef}
          className="font-display italic text-ivory-dim"
          style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', opacity: 0 }}
        >
          Where Two Civilizations Dine
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-3 pb-safe"
        style={{ opacity: 0 }}
      >
        <span className="font-body text-[10px] tracking-[0.4em] text-ivory-dim/50 uppercase">Scroll</span>
        <div className="relative w-[1px] h-16 bg-ivory/10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-gold to-transparent animate-[scrollDrop_2s_ease-in-out_infinite]"
            style={{
              height: '50%',
              animation: 'scrollDrop 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollDrop {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </section>
  )
}
