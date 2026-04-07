import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Car,
  Check,
  Code2,
  FileSpreadsheet,
  GraduationCap,
  Languages,
  Layers3,
  Mail,
  MapPin,
  MessagesSquare,
  MonitorSmartphone,
  Phone,
  Sparkles,
  UserRound,
  UsersRound,
} from 'lucide-react'

import { AnimatedSection } from '@/components/animated-section'
import { Headshot } from '@/components/headshot'
import { SectionHeading } from '@/components/section-heading'
import { SiteHeader } from '@/components/site-header'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAppParams } from '@/contexts/app-params'
import { CONTACT } from '@/lib/contact'
import { staggerContainer, staggerItem } from '@/lib/motion-presets'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/*  Design tokens — one place to tweak for consistency                */
/* ------------------------------------------------------------------ */

const CARD =
  'rounded-xl border border-border/50 bg-card/50 ring-0 shadow-sm transition-[border-color,background-color,box-shadow] duration-300 hover:border-border/80 hover:bg-card/80 hover:shadow-md dark:bg-card/30 dark:hover:bg-card/50'

const BADGE_PILL =
  'inline-flex h-7 items-center gap-1.5 rounded-full border border-border/50 bg-muted/40 px-3 text-xs font-medium text-muted-foreground'

const BODY_TEXT =
  'text-[15px] leading-[1.7] text-muted-foreground md:text-base md:leading-[1.75]'

const ICON_CHIP =
  'flex size-9 shrink-0 items-center justify-center rounded-xl border border-border/50 bg-muted/40 text-primary/70'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Shared components                                                  */
