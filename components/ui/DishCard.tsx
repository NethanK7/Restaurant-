'use client'

import { useState, useRef } from 'react'

interface DishCardProps {
  name: string
  description: string
  price: string
  tags: string[]
  isChef?: boolean
}

export default function DishCard({ name, description, price, tags, isChef = false }: DishCardProps) {
  const [hovered, setHovered] = useState(false)
  const touchTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const handleMouseEnter = () => setHovered(true)
  const handleMouseLeave = () => setHovered(false)
  const handleTouchStart = () => {
    setHovered(true)
    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current)
    touchTimeoutRef.current = setTimeout(() => setHovered(false), 600)
  }

  return (
    <div
      className={`relative p-6 md:p-8 bg-deep-noir border transition-all duration-500 group overflow-hidden ${
        hovered ? 'border-gold/60 md:-translate-y-2 shadow-[0_20px_60px_rgba(201,168,76,0.1)]' : 'border-ivory/5'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      {isChef && <div className="absolute inset-0 chef-selection-shimmer pointer-events-none" />}

      <div
        className="absolute inset-0 pointer-events-none transition-all duration-500"
        style={{
          background: hovered ? 'linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 60%)' : 'transparent',
        }}
      />

      <div
        className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-gold to-ember transition-all duration-700"
        style={{ width: hovered ? '100%' : '0%' }}
      />

      <div className="relative">
        {isChef && (
          <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-[1px] bg-gold" />
            <span className="font-body text-[9px] md:text-[10px] tracking-[0.3em] text-gold uppercase">Chef&apos;s Selection</span>
          </div>
        )}

        <h3 className="font-display text-lg md:text-xl font-medium text-ivory mb-2 group-hover:text-gold-light transition-colors duration-300">
          {name}
        </h3>

        <p className="font-body text-xs text-ivory-dim/60 leading-loose mb-4">{description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {tags.filter(t => t !== "Chef's Selection").map((tag) => (
            <span
              key={tag}
              className="font-body text-[9px] tracking-[0.1em] uppercase px-2.5 py-1 border border-ivory/10 text-ivory-dim/50"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="font-display text-gold text-lg">{price}</span>
          <div className="flex items-center gap-2 text-ivory-dim/40 group-hover:text-gold transition-colors duration-300">
            <span className="font-body text-[10px] tracking-[0.2em] uppercase">Order</span>
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
              <path d="M0 4H14M14 4L11 1M14 4L11 7" stroke="currentColor" strokeWidth="0.8"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
