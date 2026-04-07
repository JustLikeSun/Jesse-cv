import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe2, Mail, MapPin, Phone } from 'lucide-react'

import { Headshot } from '@/components/headshot'
import { CONTACT } from '@/lib/contact'

type SkillGroup = { title: string; items: string[] }
type ExperienceItem = { id: string; title: string; org: string; location: string; period: string; bullets: string[] }
type EducationItem = { school: string; detail: string; note: string }
type LangItem = { name: string; level: string }
type InterestItem = { icon: string; title: string; description: string }

const A = '#7c3aed'
const ABG = '#7c3aed0a'
const M = '#64748b'
const B = '#e2e8f0'
const D = '#0f172a'
const T = '#334155'

const sec: React.CSSProperties = {
  margin: '0 0 10px',
  fontSize: 13,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: D,
  paddingBottom: 6,
  borderBottom: `2px solid ${A}`,
}

const pill: React.CSSProperties = {
  display: 'inline-block',
  fontSize: 10.5,
  fontWeight: 600,
  color: A,
  background: ABG,
  border: `1px solid ${A}20`,
  borderRadius: 999,
  padding: '2px 10px',
}

const printStyles = `
  @page { size: letter; margin: 0; }
  @media print {
    html, body { margin: 0; padding: 0; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .print-page { width: 8.5in !important; height: 11in !important; margin: 0 !important; padding: 32px 40px 24px !important; box-shadow: none !important; border-radius: 0 !important; overflow: hidden !important; }
    .print-page-break { break-after: page; page-break-after: always; }
    .print-screen-only { display: none !important; }
  }
`

const page: React.CSSProperties = {
  width: '8.5in',
  height: '11in',
  margin: '0 auto',
  background: '#fff',
  color: T,
  fontFamily: "'Outfit','Geist Variable',system-ui,-apple-system,sans-serif",
  fontSize: 12.5,
  lineHeight: 1.5,
  padding: '32px 40px 24px',
  boxSizing: 'border-box',
  overflow: 'hidden',
}

