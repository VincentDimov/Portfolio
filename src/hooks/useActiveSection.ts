import { useEffect, useState } from 'react'

export const useActiveSection = (ids: string[]) => {
  const [activeSection, setActiveSection] = useState(ids[0] ?? '')

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section))
    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-20% 0px -62% 0px', threshold: [0.1, 0.35, 0.65] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ids])

  return activeSection
}
