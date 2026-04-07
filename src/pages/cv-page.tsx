import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Car,
  Check,
  CircleCheck,
  Download,
  FileSpreadsheet,
  Gamepad2,
  Goal,
  GraduationCap,
  Languages,
  Layers3,
  Mail,
  MapPin,
  MessagesSquare,
  MonitorSmartphone,
  Phone,
  Puzzle,
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
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CONTACT } from '@/lib/contact'
import { staggerContainer, staggerItem } from '@/lib/motion-presets'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/*  Design tokens                                                      */
/* ------------------------------------------------------------------ */

const CARD =
  'rounded-xl border border-border/50 bg-card/50 ring-0 shadow-sm transition-[border-color,background-color,box-shadow] duration-300 hover:border-border/80 hover:bg-card/80 hover:shadow-md dark:bg-card/30 dark:hover:bg-card/50'

const BADGE_PILL =
  'inline-flex h-7 items-center gap-1.5 rounded-full border border-border/50 bg-muted/40 px-2.5 text-[11px] font-medium text-muted-foreground sm:px-3 sm:text-xs'

const BODY_TEXT =
  'text-[14px] leading-[1.65] text-muted-foreground sm:text-[15px] sm:leading-[1.7] md:text-base md:leading-[1.75]'

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
type InterestItem = { icon: string; title: string; description: string }

