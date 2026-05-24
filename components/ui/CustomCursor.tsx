'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [isTouchDevice, setIsTouchDevice] = useState(true)
  const mousePos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    // Don't run cursor on touch/mobile devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0
    if (isTouch) return
    setIsTouchDevice(false)

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }

    const animate = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    document.addEventListener('mousemove', onMouseMove)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'IMG' || target.closest('[data-cursor="view"]')) {
        setIsHovering(true)
        setCursorText('VIEW')
      } else if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true)
        setCursorText('')
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
      setCursorText('')
    }

    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (isTouchDevice) return null

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gold pointer-events-none z-[99999] transition-opacity duration-200"
        style={{ opacity: isHovering ? 0 : 1, willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] flex items-center justify-center"
        style={{
          width: isHovering ? '64px' : '32px',
          height: isHovering ? '64px' : '32px',
          marginLeft: isHovering ? '-32px' : '-16px',
          marginTop: isHovering ? '-32px' : '-16px',
          border: isHovering ? '1.5px solid #C9A84C' : '1px solid rgba(201, 168, 76, 0.5)',
          borderRadius: '50%',
          transition: 'width 0.3s ease, height 0.3s ease, margin 0.3s ease, border 0.3s ease',
          willChange: 'transform',
        }}
      >
        {cursorText && (
          <span className="text-gold text-xs font-body tracking-widest font-medium">{cursorText}</span>
        )}
      </div>
    </>
  )
}
