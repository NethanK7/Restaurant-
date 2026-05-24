'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {children}
        <motion.div
          className="fixed inset-0 bg-obsidian z-[10000] origin-bottom"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 } }}
          exit={{ scaleY: 1, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
