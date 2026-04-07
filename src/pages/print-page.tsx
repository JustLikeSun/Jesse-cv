import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Download, Globe2, Loader2, Mail, MapPin, Phone } from 'lucide-react'

import { Headshot } from '@/components/headshot'
import { useAppParams } from '@/contexts/app-params'
import { CONTACT } from '@/lib/contact'

type SkillGroup = { title: string; items: string[] }
type ExperienceItem = { id: string; title: string; org: string; location: string; period: string; bullets: string[] }
type EducationItem = { school: string; detail: string; note: string }
type LangItem = { name: string; level: string }

const A = '#7c3aed'
const ABG = '#7c3aed0d'
const M = '#64748b'
const B = '#e2e8f0'

const sec: React.CSSProperties = {
  margin: '0 0 6px',
  fontFamily: "'Outfit',system-ui,sans-serif",
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  color: '#0f172a',
  paddingBottom: '4px',
  borderBottom: `1.5px solid ${A}`,
}

export function PrintPage() {
  const { t, i18n } = useTranslation()
  const { searchString } = useAppParams()
  const ref = useRef<HTMLElement>(null)
  const [busy, setBusy] = useState(false)

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
  const interests = t('interests.items', { returnObjects: true }) as { icon: string; title: string; description: string }[]

  const download = useCallback(async () => {
    if (!ref.current || busy) return
    setBusy(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default
      await html2pdf().set({
        margin: [6, 0, 6, 0],
        filename: `Jesse_Tremblay_CV${i18n.language === 'en' ? '_EN' : ''}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' },
      }).from(ref.current).save()
    } finally {
      setBusy(false)
    }
  }, [busy, i18n.language])

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      {/* Toolbar */}
      <div className="no-print" style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '10px 16px', background: '#fff', borderBottom: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <Link
          to={searchString ? `/${searchString}` : '/'}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', fontSize: 13, fontWeight: 500, color: '#334155', background: '#fff', border: '1px solid #d1d5db', borderRadius: 8, textDecoration: 'none', fontFamily: 'system-ui,sans-serif' }}
        >
          <ArrowLeft style={{ width: 16, height: 16 }} />
          {i18n.language === 'fr' ? 'Retour au site' : 'Back to site'}
        </Link>
        <button
          type="button"
          onClick={download}
          disabled={busy}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', fontSize: 13, fontWeight: 600, color: '#fff', background: busy ? '#8b5cf6' : A, border: 'none', borderRadius: 8, cursor: busy ? 'wait' : 'pointer', fontFamily: 'system-ui,sans-serif', opacity: busy ? 0.7 : 1 }}
        >
          {busy ? <Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} /> : <Download style={{ width: 16, height: 16 }} />}
          {busy ? (i18n.language === 'fr' ? 'Génération...' : 'Generating...') : t('hero.ctaPdf')}
        </button>
      </div>

      {/* CV — forced light, fits one letter page */}
      <article
        ref={ref}
        style={{
          maxWidth: '8.5in',
          margin: '20px auto',
          background: '#fff',
          color: '#1e293b',
          fontFamily: "'Outfit','Geist Variable',system-ui,-apple-system,sans-serif",
          fontSize: '10px',
          lineHeight: 1.45,
          padding: '22px 30px 18px',
          borderRadius: 8,
          boxShadow: '0 1px 3px rgba(0,0,0,0.08),0 8px 32px rgba(0,0,0,0.05)',
        }}
        className="print:m-0 print:max-w-none print:rounded-none print:shadow-none print:p-[16px_24px_12px]"
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, marginBottom: 14, paddingBottom: 12, borderBottom: `2px solid ${A}` }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: '#0f172a' }}>Jesse Tremblay</h1>
            <p style={{ margin: '2px 0 0', fontSize: 12, fontWeight: 600, color: A }}>{role}</p>
            <p style={{ margin: '5px 0 0', fontSize: 10, color: M }}>
              {t('hero.location')} · {t('hero.born')} · {t('hero.mobile')}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 6, fontSize: 10 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                <Mail style={{ width: 10, height: 10, color: A }} />{CONTACT.email}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                <Phone style={{ width: 10, height: 10, color: A }} />{CONTACT.phoneDisplay}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                <Globe2 style={{ width: 10, height: 10, color: A }} />{langs.map(l => l.name).join(' / ')}
              </span>
            </div>
            <span style={{ display: 'inline-block', marginTop: 5, fontSize: 9, fontWeight: 700, color: '#059669', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 999, padding: '1px 8px' }}>
              {t('hero.available')}
            </span>
          </div>
          <div style={{ width: 72, height: 72, borderRadius: 10, overflow: 'hidden', flexShrink: 0, border: `1.5px solid ${B}` }}>
            <Headshot className="size-full max-h-none max-w-none" name="Jesse Tremblay" />
          </div>
        </div>

        {/* Profile */}
        <div style={{ marginBottom: 10 }}>
          <h2 style={sec}>{t('profile.title')}</h2>
          {paras.map(p => (
            <p key={p.slice(0, 30)} style={{ margin: '0 0 3px', color: '#475569', fontSize: 10, lineHeight: 1.5 }}>{p}</p>
          ))}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 5 }}>
            {traits.map(t => (
              <span key={t} style={{ fontSize: 8.5, fontWeight: 600, color: A, background: ABG, border: `1px solid ${A}22`, borderRadius: 999, padding: '0 7px' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div style={{ marginBottom: 10 }}>
          <h2 style={sec}>{t('skills.title')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px' }}>
            {groups.map(g => (
              <div key={g.title}>
                <h3 style={{ margin: '0 0 2px', fontSize: 10, fontWeight: 600, color: '#0f172a' }}>{g.title}</h3>
                <ul style={{ margin: 0, paddingLeft: 12, color: '#475569', fontSize: 9.5, lineHeight: 1.45 }}>
                  {g.items.map(i => <li key={i}>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div style={{ marginBottom: 10 }}>
          <h2 style={sec}>{t('experience.title')}</h2>
          {jobs.map((job, i) => (
            <div key={job.id} style={{ marginBottom: i < jobs.length - 1 ? 8 : 0, paddingBottom: i < jobs.length - 1 ? 8 : 0, borderBottom: i < jobs.length - 1 ? `1px solid ${B}` : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 10.5, fontWeight: 600, color: '#0f172a' }}>{job.title}</h3>
                  <p style={{ margin: '1px 0 0', fontSize: 9.5, color: M, display: 'flex', alignItems: 'center', gap: 3 }}>
                    <MapPin style={{ width: 9, height: 9, color: A, opacity: 0.6, flexShrink: 0 }} />
                    {job.org} — {job.location}
                  </p>
                </div>
                <span style={{ fontSize: 9, fontWeight: 600, color: A, background: ABG, border: `1px solid ${A}22`, borderRadius: 999, padding: '1px 8px', whiteSpace: 'nowrap', flexShrink: 0 }}>{job.period}</span>
              </div>
              <ul style={{ margin: '3px 0 0', paddingLeft: 12, color: '#475569', fontSize: 9.5, lineHeight: 1.45 }}>
                {job.bullets.map(b => <li key={b}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>

        {/* Education + Interests */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 10 }}>
          <div>
            <h2 style={sec}>{t('education.title')}</h2>
            {edu.map(e => (
              <div key={e.school} style={{ marginBottom: 5 }}>
                <p style={{ margin: 0, fontSize: 10, fontWeight: 600, color: '#0f172a' }}>{e.school}</p>
                <p style={{ margin: 0, fontSize: 9.5, color: '#475569' }}>{e.detail}</p>
                {e.note && <p style={{ margin: 0, fontSize: 9, color: M }}>{e.note}</p>}
              </div>
            ))}
          </div>
          <div>
            <h2 style={sec}>{t('interests.title')}</h2>
            {interests.map(it => (
              <div key={it.icon} style={{ marginBottom: 4 }}>
                <p style={{ margin: 0, fontSize: 10, fontWeight: 600, color: '#0f172a' }}>{it.title}</p>
                <p style={{ margin: 0, fontSize: 9.5, color: '#475569', lineHeight: 1.4 }}>{it.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ paddingTop: 6, borderTop: `1px solid ${B}`, textAlign: 'center', fontSize: 8, color: '#94a3b8' }}>
          {t('print.footer')}
        </div>
      </article>
    </div>
  )
}
