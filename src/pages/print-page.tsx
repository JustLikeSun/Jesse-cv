import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Printer } from 'lucide-react'

import { Headshot } from '@/components/headshot'
import { Button, buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useAppParams } from '@/contexts/app-params'
import { CONTACT } from '@/lib/contact'
import { cn } from '@/lib/utils'

type SkillGroup = { title: string; items: string[] }
type ExperienceItem = {
  id: string
  title: string
  org: string
  location: string
  period: string
  bullets: string[]
}
type EducationItem = { school: string; detail: string; note: string }
type LangItem = { name: string; level: string }

export function PrintPage() {
  const { t, i18n } = useTranslation()
  const { variant, searchString } = useAppParams()

  useEffect(() => {
    document.title = t('print.docTitle')
    document.documentElement.lang = i18n.language
  }, [t, i18n.language])

  const variantKey = variant === 'it' ? 'it' : 'general'
  const role = t(`variants.${variantKey}.role`)

  const profileParagraphs = t('profile.paragraphs', {
    returnObjects: true,
  }) as string[]

  const office = t('skills.groups.office', { returnObjects: true }) as SkillGroup
  const digital = t('skills.groups.digital', { returnObjects: true }) as SkillGroup
  const human = t('skills.groups.human', { returnObjects: true }) as SkillGroup
  const itExtra = t('skills.groupsIt', { returnObjects: true }) as SkillGroup

  const experienceItems = t('experience.items', {
    returnObjects: true,
  }) as ExperienceItem[]

  const educationItems = t('education.items', {
    returnObjects: true,
  }) as EducationItem[]

  const langItems = t('languages.items', {
    returnObjects: true,
  }) as LangItem[]

  const interestParagraphs = t('interests.paragraphs', {
    returnObjects: true,
  }) as string[]

  return (
    <div className="min-h-svh bg-background text-foreground print:bg-white print:text-black">
      <div className="no-print sticky top-0 z-10 flex flex-wrap items-center justify-between gap-2 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <Link
          to={searchString ? `/${searchString}` : '/'}
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-2')}
        >
          <ArrowLeft className="size-4" />
          {i18n.language === 'fr' ? 'Retour' : 'Back'}
        </Link>
        <Button size="sm" onClick={() => window.print()}>
          <Printer className="size-4" />
          {t('hero.ctaPdf')}
        </Button>
      </div>

      <article className="print-article mx-auto max-w-[210mm] px-6 py-10 print:max-w-none print:px-0 print:py-0 print:shadow-none">
        <header className="mb-8 flex flex-col gap-6 border-b border-border pb-8 print:flex-row print:items-start print:justify-between print:border-black/20">
          <div className="space-y-2 text-left">
            <h1 className="font-display text-3xl font-bold tracking-tight print:text-black">
              Jesse Tremblay
            </h1>
            <p className="text-lg text-primary print:text-black">{role}</p>
            <p className="text-sm text-muted-foreground print:text-neutral-700">
              {t('hero.location')} · {t('hero.born')} · {t('hero.mobile')}
            </p>
            <p className="text-sm">
              {CONTACT.email} · {CONTACT.phoneDisplay}
            </p>
            <p className="text-sm text-muted-foreground print:text-neutral-600">
              {langItems.map((l) => `${l.name}: ${l.level}`).join(' · ')}
            </p>
          </div>
          <div className="h-32 w-32 shrink-0 overflow-hidden rounded-xl print:h-28 print:w-28">
            <Headshot className="size-full max-h-none max-w-none" name="Jesse Tremblay" />
          </div>
        </header>

        <section className="mb-8 space-y-3 text-left print:mb-6">
          <h2 className="font-display text-lg font-semibold uppercase tracking-wide print:text-black">
            {t('profile.title')}
          </h2>
          {profileParagraphs.map((p) => (
            <p
              key={p.slice(0, 40)}
              className="text-sm leading-relaxed text-muted-foreground print:text-neutral-800"
            >
              {p}
            </p>
          ))}
        </section>

        <section className="mb-8 print:mb-6">
          <h2 className="mb-3 font-display text-lg font-semibold uppercase tracking-wide print:text-black">
            {t('skills.title')}
          </h2>
          <div className="grid gap-4 print:grid-cols-2">
            {[office, digital, human].map((group) => (
              <div key={group.title}>
                <h3 className="mb-2 font-medium print:text-black">{group.title}</h3>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground print:text-neutral-800">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
            {variant === 'it' ? (
              <div className="print:col-span-2">
                <h3 className="mb-2 font-medium text-primary print:text-black">
                  {itExtra.title}
                </h3>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground print:text-neutral-800">
                  {itExtra.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>

        <section className="mb-8 print:mb-6">
          <h2 className="mb-4 font-display text-lg font-semibold uppercase tracking-wide print:text-black">
            {t('experience.title')}
          </h2>
          <div className="space-y-6">
            {experienceItems.map((job) => (
              <div key={job.id}>
                <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                  <div>
                    <h3 className="font-medium print:text-black">{job.title}</h3>
                    <p className="text-sm text-muted-foreground print:text-neutral-700">
                      {job.org} — {job.location}
                    </p>
                  </div>
                  <p className="text-sm font-medium print:text-black">{job.period}</p>
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground print:text-neutral-800">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <Separator className="mt-4 print:bg-neutral-300" />
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 grid gap-4 print:mb-6 print:grid-cols-2">
          <div>
            <h2 className="mb-3 font-display text-lg font-semibold uppercase tracking-wide print:text-black">
              {t('education.title')}
            </h2>
            {educationItems.map((ed) => (
              <div key={ed.school} className="mb-3">
                <p className="font-medium print:text-black">{ed.school}</p>
                <p className="text-sm text-muted-foreground print:text-neutral-800">
                  {ed.detail}
                </p>
                {ed.note ? (
                  <p className="text-sm text-muted-foreground print:text-neutral-700">
                    {ed.note}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
          <div>
            <h2 className="mb-3 font-display text-lg font-semibold uppercase tracking-wide print:text-black">
              {t('interests.title')}
            </h2>
            {interestParagraphs.map((p) => (
              <p
                key={p.slice(0, 40)}
                className="mb-2 text-sm leading-relaxed text-muted-foreground print:text-neutral-800"
              >
                {p}
              </p>
            ))}
          </div>
        </section>

        <footer className="border-t border-border pt-4 text-center text-xs text-muted-foreground print:border-black/20 print:text-neutral-600">
          {t('print.footer')}
        </footer>
      </article>
    </div>
  )
}
