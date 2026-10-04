import type {
  ContactFaqItem,
  ContactPageContent,
  FooterContent,
  FooterSocialLink,
  HomepageSectionItem,
  OfficeAddress,
  PublicHomepageSection,
  PublicSitePage,
  PublicSiteSettings,
  SiteCtaLink,
} from "@fxprime/types"
import { CONTACT_FAQ, OFFICE_ADDRESS, OFFICE_HOURS, SUPPORT_EMAIL } from "@/lib/contact-info"
import {
  filterFooterLinks,
  sanitizeBrandText,
  sanitizeSupportEmail,
} from "@/lib/site-brand"

export const DEFAULT_CONTACT_PAGE: ContactPageContent = {
  eyebrow: "Contact",
  title: "Get in touch",
  description:
    "Questions about courses and payments? Our team supports students in Bangladesh and worldwide.",
  formTitle: "Send us a message",
  formSubtitle: "Fill out the form and we'll get back to you within 24–48 hours.",
}

function buildDefaultSocialLinks(): FooterSocialLink[] {
  const links: FooterSocialLink[] = []
  const entries: [FooterSocialLink["platform"], string | undefined][] = [
    ["facebook", process.env.NEXT_PUBLIC_FACEBOOK_URL],
    ["instagram", process.env.NEXT_PUBLIC_INSTAGRAM_URL],
    ["youtube", process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://www.youtube.com"],
    ["linkedin", process.env.NEXT_PUBLIC_LINKEDIN_URL],
    ["twitter", process.env.NEXT_PUBLIC_TWITTER_URL],
  ]
  for (const [platform, href] of entries) {
    if (href?.trim()) links.push({ platform, href: href.trim() })
  }
  return links
}

export const DEFAULT_FOOTER: FooterContent = {
  brandName: "PhynixEducation",
  brandTagline:
    "English learning platform for students in Bangladesh and worldwide. Learn at your own pace with recorded classes, structured courses, and verified certificates.",
  quickLinksTitle: "Quick Links",
  companyLinksTitle: "Company",
  contactTitle: "Contact",
  socialTitle: "Connect With Us",
  quickLinks: [
    { href: "/courses", label: "All Courses" },
    { href: "/blog", label: "Blog" },
  ],
  companyLinks: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" },
  ],
  bottomLinks: [
    { href: "/privacy-policy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
  socialLinks: buildDefaultSocialLinks(),
  copyrightText: "PhynixEducation. All rights reserved.",
}

export const DEFAULT_SITE_SETTINGS: PublicSiteSettings = {
  supportEmail: SUPPORT_EMAIL,
  officeAddress: OFFICE_ADDRESS,
  officeHours: OFFICE_HOURS,
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? null,
  contactFaq: CONTACT_FAQ as ContactFaqItem[],
  contactPage: DEFAULT_CONTACT_PAGE,
  footer: DEFAULT_FOOTER,
}

export const DEFAULT_HOMEPAGE_SECTIONS: Record<string, PublicHomepageSection> = {
  hero: {
    key: "hero",
    eyebrow: "Professional English Preparation",
    title: "Master English with Expert-Led Preparation",
    description:
      "Build Listening, Reading, Writing, and Speaking skills through structured courses, live classes, and mock tests designed for serious test-takers.",
    items: [],
    ctaPrimary: { label: "Join Course", href: "/courses" },
    ctaSecondary: { label: "Browse Courses", href: "/courses" },
    metadata: null,
  },
  risk_disclaimer: {
    key: "risk_disclaimer",
    eyebrow: null,
    title: null,
    description:
      "Learning outcomes depend on individual effort and preparation. Content is for educational purposes only. PhynixEducation does not guarantee specific exam results.",
    items: [],
    ctaPrimary: null,
    ctaSecondary: null,
    metadata: { label: "Important Notice:" },
  },
  trust_bar: {
    key: "trust_bar",
    eyebrow: null,
    title: null,
    description: null,
    items: [
      { icon: "Building2", title: "UK Registered Company", description: "" },
      { icon: "Users", title: "1000+ Students", description: "", statKey: "students" },
      { icon: "LineChart", title: "Live Practice Sessions", description: "" },
      { icon: "UserCheck", title: "Expert Teaching", description: "" },
    ],
    ctaPrimary: null,
    ctaSecondary: null,
    metadata: null,
  },
  free_learning_hub: {
    key: "free_learning_hub",
    eyebrow: "Free Resources",
    title: "Free Learning Hub",
    description:
      "Everything you need to start — courses, videos, ebooks, and English tips at no cost",
    items: [
      {
        icon: "BookOpen",
        title: "Free Course",
        description: "Start learning English fundamentals at zero cost",
        href: "/courses?free=true",
      },
      {
        icon: "Youtube",
        title: "YouTube Channel",
        description: "Free English lessons, tips, and speaking practice",
        href: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://www.youtube.com",
        external: true,
      },
      {
        icon: "FileText",
        title: "Free Ebooks",
        description: "Download study guides, vocabulary lists & practice materials",
        href: "/marketplace?type=digital&free=true",
      },
      {
        icon: "TrendingUp",
        title: "English Tips & Strategies",
        description: "Writing templates, speaking topics & exam strategies explained",
        href: "/blog/category/english-tips",
      },
    ],
    ctaPrimary: null,
    ctaSecondary: null,
    metadata: null,
  },
  pricing: {
    key: "pricing",
    eyebrow: "Live sessions",
    title: "Free webinars or PRO live sessions",
    description:
      "Start with free public webinars, or upgrade to PRO for exclusive Q&A, mock tests, and live coaching sessions.",
    items: [],
    ctaPrimary: { label: "View full pricing details", href: "/pricing" },
    ctaSecondary: null,
    metadata: {
      footnote: "Payment method is selected on the checkout step after you choose to upgrade.",
    },
  },
  why_choose: {
    key: "why_choose",
    eyebrow: "Why PhynixEducation",
    title: "Why Choose Us",
    description: "Everything you need to master English with confidence",
    items: [
      {
        icon: "GraduationCap",
        title: "Complete English Learning Journey",
        description:
          "Learn from Basic to Advanced English through structured, step-by-step lessons.",
      },
      {
        icon: "ClipboardCheck",
        title: "Interactive Practice & Assessments",
        description:
          "Strengthen your skills with quizzes, exercises, and real-life practice activities.",
      },
      {
        icon: "BookOpen",
        title: "Expert-Designed Curriculum",
        description:
          "Our courses are carefully created to help you improve grammar, vocabulary, speaking, writing, and pronunciation.",
      },
      {
        icon: "Globe",
        title: "Learn Anytime, Anywhere",
        description:
          "Access your lessons 24/7 on any device and study at your own pace.",
      },
      {
        icon: "Award",
        title: "Certificate of Completion",
        description:
          "Earn a certificate after successfully completing the course to showcase your achievement.",
      },
    ],
    ctaPrimary: null,
    ctaSecondary: null,
    metadata: null,
  },
  final_cta: {
    key: "final_cta",
    eyebrow: null,
    title: "Start Your English Journey Today",
    description:
      "Join thousands of students preparing for English with live classes and a thriving study community.",
    items: [],
    ctaPrimary: { label: "Join Course", href: "/courses" },
    ctaSecondary: { label: "Browse Courses", href: "/courses" },
    metadata: null,
  },
  featured_courses: {
    key: "featured_courses",
    eyebrow: "Featured Courses",
    title: "Start Your English Journey",
    description: "English courses from beginner basics to advanced band 7+ preparation",
    items: [],
    ctaPrimary: { label: "View All Courses", href: "/courses" },
    ctaSecondary: null,
    metadata: { eyebrowVariant: "destructive" },
  },
  latest_insights: {
    key: "latest_insights",
    eyebrow: "English Insights",
    title: "Latest Insights & Blog",
    description: "Speaking topics, writing templates, vocabulary tips, and exam strategies",
    items: [],
    ctaPrimary: { label: "View All Insights", href: "/blog" },
    ctaSecondary: null,
    metadata: {
      emptyMessage:
        "New English tips coming soon. Check back for speaking topics, writing strategies, and study guides.",
    },
  },
  testimonials: {
    key: "testimonials",
    eyebrow: "Student Success",
    title: "Student Success & Reviews",
    description:
      "Video reviews, screenshot testimonials, and Trustpilot ratings from our community",
    items: [],
    ctaPrimary: null,
    ctaSecondary: null,
    metadata: { emptyMessage: "Student reviews coming soon." },
  },
}

const DEFAULT_PAGES: Record<string, Omit<PublicSitePage, "updatedAt">> = {
  about: {
    slug: "about",
    title: "About PhynixEducation",
    description:
      "Learn English at your own pace with recorded classes, structured courses, and verified certificates.",
    contentHtml: `<p>
PhynixEducation is an English learning platform built for students who want flexibility.
We create recorded classes so you can learn anytime, anywhere, and move through lessons at your own pace.
</p>
<h2>Our Mission</h2>
<p>
We make quality English education accessible to learners in Bangladesh and worldwide by combining
expert-led recorded lessons, structured course paths, practical exercises, and progress tracking.
</p>
<h2>What We Offer</h2>
<ul>
<li>Recorded classes you can watch on your schedule</li>
<li>Beginner to advanced English courses</li>
<li>Quizzes, assignments, and practice activities</li>
<li>Free learning resources including courses, ebooks, and study tips</li>
<li>Certificates of completion you can verify online</li>
</ul>
<h2>How Learning Works</h2>
<p>
Enroll in a course, watch recorded lessons at your own pace, complete practice activities,
and earn your certificate when you finish. There is no fixed class time — you decide when to study.
</p>
<h2>Contact</h2>
<p>
<a href="/contact">Send us a message</a> if you have questions about courses, enrollment, or your account.
</p>`,
    seoTitle: "About Us — PhynixEducation",
    seoDescription:
      "Learn about PhynixEducation — recorded English classes and self-paced learning for students worldwide.",
  },
  terms: {
    slug: "terms",
    title: "Terms & Conditions",
    description: "Terms of use for the PhynixEducation learning platform.",
    contentHtml: `<p>Last updated: July 2026</p>
<h2>1. Acceptance of Terms</h2>
<p>
By accessing or using PhynixEducation, you agree to these Terms &amp; Conditions. If you do not agree,
please do not use our platform.
</p>
<h2>2. Educational Content</h2>
<p>
All course materials, recorded videos, downloads, and resources are provided for educational purposes only.
PhynixEducation does not guarantee specific exam results or learning outcomes.
</p>
<h2>3. Accounts</h2>
<p>
You are responsible for keeping your login credentials secure. Sharing account access with others
may result in suspension or termination of your account.
</p>
<h2>4. Course Access</h2>
<p>
When you purchase or enroll in a course, you receive access according to the plan or product description
at the time of purchase. Recorded content is for personal use unless we explicitly grant otherwise.
</p>
<h2>5. Payments</h2>
<p>
Prices, payment methods, and available plans are shown at checkout. You agree to provide accurate
payment information and to pay all applicable fees for the products or courses you select.
</p>
<h2>6. Intellectual Property</h2>
<p>
All platform content, branding, course materials, and recordings are owned by PhynixEducation or its
licensors. You may not copy, redistribute, resell, or publicly share course content without written permission.
</p>
<h2>7. Acceptable Use</h2>
<p>
You agree not to misuse the platform, attempt unauthorized access, upload harmful content, or interfere
with other learners or platform operations.
</p>
<h2>8. Limitation of Liability</h2>
<p>
To the fullest extent permitted by law, PhynixEducation is not liable for indirect, incidental, or
consequential damages arising from your use of the platform or educational content.
</p>
<h2>9. Changes to These Terms</h2>
<p>
We may update these terms from time to time. Continued use of the platform after changes are posted
means you accept the updated terms.
</p>
<h2>10. Contact</h2>
<p>
Questions about these terms can be sent through our <a href="/contact">contact page</a>.
</p>`,
    seoTitle: "Terms & Conditions — PhynixEducation",
    seoDescription: "Terms and conditions for using PhynixEducation.",
  },
  "privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "How PhynixEducation collects, uses, and protects your information.",
    contentHtml: `<p>Last updated: July 2026</p>
<h2>1. Information We Collect</h2>
<p>
We collect information you provide when you register, enroll in courses, make purchases, or contact support.
This may include your name, email address, phone number, account details, and payment-related information
processed by our payment partners.
</p>
<h2>2. How We Use Your Information</h2>
<ul>
<li>To create and manage your account</li>
<li>To provide courses, certificates, and platform features</li>
<li>To process payments and fulfill orders</li>
<li>To send important account, course, and service updates</li>
<li>To improve our platform, content, and customer support</li>
</ul>
<h2>3. Payment Information</h2>
<p>
Payment details are handled by certified payment providers. PhynixEducation does not store full card numbers
on our servers.
</p>
<h2>4. Cookies and Similar Technologies</h2>
<p>
We use essential cookies and similar technologies to keep you signed in, remember preferences, and keep the
platform secure. You can manage cookies through your browser settings, but some features may not work if
essential cookies are disabled.
</p>
<h2>5. Data Security</h2>
<p>
We apply industry-standard safeguards to protect your information, including hashed passwords and secure
connections where appropriate.
</p>
<h2>6. Data Retention</h2>
<p>
We retain personal information for as long as needed to provide services, comply with legal obligations,
resolve disputes, and enforce our agreements.
</p>
<h2>7. Your Rights</h2>
<p>
Depending on your location, you may have the right to request access, correction, or deletion of your
personal data. Contact us through the <a href="/contact">contact page</a> to make a request.
</p>
<h2>8. Third-Party Services</h2>
<p>
We may use trusted third-party providers for hosting, analytics, email delivery, and payment processing.
Those providers process data according to their own policies and our agreements with them.
</p>
<h2>9. Children's Privacy</h2>
<p>
PhynixEducation is intended for learners who can lawfully enter into an agreement or use the platform with
appropriate guardian consent where required by law.
</p>
<h2>10. Contact</h2>
<p>
Privacy questions can be sent through our <a href="/contact">contact page</a>.
</p>`,
    seoTitle: "Privacy Policy — PhynixEducation",
    seoDescription: "Privacy policy for PhynixEducation learners and visitors.",
  },
}

function isLegacyBrandText(value: string | null | undefined): boolean {
  if (!value?.trim()) return true
  return /fx\s*prime|fxprime|forex|live classes?|live sessions?/i.test(value)
}

function sanitizeSitePage(page: PublicSitePage, fallback: Omit<PublicSitePage, "updatedAt">): PublicSitePage {
  const contentHtml = sanitizeBrandText(page.contentHtml)
  const useFallbackContent =
    !contentHtml.trim() ||
    contentHtml.length < 120 ||
    /live classes?, mock tests?, and mentor support/i.test(contentHtml)

  return {
    ...page,
    title: isLegacyBrandText(page.title) ? fallback.title : sanitizeBrandText(page.title) || fallback.title,
    description: page.description
      ? sanitizeBrandText(page.description)
      : fallback.description,
    contentHtml: useFallbackContent ? fallback.contentHtml : contentHtml,
    seoTitle: sanitizeBrandText(page.seoTitle) || fallback.seoTitle,
    seoDescription: page.seoDescription
      ? sanitizeBrandText(page.seoDescription)
      : fallback.seoDescription,
  }
}

export function mergeFooter(data: FooterContent | null | undefined): FooterContent {
  if (!data) return DEFAULT_FOOTER

  const brandName = sanitizeBrandText(data.brandName)
  const brandTagline = sanitizeBrandText(data.brandTagline)
  const copyrightText = sanitizeBrandText(data.copyrightText)

  return {
    brandName: !brandName || /fx\s*prime|fxprime/i.test(brandName) ? DEFAULT_FOOTER.brandName : brandName,
    brandTagline:
      !brandTagline || /forex|live classes?/i.test(brandTagline)
        ? DEFAULT_FOOTER.brandTagline
        : brandTagline,
    quickLinksTitle: data.quickLinksTitle?.trim() || DEFAULT_FOOTER.quickLinksTitle,
    companyLinksTitle: data.companyLinksTitle?.trim() || DEFAULT_FOOTER.companyLinksTitle,
    contactTitle: data.contactTitle?.trim() || DEFAULT_FOOTER.contactTitle,
    socialTitle: data.socialTitle?.trim() || DEFAULT_FOOTER.socialTitle,
    quickLinks: filterFooterLinks(data.quickLinks?.length ? data.quickLinks : DEFAULT_FOOTER.quickLinks),
    companyLinks: filterFooterLinks(
      data.companyLinks?.length ? data.companyLinks : DEFAULT_FOOTER.companyLinks
    ),
    bottomLinks: filterFooterLinks(
      data.bottomLinks?.length ? data.bottomLinks : DEFAULT_FOOTER.bottomLinks
    ),
    socialLinks: data.socialLinks?.length ? data.socialLinks : DEFAULT_FOOTER.socialLinks,
    copyrightText:
      !copyrightText || /fx\s*prime|fxprime/i.test(copyrightText)
        ? DEFAULT_FOOTER.copyrightText
        : copyrightText,
  }
}

export function mergeSiteSettings(data: PublicSiteSettings | null | undefined): PublicSiteSettings {
  if (!data) return DEFAULT_SITE_SETTINGS
  return {
    supportEmail: sanitizeSupportEmail(data.supportEmail, DEFAULT_SITE_SETTINGS.supportEmail),
    officeAddress: {
      line1: data.officeAddress?.line1 || DEFAULT_SITE_SETTINGS.officeAddress.line1,
      line2: data.officeAddress?.line2 || DEFAULT_SITE_SETTINGS.officeAddress.line2,
    },
    officeHours: data.officeHours || DEFAULT_SITE_SETTINGS.officeHours,
    whatsappNumber: data.whatsappNumber ?? DEFAULT_SITE_SETTINGS.whatsappNumber,
    contactFaq: data.contactFaq?.length ? data.contactFaq : DEFAULT_SITE_SETTINGS.contactFaq,
    contactPage: {
      eyebrow: data.contactPage?.eyebrow || DEFAULT_SITE_SETTINGS.contactPage.eyebrow,
      title: data.contactPage?.title || DEFAULT_SITE_SETTINGS.contactPage.title,
      description: data.contactPage?.description || DEFAULT_SITE_SETTINGS.contactPage.description,
      formTitle: data.contactPage?.formTitle || DEFAULT_SITE_SETTINGS.contactPage.formTitle,
      formSubtitle:
        data.contactPage?.formSubtitle || DEFAULT_SITE_SETTINGS.contactPage.formSubtitle,
    },
    footer: mergeFooter(data.footer),
  }
}

export function mergeHomepageSection(
  key: string,
  section: PublicHomepageSection | null | undefined
): PublicHomepageSection {
  const fallback = DEFAULT_HOMEPAGE_SECTIONS[key]
  if (!section && !fallback) {
    return {
      key,
      eyebrow: null,
      title: null,
      description: null,
      items: [],
      ctaPrimary: null,
      ctaSecondary: null,
      metadata: null,
    }
  }
  if (!section) return fallback
  if (!fallback) return section
  return {
    key,
    eyebrow: section.eyebrow ?? fallback.eyebrow,
    title: section.title ?? fallback.title,
    description: section.description ?? fallback.description,
    items: section.items?.length ? section.items : fallback.items,
    ctaPrimary: section.ctaPrimary ?? fallback.ctaPrimary,
    ctaSecondary: section.ctaSecondary ?? fallback.ctaSecondary,
    metadata: section.metadata ?? fallback.metadata,
  }
}

export function mergeSitePage(
  slug: string,
  page: PublicSitePage | null | undefined
): PublicSitePage | null {
  const fallback = DEFAULT_PAGES[slug]
  if (!page && !fallback) return null
  if (!page) {
    return { ...fallback!, updatedAt: new Date(0).toISOString() }
  }
  if (!fallback) {
    return {
      ...page,
      title: sanitizeBrandText(page.title) || page.title,
      description: page.description ? sanitizeBrandText(page.description) : page.description,
      contentHtml: sanitizeBrandText(page.contentHtml) || page.contentHtml,
      seoTitle: page.seoTitle ? sanitizeBrandText(page.seoTitle) : page.seoTitle,
      seoDescription: page.seoDescription
        ? sanitizeBrandText(page.seoDescription)
        : page.seoDescription,
    }
  }
  return sanitizeSitePage(page, fallback)
}

export type { OfficeAddress, ContactFaqItem, ContactPageContent, SiteCtaLink, FooterContent, FooterSocialLink, HomepageSectionItem }
