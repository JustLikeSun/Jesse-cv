export const VARIANTS = ['general', 'it'] as const
export type ResumeVariant = (typeof VARIANTS)[number]

/**
 * CV version is controlled only via URL, e.g. `?v=gen` or `?v=tech`.
 * Legacy `?variant=it|general` is still accepted for old bookmarks.
 */
export function resolveResumeVariant(params: URLSearchParams): ResumeVariant {
  const v = params.get('v')?.toLowerCase().trim()
  if (v === 'tech') return 'it'
  if (v === 'gen') return 'general'

  const legacy = params.get('variant')
  if (legacy === 'it') return 'it'
  if (legacy === 'general') return 'general'

  return 'general'
}
