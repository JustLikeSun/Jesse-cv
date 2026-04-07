import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  BriefcaseBusiness,
  Download,
  Globe2,
  GraduationCap,
  Layers3,
  Menu,
  MessagesSquare,
  Moon,
  Sparkles,
  Sun,
  UserRound,
} from 'lucide-react'

import { useAppParams } from '@/contexts/app-params'
import { useTheme } from '@/contexts/theme'
import { buttonVariants } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const navIds = [
  { id: 'profile', key: 'nav.profile', icon: UserRound },
  { id: 'skills', key: 'nav.skills', icon: Layers3 },
  { id: 'experience', key: 'nav.experience', icon: BriefcaseBusiness },
  { id: 'education', key: 'nav.education', icon: GraduationCap },
  { id: 'interests', key: 'nav.interests', icon: Sparkles },
  { id: 'contact', key: 'nav.contact', icon: MessagesSquare },
] as const

const headerBtn =
  'inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg border border-border/60 bg-background/60 px-2.5 text-[13px] font-medium text-muted-foreground backdrop-blur transition-colors duration-150 hover:bg-muted hover:text-foreground active:scale-[0.97]'

export function SiteHeader() {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const { lang, setLang, searchString } = useAppParams()
  const [scrolled, setScrolled] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)

  const printHref = `/print${searchString}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeSheet = useCallback(() => setSheetOpen(false), [])

  return (
    <header
      className={cn(
        'no-print sticky top-0 z-40 transition-[border-color,box-shadow,background-color] duration-300',
        scrolled
          ? 'border-b border-border/40 bg-background/85 shadow-[0_1px_3px_0_hsl(0_0%_0%/_0.06),0_6px_24px_-4px_hsl(0_0%_0%/_0.08)] backdrop-blur-2xl dark:shadow-[0_1px_3px_0_hsl(0_0%_0%/_0.2),0_8px_32px_-4px_hsl(0_0%_0%/_0.3)]'
          : 'border-b border-transparent bg-transparent backdrop-blur-xl'
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-[56rem] items-center gap-3 px-4 sm:h-16 sm:gap-4 sm:px-6 md:px-8">
        <a
          href="#top"
          className="shrink-0 font-display text-base font-semibold tracking-tight text-foreground transition-opacity hover:opacity-70"
        >
          JT
        </a>

        {/* Desktop nav pill */}
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

        {/* Right side actions */}
        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className={cn(headerBtn, 'size-9 px-0')}
            aria-label={t('nav.themeAria')}
          >
            {theme === 'dark' ? (
              <Sun className="size-4" aria-hidden />
            ) : (
              <Moon className="size-4" aria-hidden />
            )}
          </button>

          <button
            type="button"
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            className={cn(headerBtn, 'size-9 px-0')}
            aria-label={t('nav.lang')}
          >
            <Globe2 className="size-4" aria-hidden />
          </button>

          <Link
            to={printHref}
            title={t('hero.ctaPdf')}
            className={cn(
              buttonVariants({ variant: 'default', size: 'sm' }),
              'hidden h-9 rounded-lg px-3 sm:inline-flex'
            )}
          >
            <Download className="size-4" aria-hidden />
            {t('nav.print')}
          </Link>

          {/* Mobile menu */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className={cn(headerBtn, 'size-9 px-0 md:hidden')}
              aria-label="Menu"
            >
              <Menu className="size-5" />
            </button>
            <SheetContent side="right" className="w-[280px] p-0">
              <SheetHeader className="border-b border-border/40 px-5 pb-4 pt-5">
                <SheetTitle className="font-display text-lg font-semibold tracking-tight">
                  Jesse Tremblay
                </SheetTitle>
                <p className="text-[13px] text-muted-foreground">
                  {t('hero.location')}
                </p>
              </SheetHeader>

              {/* Nav links */}
              <nav className="flex flex-col px-3 py-3" aria-label="Sections">
                {navIds.map(({ id, key, icon: NavIcon }) => (
                  <SheetClose
                    key={id}
                    render={
                      <a
                        href={`#${id}`}
                        onClick={closeSheet}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground active:bg-muted/80"
                      />
                    }
                  >
                    <NavIcon className="size-[18px] text-primary/60" strokeWidth={1.8} aria-hidden />
                    {t(key)}
                  </SheetClose>
                ))}
              </nav>

              <div className="border-t border-border/40 px-5 py-4">
                {/* Theme & lang row */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => { toggleTheme(); closeSheet() }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border/50 bg-muted/30 py-2.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-[0.97]"
                  >
                    {theme === 'dark' ? (
                      <Sun className="size-4" aria-hidden />
                    ) : (
                      <Moon className="size-4" aria-hidden />
                    )}
                    {theme === 'dark' ? t('nav.themeLight') : t('nav.themeDark')}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLang(lang === 'fr' ? 'en' : 'fr'); closeSheet() }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border/50 bg-muted/30 py-2.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-[0.97]"
                  >
                    <Globe2 className="size-4" aria-hidden />
                    {lang === 'fr' ? 'English' : 'Français'}
                  </button>
                </div>

                {/* PDF button */}
                <Link
                  to={printHref}
                  onClick={closeSheet}
                  className={cn(
                    buttonVariants({ variant: 'default', size: 'default' }),
                    'mt-3 w-full justify-center rounded-xl'
                  )}
                >
                  <Download className="size-4" aria-hidden />
                  {t('nav.print')}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
