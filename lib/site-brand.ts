/** Strip legacy FX Prime branding from CMS text fields. */
export function sanitizeBrandText(value: string | null | undefined): string {
  if (!value?.trim()) return ""
  return value
    .replace(/FX\s*Prime\s*Academy/gi, "PhynixEducation")
    .replace(/FXPrime/gi, "PhynixEducation")
    .replace(/fxprimeacademy\.com/gi, "support@phynixeducation.com")
    .replace(/support@fxprimeacademy\.com/gi, "support@phynixeducation.com")
}

export const FOOTER_EXCLUDED_HREFS = new Set(["/live", "/refund-policy", "/cookies"])

export function filterFooterLinks<T extends { href: string }>(links: T[]): T[] {
  return links.filter((link) => !FOOTER_EXCLUDED_HREFS.has(link.href))
}

export function sanitizeSupportEmail(email: string | null | undefined, fallback: string): string {
  const normalized = sanitizeBrandText(email).trim()
  if (!normalized || /fxprime/i.test(normalized)) return fallback
  return normalized
}
