'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import bg from '@/locales/bg.json'
import en from '@/locales/en.json'

export type Lang = 'bg' | 'en'
export type Translation = typeof bg

const translations: Record<Lang, Translation> = { bg, en }

type LanguageContextType = {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translation
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'bg',
  setLang: () => {},
  t: bg,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('bg')

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang | null
    if (stored === 'bg' || stored === 'en') setLangState(stored)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('lang', l)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
