'use client'
import { motion } from 'framer-motion'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}

export function FadeIn({ children, delay = 0, direction = 'up' }: FadeInProps) {
  const hidden = {
    opacity: 0,
    y: direction === 'up' ? 40 : 0,
    x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
  }
  return (
    <motion.div
      initial={hidden}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

// 用法 Usage:
// <FadeIn delay={0}><h2>Eat Like a Local</h2></FadeIn>
// <FadeIn delay={0.15} direction="left"><Card /></FadeIn>