export function PrintPage() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.title = t('print.docTitle')
    document.documentElement.lang = i18n.language
  }, [t, i18n.language])

  const role = t('variants.general.role')
  const paras = t('profile.paragraphs', { returnObjects: true }) as string[]
  const traits = t('profile.traits', { returnObjects: true }) as string[]
  const groups = [
    t('skills.groups.office', { returnObjects: true }) as SkillGroup,
    t('skills.groups.digital', { returnObjects: true }) as SkillGroup,
    t('skills.groups.human', { returnObjects: true }) as SkillGroup,
    t('skills.groups.logic', { returnObjects: true }) as SkillGroup,
  ]
  const jobs = t('experience.items', { returnObjects: true }) as ExperienceItem[]
  const edu = t('education.items', { returnObjects: true }) as EducationItem[]
  const langs = t('languages.items', { returnObjects: true }) as LangItem[]
  const interests = t('interests.items', { returnObjects: true }) as InterestItem[]

  return (
    <div style={{ background: '#f1f5f9', minHeight: '100vh', padding: '24px 0' }}>
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />

      {/* ─── PAGE 1 — RECTO ─── */}
      <article
        className="print-page print-page-break"
        style={{
          ...page,
          borderRadius: 8,
          boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.05)',
          marginTop: 0,
          marginBottom: 24,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, marginBottom: 18, paddingBottom: 14, borderBottom: `2.5px solid ${A}` }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: D }}>
              Jesse Tremblay
            </h1>
            <p style={{ margin: '3px 0 0', fontSize: 14, fontWeight: 600, color: A }}>{role}</p>
            <p style={{ margin: '5px 0 0', fontSize: 11.5, color: M }}>
              {t('hero.location')} · {t('hero.born')} · {t('hero.mobile')}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 8, fontSize: 11.5 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Mail style={{ width: 11, height: 11, color: A }} />{CONTACT.email}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Phone style={{ width: 11, height: 11, color: A }} />{CONTACT.phoneDisplay}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Globe2 style={{ width: 11, height: 11, color: A }} />
                {langs.map(l => l.name).join(' / ')}
              </span>
            </div>
            <span style={{ display: 'inline-block', marginTop: 7, fontSize: 10, fontWeight: 700, color: '#059669', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 999, padding: '1px 10px' }}>
              {t('hero.available')}
            </span>
          </div>
          <div style={{ width: 82, height: 82, borderRadius: 10, overflow: 'hidden', flexShrink: 0, border: `2px solid ${B}` }}>
            <Headshot className="size-full max-h-none max-w-none" name="Jesse Tremblay" />
          </div>
        </div>

        {/* Profile */}
        <section style={{ marginBottom: 18 }}>
          <h2 style={sec}>{t('profile.title')}</h2>
          {paras.map(p => (
            <p key={p.slice(0, 30)} style={{ margin: '0 0 5px', lineHeight: 1.55 }}>{p}</p>
          ))}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
            {traits.map(tr => (
              <span key={tr} style={pill}>{tr}</span>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section style={{ flex: 1 }}>
          <h2 style={sec}>{t('skills.title')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 20px' }}>
            {groups.map(g => (
              <div key={g.title}>
                <h3 style={{ margin: '0 0 3px', fontSize: 12, fontWeight: 700, color: D }}>{g.title}</h3>
                <ul style={{ margin: 0, paddingLeft: 14, lineHeight: 1.5 }}>
                  {g.items.map(item => <li key={item} style={{ marginBottom: 1.5 }}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section style={{ marginTop: 18 }}>
          <h2 style={sec}>{t('languages.title')}</h2>
          <div style={{ display: 'flex', gap: 28 }}>
            {langs.map(l => (
              <div key={l.name} style={{ fontSize: 12 }}>
                <span style={{ fontWeight: 700, color: D }}>{l.name}</span>
                <span style={{ color: M, marginLeft: 6 }}>— {l.level}</span>
              </div>
            ))}
          </div>
        </section>

        <div style={{ marginTop: 'auto', paddingTop: 10, textAlign: 'right', fontSize: 9, color: '#94a3b8' }}>
          1 / 2
        </div>
      </article>

      {/* ─── PAGE 2 — VERSO ─── */}
      <article
        className="print-page"
        style={{
          ...page,
          borderRadius: 8,
          boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.05)',
          marginBottom: 24,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Mini header repeat */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 10, borderBottom: `2.5px solid ${A}` }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: D }}>Jesse Tremblay</h1>
            <p style={{ margin: '1px 0 0', fontSize: 11.5, fontWeight: 600, color: A }}>{role}</p>
          </div>
          <div style={{ fontSize: 10.5, color: M, textAlign: 'right' }}>
            <div>{CONTACT.email} · {CONTACT.phoneDisplay}</div>
            <div>{t('hero.location')}</div>
          </div>
        </div>

        {/* Experience */}
        <section style={{ marginBottom: 18, flex: 1 }}>
          <h2 style={sec}>{t('experience.title')}</h2>
          {jobs.map((job, i) => (
            <div key={job.id} style={{ marginBottom: i < jobs.length - 1 ? 12 : 0, paddingBottom: i < jobs.length - 1 ? 12 : 0, borderBottom: i < jobs.length - 1 ? `1px solid ${B}` : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 12.5, fontWeight: 700, color: D }}>{job.title}</h3>
                  <p style={{ margin: '2px 0 0', fontSize: 11.5, color: M }}>
                    {job.org} — {job.location}
                  </p>
                </div>
                <span style={{ ...pill, flexShrink: 0, whiteSpace: 'nowrap' }}>{job.period}</span>
              </div>
              <ul style={{ margin: '4px 0 0', paddingLeft: 14, lineHeight: 1.5 }}>
                {job.bullets.map(b => <li key={b} style={{ marginBottom: 1.5 }}>{b}</li>)}
              </ul>
            </div>
          ))}
        </section>

        {/* Education + Interests */}
        <section>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <h2 style={sec}>{t('education.title')}</h2>
              {edu.map(e => (
                <div key={e.school} style={{ marginBottom: 7 }}>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: D }}>{e.school}</p>
                  <p style={{ margin: '1px 0 0', fontSize: 11.5, color: T }}>{e.detail}</p>
                  {e.note && (
                    <p style={{ margin: '1px 0 0', fontSize: 10.5, color: M, display: 'flex', alignItems: 'center', gap: 3 }}>
                      <MapPin style={{ width: 9, height: 9, flexShrink: 0 }} />{e.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div>
              <h2 style={sec}>{t('interests.title')}</h2>
              {interests.map(it => (
                <div key={it.icon} style={{ marginBottom: 7 }}>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: D }}>{it.title}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 11.5, color: T, lineHeight: 1.5 }}>{it.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: `1px solid ${B}`, textAlign: 'center', fontSize: 9, color: '#94a3b8' }}>
          {t('print.footer')} — 2 / 2
        </div>
      </article>
    </div>
  )
}
