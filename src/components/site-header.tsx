import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Globe2, Menu, Moon, Printer, Sun } from 'lucide-react'

import { useAppParams } from '@/contexts/app-params'
import { useTheme } from '@/contexts/theme'
import { buttonVariants } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const navIds = [
  { id: 'profile', key: 'nav.profile' },
  { id: 'skills', key: 'nav.skills' },
  { id: 'experience', key: 'nav.experience' },
  { id: 'education', key: 'nav.education' },
  { id: 'interests', key: 'nav.interests' },
  { id: 'contact', key: 'nav.contact' },
] as const

const headerBtn =
  'inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg border border-border/60 bg-background/60 px-3 text-[13px] font-medium text-muted-foreground backdrop-blur transition-colors duration-150 hover:bg-muted hover:text-foreground active:translate-y-px'

export function SiteHeader() {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const { lang, setLang, searchString } = useAppParams()
  const [scrolled, setScrolled] = useState(false)

  const printHref = `/print${searchString}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'no-print sticky top-0 z-40 transition-[border-color,box-shadow,background-color] duration-300',
        scrolled
          ? 'border-b border-border/40 bg-background/85 shadow-[0_1px_3px_0_hsl(0_0%_0%/_0.06),0_6px_24px_-4px_hsl(0_0%_0%/_0.08)] backdrop-blur-2xl dark:shadow-[0_1px_3px_0_hsl(0_0%_0%/_0.2),0_8px_32px_-4px_hsl(0_0%_0%/_0.3)]'
          : 'border-b border-transparent bg-transparent backdrop-blur-xl'
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[56rem] items-center gap-4 px-6 md:px-8">
        <a
          href="#top"
          className="shrink-0 font-display text-base font-semibold tracking-tight text-foreground transition-opacity hover:opacity-70"
        >
          JT
        </a>

        <nav
          aria-label="Sections"
          className="hidden flex-1 items-center justify-center md:flex"
        >
          <div className="flex items-center gap-1 rounded-lg border border-border/40 bg-muted/40 p-1 backdrop-blur-lg">
            {navIds.map(({ id, key }) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-md px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors duration-150 hover:bg-background/80 hover:text-foreground"
              >
                {t(key)}
              </a>
            ))}
          </div>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className={headerBtn}
            aria-label={t('nav.themeAria')}
          >
            {theme === 'dark' ? (
              <Sun className="size-4" aria-hidden />
            ) : (
              <Moon className="size-4" aria-hidden />
            )}
            <span className="hidden sm:inline">
              {theme === 'dark' ? t('nav.themeLight') : t('nav.themeDark')}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            className={headerBtn}
            aria-label={t('nav.lang')}
          >
            <Globe2 className="size-4" aria-hidden />
            <span className="hidden sm:inline">
              {lang === 'fr' ? 'EN' : 'FR'}
            </span>
          </button>

          <Link
            to={printHref}
            title={t('hero.ctaPdf')}
            className={cn(
              buttonVariants({ variant: 'default', size: 'sm' }),
              'hidden h-9 rounded-lg px-3 sm:inline-flex'
            )}
          >
            <Printer className="size-4" aria-hidden />
            {t('nav.print')}
          </Link>

          <Sheet>
            <SheetTrigger
              className={cn(headerBtn, 'size-9 px-0 md:hidden')}
            >
              <Menu className="size-5" />
              <span className="sr-only">Menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="font-display text-base">Jesse Tremblay</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-0.5">
                {navIds.map(({ id, key }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {t(key)}
                  </a>
                ))}
              </div>
              <Link
                to={printHref}
                className={cn(
                  buttonVariants({ variant: 'default', size: 'default' }),
                  'mt-6 w-full justify-center rounded-lg'
                )}
              >
                <Printer className="size-4" aria-hidden />
                {t('nav.print')}
              </Link>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
