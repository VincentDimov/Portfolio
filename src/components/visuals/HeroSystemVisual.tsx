import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Activity, Check, Code2, Database, Sparkles } from 'lucide-react'

export const HeroSystemVisual = () => {
  const visualRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
  }, [])

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || !visualRef.current) return
    const bounds = visualRef.current.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width) * 100
    const y = ((event.clientY - bounds.top) / bounds.height) * 100
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      visualRef.current?.style.setProperty('--pointer-x', `${x}%`)
      visualRef.current?.style.setProperty('--pointer-y', `${y}%`)
    })
  }

  return (
    <motion.div
      className="hero-system"
      ref={visualRef}
      onPointerMove={onPointerMove}
      aria-hidden="true"
      initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.98, y: reduceMotion ? 0 : 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.8, delay: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="hero-system__glow" />
      <div className="system-topbar">
        <div className="system-topbar__dots"><i /><i /><i /></div>
        <span>product.system / overview</span>
        <Activity size={13} />
      </div>
      <div className="system-canvas">
        <div className="system-canvas__line line-one" />
        <div className="system-canvas__line line-two" />
        <div className="system-node system-node--source">
          <Code2 size={16} />
          <span>Interface</span>
          <small>React / TS</small>
        </div>
        <div className="system-node system-node--core">
          <Sparkles size={16} />
          <span>Product logic</span>
          <small>Calm by design</small>
        </div>
        <div className="system-node system-node--data">
          <Database size={16} />
          <span>Data layer</span>
          <small>Fast &amp; reliable</small>
        </div>
        <div className="system-pulse" />
        <div className="system-status">
          <span><i><Check size={10} /></i> Systems nominal</span>
          <strong>99.99%</strong>
        </div>
        <div className="system-latency">
          <span>response time</span>
          <strong>42<span>ms</span></strong>
          <div><i /><i /><i /><i /><i /><i /></div>
        </div>
      </div>
      <div className="system-bottom">
        <span>SHIPPING WITH INTENT</span>
        <span>01 — 03</span>
      </div>
    </motion.div>
  )
}