/* ------------------------------------------------------------------ */

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-pretty">
          <Check
            className="mt-[3px] size-3.5 shrink-0 text-primary/50"
            strokeWidth={2.5}
            aria-hidden
          />
          <span className={BODY_TEXT}>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export function CvPage() {
  const { t, i18n } = useTranslation()
  const { variant } = useAppParams()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    document.title = t('meta.title')
    document.documentElement.lang = i18n.language
  }, [t, i18n.language])

  const v = variant === 'it' ? 'it' : 'general'
  const role = t(`variants.${v}.role`)
  const hook = t(`variants.${v}.hook`)

  const profileParagraphs = t('profile.paragraphs', { returnObjects: true }) as string[]
  const office = t('skills.groups.office', { returnObjects: true }) as SkillGroup
  const digital = t('skills.groups.digital', { returnObjects: true }) as SkillGroup
  const human = t('skills.groups.human', { returnObjects: true }) as SkillGroup
  const itExtra = t('skills.groupsIt', { returnObjects: true }) as SkillGroup
  const experienceItems = t('experience.items', { returnObjects: true }) as ExperienceItem[]
  const educationItems = t('education.items', { returnObjects: true }) as EducationItem[]
  const langItems = t('languages.items', { returnObjects: true }) as LangItem[]
  const interestParagraphs = t('interests.paragraphs', { returnObjects: true }) as string[]

  const skillBlocks: { group: SkillGroup; icon: typeof FileSpreadsheet }[] = [
    { group: office, icon: FileSpreadsheet },
    { group: digital, icon: MonitorSmartphone },
    { group: human, icon: UsersRound },
  ]

  /* ---- Hero ---- */

  const heroLeft = (
    <div className="space-y-8 text-left">
      <div className="space-y-5">
        <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          <MapPin className="size-3.5 text-primary/60" aria-hidden />
          {t('hero.location')}
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
          Jesse Tremblay
        </h1>
        <p className="font-display text-lg font-medium text-primary md:text-xl">
          {role}
        </p>
        <p className={cn(BODY_TEXT, 'max-w-lg md:text-[17px]')}>
          {hook}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className={BADGE_PILL}>
          <CalendarDays className="size-3.5 text-primary/60" aria-hidden />
          {t('hero.born')}
        </span>
        {langItems.map((l) => (
          <span key={l.name} className={BADGE_PILL}>
            <Languages className="size-3.5 text-primary/60" aria-hidden />
            {l.name}
          </span>
        ))}
        <span className={BADGE_PILL}>
          <Car className="size-3.5 text-primary/60" aria-hidden />
          {t('hero.mobile')}
        </span>
      </div>
    </div>
  )

  const heroRight = (
    <div className="relative mx-auto w-full max-w-[240px] md:mx-0 md:max-w-[260px]">
      <div
        className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/12 to-transparent blur-2xl dark:from-primary/16"
        aria-hidden
      />
      <Headshot className="relative aspect-square w-full" name="Jesse Tremblay" />
    </div>
  )

  const heroGrid =
    'grid items-start gap-12 md:grid-cols-[1fr_260px] md:gap-16'

  /* ---- Render ---- */

  return (
    <div id="top" className="relative min-h-svh bg-background text-foreground">
      {/* Background layers */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden
        style={{
          background:
            'radial-gradient(1100px 550px at 50% -12%, var(--hero-glow), transparent 55%)',
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-25 dark:opacity-20"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(var(--hero-grid) 1px, transparent 1px),
            linear-gradient(90deg, var(--hero-grid) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 15%, transparent 65%)',
        }}
      />

      <SiteHeader />

      <main className="mx-auto w-full max-w-[56rem] px-6 pb-32 pt-12 md:px-8 md:pt-16">
        {/* Hero */}
        {reduceMotion ? (
          <section className={heroGrid}>
            {heroLeft}
            {heroRight}
          </section>
        ) : (
          <motion.section
            className={heroGrid}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={staggerItem}>{heroLeft}</motion.div>
            <motion.div variants={staggerItem}>{heroRight}</motion.div>
          </motion.section>
        )}

        <Separator className="my-16 h-px bg-gradient-to-r from-transparent via-border to-transparent md:my-20" />

        {/* Sections */}
        <div className="flex flex-col gap-20 md:gap-24">
          {/* -- Profile -- */}
          <AnimatedSection id="profile">
            <SectionHeading id="profile-title" icon={UserRound}>
              {t('profile.title')}
            </SectionHeading>
            <div className={cn('space-y-5 text-left', BODY_TEXT)}>
              {profileParagraphs.map((p) => (
                <p key={p.slice(0, 48)} className="text-pretty">
                  {p}
                </p>
              ))}
            </div>
          </AnimatedSection>

          {/* -- Skills -- */}
          <AnimatedSection id="skills">
            <SectionHeading id="skills-title" icon={Layers3}>
              {t('skills.title')}
            </SectionHeading>
            <div className="grid gap-4 sm:grid-cols-2">
              {skillBlocks.map(({ group, icon: Ico }) => (
                <Card key={group.title} className={CARD}>
                  <CardHeader className="flex-row items-start gap-3 space-y-0 pb-4">
                    <span className={ICON_CHIP}>
                      <Ico className="size-4" strokeWidth={1.75} aria-hidden />
                    </span>
                    <CardTitle className="pt-1 font-display text-[15px] font-semibold tracking-tight">
                      {group.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <BulletList items={group.items} />
                  </CardContent>
                </Card>
              ))}
              {variant === 'it' ? (
                <Card
                  className={cn(
                    CARD,
                    'border-primary/25 bg-primary/[0.04] sm:col-span-2 dark:bg-primary/[0.06]'
                  )}
                >
                  <CardHeader className="flex-row items-start gap-3 space-y-0 pb-4">
                    <span className={cn(ICON_CHIP, 'border-primary/25 bg-primary/8 text-primary')}>
                      <Code2 className="size-4" strokeWidth={1.75} aria-hidden />
                    </span>
                    <div className="min-w-0 pt-1">
                      <CardTitle className="font-display text-[15px] font-semibold tracking-tight text-primary">
                        {itExtra.title}
                      </CardTitle>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {t('variants.it.role')}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <BulletList items={itExtra.items} />
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </AnimatedSection>

          {/* -- Experience -- */}
          <AnimatedSection id="experience">
            <SectionHeading id="experience-title" icon={BriefcaseBusiness}>
              {t('experience.title')}
            </SectionHeading>
            <div className="relative">
              <div
                className="absolute top-2 bottom-2 left-[11px] hidden w-px bg-gradient-to-b from-primary/20 via-border to-transparent md:block"
                aria-hidden
              />
              <div className="space-y-5 md:pl-8">
                {experienceItems.map((job) => (
                  <Card key={job.id} className={cn(CARD, 'relative text-left')}>
                    <span
                      className="absolute -left-[21px] top-7 hidden size-2 rounded-full bg-primary/60 ring-[3px] ring-background md:block"
                      aria-hidden
                    />
                    <CardHeader className="pb-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                        <div className="min-w-0 space-y-1.5">
                          <CardTitle className="font-display text-base font-semibold tracking-tight">
                            {job.title}
                          </CardTitle>
                          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-1.5">
                              <Building2 className="size-3.5 text-primary/50" aria-hidden />
                              {job.org}
                            </span>
                            <span className="hidden sm:inline" aria-hidden>·</span>
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="size-3.5 text-primary/40" aria-hidden />
                              {job.location}
                            </span>
                          </p>
                        </div>
                        <span className={cn(BADGE_PILL, 'shrink-0')}>
                          <CalendarDays className="size-3.5 text-primary/50" aria-hidden />
                          {job.period}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <BulletList items={job.bullets} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* -- Education -- */}
          <AnimatedSection id="education">
            <SectionHeading id="education-title" icon={GraduationCap}>
              {t('education.title')}
            </SectionHeading>
            <div className="grid gap-4 sm:grid-cols-2">
              {educationItems.map((ed) => (
                <Card key={ed.school} className={cn(CARD, 'text-left')}>
                  <CardHeader className="flex-row items-start gap-3 space-y-0">
                    <GraduationCap
                      className="mt-0.5 size-5 shrink-0 text-primary/50"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <div className="min-w-0 space-y-1">
                      <CardTitle className="font-display text-[15px] font-semibold tracking-tight">
                        {ed.school}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{ed.detail}</p>
                    </div>
                  </CardHeader>
                  {ed.note ? (
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground">{ed.note}</p>
                    </CardContent>
                  ) : null}
                </Card>
              ))}
            </div>
          </AnimatedSection>

          {/* -- Interests -- */}
          <AnimatedSection id="interests">
            <SectionHeading id="interests-title" icon={Sparkles}>
              {t('interests.title')}
            </SectionHeading>
            <div className={cn('space-y-4 text-left', BODY_TEXT)}>
              {interestParagraphs.map((p) => (
                <p key={p.slice(0, 40)} className="text-pretty">
                  {p}
                </p>
              ))}
            </div>
          </AnimatedSection>

          {/* -- Contact -- */}
          <AnimatedSection
            id="contact"
            className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.05] to-transparent p-6 dark:from-primary/[0.08] md:p-8"
          >
            <SectionHeading
              id="contact-title"
              icon={MessagesSquare}
              tone="accent"
              headingClassName="text-primary"
            >
              {t('contact.title')}
            </SectionHeading>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  href: `mailto:${CONTACT.email}`,
                  icon: Mail,
                  label: CONTACT.email,
                },
                {
                  href: `tel:${CONTACT.phoneE164}`,
                  icon: Phone,
                  label: CONTACT.phoneDisplay,
                },
              ].map(({ href, icon: Ico, label }) => (
                <a
                  key={href}
                  href={href}
                  className="group flex items-center gap-3 rounded-xl border border-border/50 bg-background/70 px-4 py-3.5 text-sm font-medium transition-colors duration-150 hover:border-primary/30 hover:bg-background"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary transition-colors group-hover:bg-primary/12">
                    <Ico className="size-4" aria-hidden />
                  </span>
                  <span className="min-w-0 break-all">{label}</span>
                </a>
              ))}
              <div className="flex items-center gap-3 rounded-xl border border-dashed border-border/50 bg-background/40 px-4 py-3.5 text-sm text-muted-foreground sm:col-span-2 lg:col-span-1">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted/50 text-primary/60">
                  <MapPin className="size-4" aria-hidden />
                </span>
                {t('hero.location')}
              </div>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">{t('contact.footnote')}</p>
          </AnimatedSection>
        </div>
      </main>

      <footer className="no-print border-t border-border/30 py-10 text-center text-xs font-medium tracking-wide text-muted-foreground/70">
        © {new Date().getFullYear()} Jesse Tremblay · {t('hero.location')}
      </footer>
    </div>
  )
}