/* ------------------------------------------------------------------ */
/*  Shared                                                             */
/* ------------------------------------------------------------------ */

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 sm:space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-pretty sm:gap-2.5">
          <span className="inline-flex h-[23px] shrink-0 items-center text-primary/50 sm:h-[26px] md:h-7">
            <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
          </span>
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
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    document.title = t('meta.title')
    document.documentElement.lang = i18n.language
  }, [t, i18n.language])

  const role = t('variants.general.role')
  const hook = t('variants.general.hook')

  const profileParagraphs = t('profile.paragraphs', { returnObjects: true }) as string[]
  const profileTraits = t('profile.traits', { returnObjects: true }) as string[]
  const office = t('skills.groups.office', { returnObjects: true }) as SkillGroup
  const digital = t('skills.groups.digital', { returnObjects: true }) as SkillGroup
  const human = t('skills.groups.human', { returnObjects: true }) as SkillGroup
  const logic = t('skills.groups.logic', { returnObjects: true }) as SkillGroup
  const experienceItems = t('experience.items', { returnObjects: true }) as ExperienceItem[]
  const educationItems = t('education.items', { returnObjects: true }) as EducationItem[]
  const langItems = t('languages.items', { returnObjects: true }) as LangItem[]
  const interestItems = t('interests.items', { returnObjects: true }) as InterestItem[]

  const interestIcons: Record<string, typeof Goal> = {
    soccer: Goal,
    gaming: Gamepad2,
    tech: MonitorSmartphone,
  }

  const skillBlocks: { group: SkillGroup; icon: typeof FileSpreadsheet }[] = [
    { group: office, icon: FileSpreadsheet },
    { group: digital, icon: MonitorSmartphone },
    { group: human, icon: UsersRound },
    { group: logic, icon: Puzzle },
  ]

  /* ---- Hero ---- */

  const heroPhoto = (
    <div className="relative mx-auto w-full max-w-[180px] sm:max-w-[220px] md:mx-0 md:max-w-[260px]">
      <div
        className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/12 to-transparent blur-2xl dark:from-primary/16"
        aria-hidden
      />
      <Headshot className="relative aspect-square w-full" name="Jesse Tremblay" />
    </div>
  )

  const heroText = (
    <div className="space-y-5 text-center sm:space-y-6 md:space-y-8 md:text-left">
      <div className="space-y-3 sm:space-y-4 md:space-y-5">
        <p className="flex items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground sm:text-xs md:justify-start">
          <MapPin className="size-3.5 text-primary/60" aria-hidden />
          {t('hero.location')}
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          Jesse Tremblay
        </h1>
        <p className="font-display text-base font-medium text-primary sm:text-lg md:text-xl">
          {role}
        </p>
        <p className={cn(BODY_TEXT, 'mx-auto max-w-lg md:mx-0 md:text-[17px]')}>
          {hook}
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:justify-start">
        <span className="inline-flex h-7 items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 sm:px-3 sm:text-xs">
          <CircleCheck className="size-3 sm:size-3.5" aria-hidden />
          {t('hero.available')}
        </span>
        <span className={BADGE_PILL}>
          <CalendarDays className="size-3 text-primary/60 sm:size-3.5" aria-hidden />
          {t('hero.born')}
        </span>
        {langItems.map((l) => (
          <span key={l.name} className={BADGE_PILL}>
            <Languages className="size-3 text-primary/60 sm:size-3.5" aria-hidden />
            {l.name}
          </span>
        ))}
        <span className={BADGE_PILL}>
          <Car className="size-3 text-primary/60 sm:size-3.5" aria-hidden />
          {t('hero.mobile')}
        </span>
      </div>
      {/* CTAs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 md:justify-start">
        <a
          href={`mailto:${CONTACT.email}`}
          className={cn(
            buttonVariants({ variant: 'default', size: 'sm' }),
            'h-10 rounded-xl px-4 text-[13px] sm:h-11 sm:px-5 sm:text-sm'
          )}
        >
          <Mail className="size-4" aria-hidden />
          {t('hero.ctaMail')}
        </a>
        <a
          href={`tel:${CONTACT.phoneE164}`}
          className={cn(
            buttonVariants({ variant: 'outline', size: 'sm' }),
            'h-10 rounded-xl px-4 text-[13px] sm:h-11 sm:px-5 sm:text-sm'
          )}
        >
          <Phone className="size-4" aria-hidden />
          {t('hero.ctaTel')}
        </a>
        <a
          href={i18n.language === 'en' ? '/Jesse_Tremblay_CV_EN.pdf' : '/Jesse_Tremblay_CV.pdf'}
          download
          className={cn(
            buttonVariants({ variant: 'outline', size: 'sm' }),
            'h-10 rounded-xl px-4 text-[13px] sm:h-11 sm:px-5 sm:text-sm'
          )}
        >
          <Download className="size-4" aria-hidden />
          {t('hero.ctaPdf')}
        </a>
      </div>
    </div>
  )

  const heroGrid =
    'flex flex-col items-center gap-8 sm:gap-10 md:grid md:grid-cols-[1fr_260px] md:items-start md:gap-16'

  /* ---- Render ---- */

  return (
    <div
      id="top"
      className="relative min-h-svh text-foreground"
    >
      {/* Floating gradient blobs — sits between body bg and content */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className="relative z-10">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[56rem] px-4 pb-20 pt-8 sm:px-6 sm:pb-28 sm:pt-10 md:px-8 md:pb-32 md:pt-16">
        {/* Hero — photo first on mobile for visual impact */}
        {reduceMotion ? (
          <section className={heroGrid}>
            <div className="order-1 md:order-2">{heroPhoto}</div>
            <div className="order-2 md:order-1">{heroText}</div>
          </section>
        ) : (
          <motion.section
            className={heroGrid}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="order-1 md:order-2" variants={staggerItem}>{heroPhoto}</motion.div>
            <motion.div className="order-2 md:order-1" variants={staggerItem}>{heroText}</motion.div>
          </motion.section>
        )}

        <Separator className="my-10 h-px bg-gradient-to-r from-transparent via-border to-transparent sm:my-14 md:my-20" />

        {/* Sections */}
        <div className="flex flex-col gap-14 sm:gap-18 md:gap-24">
          {/* -- Profile -- */}
          <AnimatedSection id="profile">
            <SectionHeading id="profile-title" icon={UserRound}>
              {t('profile.title')}
            </SectionHeading>
            <div className={cn('space-y-4 text-left sm:space-y-5', BODY_TEXT)}>
              {profileParagraphs.map((p) => (
                <p key={p.slice(0, 48)} className="text-pretty">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
              {profileTraits.map((trait) => (
                <span
                  key={trait}
                  className="inline-flex h-7 items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 text-[11px] font-semibold tracking-wide text-primary/80 sm:text-xs"
                >
                  <Check className="size-3 text-primary/50" strokeWidth={2.5} aria-hidden />
                  {trait}
                </span>
              ))}
            </div>
          </AnimatedSection>

          {/* -- Skills -- */}
          <AnimatedSection id="skills">
            <SectionHeading id="skills-title" icon={Layers3}>
              {t('skills.title')}
            </SectionHeading>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {skillBlocks.map(({ group, icon: Ico }) => (
                <Card key={group.title} className={CARD}>
                  <CardHeader className="flex-row items-start gap-3 space-y-0 px-4 pb-3 pt-4 sm:px-6 sm:pb-4 sm:pt-6">
                    <span className={ICON_CHIP}>
                      <Ico className="size-4" strokeWidth={1.75} aria-hidden />
                    </span>
                    <CardTitle className="pt-1 font-display text-[14px] font-semibold tracking-tight sm:text-[15px]">
                      {group.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pt-0 pb-4 sm:px-6 sm:pb-6">
                    <BulletList items={group.items} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </AnimatedSection>

          {/* -- Experience -- */}
          <AnimatedSection id="experience">
            <SectionHeading id="experience-title" icon={BriefcaseBusiness}>
              {t('experience.title')}
            </SectionHeading>
            <div className="relative">
              <div
                className="absolute top-2 bottom-2 left-0 w-px bg-gradient-to-b from-primary/15 via-border/60 to-transparent md:left-[11px] md:from-primary/20 md:via-border"
                aria-hidden
              />
              <div className="space-y-3 pl-4 sm:space-y-4 sm:pl-5 md:space-y-5 md:pl-8">
                {experienceItems.map((job) => (
                  <Card key={job.id} className={cn(CARD, 'relative text-left')}>
                    <span
                      className="absolute -left-[9.5px] top-7 size-[7px] rounded-full bg-primary/50 ring-[3px] ring-background sm:-left-[12px] sm:size-2 md:-left-[21px] md:bg-primary/60"
                      aria-hidden
                    />
                    <CardHeader className="px-4 pb-3 pt-4 sm:px-6 sm:pb-4 sm:pt-6">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                        <div className="min-w-0 space-y-1">
                          <CardTitle className="font-display text-[15px] font-semibold tracking-tight sm:text-base">
                            {job.title}
                          </CardTitle>
                          <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[13px] text-muted-foreground sm:text-sm">
                            <span className="inline-flex items-center gap-1.5">
                              <Building2 className="size-3 text-primary/50 sm:size-3.5" aria-hidden />
                              {job.org}
                            </span>
                            <span className="hidden sm:inline" aria-hidden>·</span>
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="size-3 text-primary/40 sm:size-3.5" aria-hidden />
                              {job.location}
                            </span>
                          </p>
                        </div>
                        <span className={cn(BADGE_PILL, 'shrink-0')}>
                          <CalendarDays className="size-3 text-primary/50 sm:size-3.5" aria-hidden />
                          {job.period}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="px-4 pt-0 pb-4 sm:px-6 sm:pb-6">
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
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {educationItems.map((ed) => (
                <Card key={ed.school} className={cn(CARD, 'text-left')}>
                  <CardHeader className="flex-row items-start gap-3 space-y-0 px-4 pb-3 pt-4 sm:px-6 sm:pb-4 sm:pt-6">
                    <span className={ICON_CHIP}>
                      <GraduationCap className="size-4" strokeWidth={1.75} aria-hidden />
                    </span>
                    <div className="min-w-0 space-y-1 pt-1">
                      <CardTitle className="font-display text-[14px] font-semibold tracking-tight sm:text-[15px]">
                        {ed.school}
                      </CardTitle>
                      <p className="text-[13px] text-muted-foreground sm:text-sm">{ed.detail}</p>
                    </div>
                  </CardHeader>
                  {ed.note ? (
                    <CardContent className="px-4 pt-0 pb-4 sm:px-6 sm:pb-6">
                      <p className="flex items-center gap-1.5 text-[13px] text-muted-foreground sm:text-sm">
                        <MapPin className="size-3 text-primary/40" aria-hidden />
                        {ed.note}
                      </p>
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
            <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              {interestItems.map((item) => {
                const Ico = interestIcons[item.icon] ?? Sparkles
                return (
                  <div
                    key={item.icon}
                    className={cn(
                      CARD,
                      'flex flex-col items-center px-4 py-5 text-center sm:px-5 sm:py-6'
                    )}
                  >
                    <span className={cn(ICON_CHIP, 'mb-3 size-11 rounded-2xl sm:mb-4 sm:size-12')}>
                      <Ico className="size-5 sm:size-[22px]" strokeWidth={1.6} aria-hidden />
                    </span>
                    <h3 className="font-display text-[14px] font-semibold tracking-tight sm:text-[15px]">
                      {item.title}
                    </h3>
                    <p className={cn(BODY_TEXT, 'mt-1.5 text-[13px] sm:text-[14px]')}>
                      {item.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </AnimatedSection>

          {/* -- Contact -- */}
          <AnimatedSection
            id="contact"
            className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.05] to-transparent p-4 dark:from-primary/[0.08] sm:p-6 md:p-8"
          >
            <SectionHeading
              id="contact-title"
              icon={MessagesSquare}
              tone="accent"
              headingClassName="text-primary"
            >
              {t('contact.title')}
            </SectionHeading>

            <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
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
                  className="group flex items-center gap-3 rounded-xl border border-border/50 bg-background/70 px-3.5 py-3 text-[13px] font-medium transition-colors duration-150 hover:border-primary/30 hover:bg-background sm:px-4 sm:py-3.5 sm:text-sm"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary transition-colors group-hover:bg-primary/12">
                    <Ico className="size-4" aria-hidden />
                  </span>
                  <span className="min-w-0 break-words">{label}</span>
                </a>
              ))}
              <div className="flex items-center gap-3 rounded-xl border border-dashed border-border/50 bg-background/40 px-3.5 py-3 text-[13px] text-muted-foreground sm:col-span-2 sm:px-4 sm:py-3.5 sm:text-sm">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted/50 text-primary/60">
                  <MapPin className="size-4" aria-hidden />
                </span>
                {t('hero.location')}
              </div>
            </div>
            <p className="mt-4 text-[11px] text-muted-foreground sm:mt-6 sm:text-xs">{t('contact.footnote')}</p>
          </AnimatedSection>
        </div>
      </main>

      <footer className="no-print border-t border-border/30 px-4 py-8 text-center text-[11px] font-medium tracking-wide text-muted-foreground/70 sm:py-10 sm:text-xs">
        © {new Date().getFullYear()} Jesse Tremblay · {t('hero.location')}
      </footer>
      </div>
    </div>
  )
}
