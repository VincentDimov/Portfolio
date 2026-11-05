import { useCallback, useEffect, useMemo, useState } from 'react'
import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion'
import { Contact } from './components/sections/Contact'
import { About } from './components/sections/About'
import { Hero } from './components/sections/Hero'
import { Stack } from './components/sections/Stack'
import { Work } from './components/sections/Work'
import { MoreProjects } from './components/sections/MoreProjects'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { getProject } from './data/projects'
import { useActiveSection } from './hooks/useActiveSection'
import { useKonami } from './hooks/useKonami'
import { ProjectCaseStudy } from './pages/ProjectCaseStudy'
import { ButtonLink } from './components/ui/Button'
import { useLanguage } from './lib/locale'
import { localizeProject } from './lib/content'
import { profile } from './data/profile'

const sectionIds = ['top', 'work', 'about', 'stack', 'more-projects', 'contact']

const getStoredTheme = (): 'dark' | 'light' => {
  try {
    const stored = window.localStorage.getItem('ventsislav-theme')
    if (stored === 'light' || stored === 'dark') return stored
  } catch { /* A blocked preference store does not prevent using the site. */ }
  return 'light'
}

export default function App() {
  const { copy, language } = useLanguage()
  const [theme, setTheme] = useState<'dark' | 'light'>(getStoredTheme)
  const [easterEgg, setEasterEgg] = useState(false)
  const activeSection = useActiveSection(sectionIds)
  const projectSlug = window.location.pathname.match(/^\/projects\/([^/]+)\/?$/)?.[1]
  const project = useMemo(() => {
    const source = projectSlug ? getProject(projectSlug) : undefined
    return source ? localizeProject(source, language) : undefined
  }, [projectSlug, language])

  useEffect(() => {
    const title = project ? `${project.name} — ${profile.name}` : `${profile.name} — ${copy.role}`
    const description = project?.summary ?? copy.meta.description
    const url = project ? `${profile.website}projects/${project.slug}` : profile.website
    document.title = title
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url)
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', language === 'sv' ? 'sv_SE' : 'en_GB')
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) document.querySelector(selector)?.setAttribute('content', description)
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) document.querySelector(selector)?.setAttribute('content', title)
  }, [copy, language, project])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0b0b0e' : '#f6f5f2')
    try { window.localStorage.setItem('ventsislav-theme', theme) } catch { /* Theme still works for this visit. */ }
  }, [theme])

  useEffect(() => {
    if (!window.location.hash) return undefined
    const timer = window.setTimeout(() => {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
    }, 40)
    return () => window.clearTimeout(timer)
  }, [projectSlug])

  const toggleTheme = () => setTheme((current) => current === 'dark' ? 'light' : 'dark')
  const unlock = useCallback(() => {
    setEasterEgg(true)
    window.setTimeout(() => setEasterEgg(false), 3600)
  }, [])
  useKonami(unlock)

  useEffect(() => {
    // A small greeting for people who inspect the work closely.
    console.info('%cHello, curious developer. Build with care.', 'color:#a7b5ff;font-size:14px;font-weight:600;')
  }, [])

  const isProjectPage = Boolean(projectSlug)
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <a className="skip-link" href="#main">{copy.skip}</a>
        <div className="app-shell">
          <Navbar activeSection={project ? '' : activeSection} theme={theme} onToggleTheme={toggleTheme} isProjectPage={isProjectPage} />
          {project ? (
            <ProjectCaseStudy project={project} />
          ) : projectSlug || window.location.pathname !== '/' ? (
            <main id="main" className="not-found" tabIndex={-1}><div><span className="eyebrow">{copy.notFound.label}</span><h1>{copy.notFound.title}</h1><p>{copy.notFound.description}</p><ButtonLink href="/#work" icon>{copy.notFound.cta}</ButtonLink></div></main>
          ) : (
            <main id="main" tabIndex={-1}>
              <Hero />
              <Work />
              <About />
              <Stack />
              <MoreProjects />
              <Contact />
            </main>
          )}
          <Footer />
          {easterEgg && <div className="easter-egg" role="status"><span>✦</span> {copy.egg}</div>}
        </div>
      </MotionConfig>
    </LazyMotion>
  )
}
