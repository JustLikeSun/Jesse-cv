import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import { useSearchParams } from 'react-router-dom'

import i18n from '@/i18n'
import { type ResumeVariant, resolveResumeVariant } from '@/lib/variants'

type Lang = 'fr' | 'en'

type AppParamsValue = {
  lang: Lang
  variant: ResumeVariant
  setLang: (l: Lang) => void
  searchString: string
}

const AppParamsContext = createContext<AppParamsValue | null>(null)

export function AppParamsProvider({ children }: { children: React.ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const lang: Lang = searchParams.get('lang') === 'en' ? 'en' : 'fr'
  const variant = resolveResumeVariant(searchParams)

  useEffect(() => {
    void i18n.changeLanguage(lang)
  }, [lang])

  const setLang = useCallback(
    (l: Lang) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          next.set('lang', l)
          return next
        },
        { replace: true }
      )
    },
    [setSearchParams]
  )

  const searchString = useMemo(() => {
    const q = searchParams.toString()
    return q ? `?${q}` : ''
  }, [searchParams])

  const value = useMemo(
    () => ({
      lang,
      variant,
      setLang,
      searchString,
    }),
    [lang, variant, setLang, searchString]
  )

  return (
    <AppParamsContext.Provider value={value}>
      {children}
    </AppParamsContext.Provider>
  )
}

export function useAppParams() {
  const ctx = useContext(AppParamsContext)
  if (!ctx) {
    throw new Error('useAppParams must be used within AppParamsProvider')
  }
  return ctx
}
