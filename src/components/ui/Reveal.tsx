import type { PropsWithChildren } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/utils'

type RevealProps = PropsWithChildren<{ className?: string; delay?: number; y?: number }>

export const Reveal = ({ children, className, delay = 0, y = 18 }: RevealProps) => {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: reduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
