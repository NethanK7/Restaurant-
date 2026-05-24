'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

interface GoldButtonProps {
  href?: string
  onClick?: () => void
  children: ReactNode
  variant?: 'outline' | 'filled'
  className?: string
}

export default function GoldButton({ href, onClick, children, variant = 'outline', className = '' }: GoldButtonProps) {
  const base = `relative inline-flex items-center justify-center font-body text-xs tracking-[0.25em] uppercase overflow-hidden transition-colors duration-500 group ${className}`

  const styles = variant === 'outline'
    ? 'border border-gold text-gold px-8 py-4 hover:text-obsidian'
    : 'bg-gold text-obsidian px-8 py-4 hover:bg-gold-light'

  const content = (
    <>
      <span className="absolute inset-0 bg-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]" />
      <span className="relative">{children}</span>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={`${base} ${styles}`}>
        {content}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      {content}
    </button>
  )
}
