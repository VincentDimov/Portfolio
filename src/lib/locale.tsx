import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react'
import { translations } from '../data/copy'

export type Language = 'en' | 'sv'
type LanguageContextValue = {
  language: Language
  locale: 'en-GB' | 'sv-SE'
  toggleLanguage: () => void
  copy: typeof translations.en
}
const LanguageContext = createContext<LanguageContextValue | null>(null)

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState<Language>(() => {
    try { return localStorage.getItem('ventsislav-language') === 'sv' ? 'sv' : 'en' } catch { return 'en' }
  })
  useEffect(() => {
    document.documentElement.lang = language
    try { localStorage.setItem('ventsislav-language', language) } catch { /* The language still works without browser storage. */ }
  }, [language])
  const value = useMemo<LanguageContextValue>(() => ({
    language,
    locale: language === 'sv' ? 'sv-SE' : 'en-GB',
    toggleLanguage: () => setLanguage(current => current === 'en' ? 'sv' : 'en'),
    copy: translations[language],
  }), [language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage must be used inside LanguageProvider')
  return value
}
