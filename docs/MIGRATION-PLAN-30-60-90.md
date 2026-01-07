# WFI Headless CMS Migration Plan
## 30-60-90 Day Roadmap

**Document Version:** 1.1  
**Date:** January 7, 2026  
**Project:** Migration to Headless WordPress + Next.js Architecture  
**Status:** In Progress (~25% Complete)

---

## Executive Summary

This document outlines a structured 90-day plan to migrate the Workforce Institute website from its current architecture to a modern headless CMS setup. The new architecture combines WordPress with Divi page builder (for content management) and Next.js (for the public-facing website), delivering improved performance, scalability, and editorial flexibility.

### Key Benefits
- **50-70% faster page loads** through static generation and CDN delivery
- **Improved SEO rankings** with optimized Core Web Vitals
- **Easier content management** for marketing team using familiar Divi interface
- **Future-proof architecture** that scales with business growth
- **Enhanced security** by separating public site from admin backend

---

## Visual Roadmap Summary

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              90-DAY ROADMAP                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  DAY 1 ──────────────── DAY 30 ──────────────── DAY 60 ──────────────── DAY 90
│    │                      │                       │                       │
│    ▼                      ▼                       ▼                       ▼
│ ┌──────────┐         ┌──────────┐          ┌──────────┐          ┌──────────┐
│ │ PHASE 1  │         │ INTERNAL │          │ PHASE 2  │          │  GO LIVE │
│ │Foundation│    →    │  REVIEW  │     →    │ Advanced │     →    │  LAUNCH  │
│ │& Content │         │   DEMO   │          │ Features │          │          │
│ └──────────┘         └──────────┘          └──────────┘          └──────────┘
│                                                                             │
│ ✓ All pages built    ✓ Stakeholder        ✓ Divi integration    ✓ Production
│ ✓ Content migrated     feedback           ✓ SEO & Analytics     ✓ Monitoring
│ ✓ Navigation done    ✓ Bug fixes          ✓ Forms working       ✓ Handover
│ ✓ Mobile ready                            ✓ Team trained                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Key Milestone Dates

| Milestone | Target Date | Description |
|-----------|-------------|-------------|
| Content Migration Complete | Day 7 | All Programs, Testimonials, Partners in WordPress |
| All Pages Built | Day 15 | Events, About, Contact, Legal pages ready |
| Internal Demo | Day 30 | Full walkthrough with stakeholders |
| Divi Integration | Day 45 | Marketing can design pages in Divi |
| Forms & Analytics | Day 50 | All lead capture working, tracking active |
| Training Complete | Day 55 | Content team can operate independently |
| Go/No-Go Decision | Day 60 | Stakeholder approval for launch |
| Soft Launch | Day 70 | Limited traffic on new site |
| Full Launch | Day 80 | All traffic migrated |
| Project Handover | Day 90 | Documentation complete, project closed |

---

## Current State (Completed)

| Item | Status |
|------|--------|
| Next.js frontend framework setup | ✅ Complete |
| WordPress backend with WPGraphQL | ✅ Complete |
| GraphQL API integration | ✅ Complete |
| Custom Post Types (Programs, Testimonials, Partners, Events) | ✅ Complete |
| Homepage sections connected to WordPress | ✅ Partial (4 of 10 sections) |
| Programs listing and detail pages | ✅ Complete |
| Blog listing and detail pages | ✅ Complete |
| Header navigation from WordPress | ✅ Complete |
| Basic content migration infrastructure | ✅ Complete |

**Current Progress: ~25% of total project**

---

## Content Inventory (What Needs Migration)

### Pages to Create/Migrate

| Page | Priority | Status | Notes |
|------|----------|--------|-------|
| Homepage | Critical | ✅ Built | 6 sections still hardcoded |
| Programs Listing (/programs) | Critical | ✅ Built | Fetches from WordPress |
| Program Detail (/programs/[slug]) | Critical | ✅ Built | Dynamic routing ready |
| Blog Listing (/blog) | Critical | ✅ Built | Fetches from WordPress |
| Blog Detail (/blog/[slug]) | Critical | ✅ Built | Dynamic routing ready |
| Events/Webinars (/events) | High | ⬜ Pending | CPT exists, page needed |
| Event Detail (/events/[slug]) | High | ⬜ Pending | CPT exists, page needed |
| About Us (/about) | High | ⬜ Pending | Header links to this |
| Contact (/contact) | High | ⬜ Pending | Forms integration needed |
| Privacy Policy (/privacy) | Medium | ⬜ Pending | Footer links to this |
| Terms of Service (/terms) | Medium | ⬜ Pending | Footer links to this |
| FAQ (/faq) | Medium | ⬜ Pending | Good for SEO |
| Cookie Policy (/cookies) | Low | ⬜ Pending | Footer links to this |

### Homepage Sections Status

| Section | WordPress Integrated | Notes |
|---------|---------------------|-------|
| HeroSection | ❌ Hardcoded | Needs ACF Options Page |
| PartnersSection | ✅ Dynamic | Fetches from Partners CPT |
| FeaturedProgramSection | ❌ Hardcoded | Text content hardcoded |
| ProgramsSection | ✅ Dynamic | Fetches from Programs CPT |
| AboutSection (Testimonials) | ✅ Dynamic | Fetches from Testimonials CPT |
| IntegrationsSection | ❌ Hardcoded | Still shows "Jasper" placeholder text |
| AIPlatformSection | ❌ Hardcoded | Still shows "Jasper" placeholder text |
| StatsSection | ❌ Hardcoded | "12M Resumes" etc. needs ACF |
| CTASection | ❌ Hardcoded | CTA text hardcoded |
| BlogSection | ✅ Dynamic | Fetches latest posts |

### Content to Populate in WordPress

| Content Type | Quantity Needed | Current | Notes |
|--------------|-----------------|---------|-------|
| Programs | 5-10 | Testing data | Core offerings |
| Blog Posts | 10-20 | Testing data | Migrate existing content |
| Testimonials | 15-20 | Testing data | Grouped by program |
| Partners | 6-10 | Testing data | University/corporate logos |
| Events/Webinars | 3-5 | None | Upcoming events |
| Team Members | 5-10 | None | For About page (optional) |

### Forms Requiring Backend Integration

| Form | Location | Current Status | Backend Needed |
|------|----------|----------------|----------------|
| "Get Started" Modal | Header button | Console.log only | Email/CRM integration |
| "Register Now" | Hero section | Console.log only | Email/CRM integration |
| Contact Form | /contact page | Not built | Contact Form 7 or CRM |
| Newsletter Signup | Footer (planned) | Not built | Email marketing platform |
| Program Inquiry | Program pages | Not built | Lead capture |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER / VISITOR                              │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    CDN (Vercel Edge Network)                        │
│              • Global distribution • Caching • SSL                  │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      NEXT.JS FRONTEND                               │
│                   (workforceinstitute.io)                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                 │
│  │   Static    │  │   Server    │  │   Dynamic   │                 │
│  │   Pages     │  │   Rendered  │  │   Features  │                 │
│  └─────────────┘  └─────────────┘  └─────────────┘                 │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                          GraphQL API Calls
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    WORDPRESS BACKEND                                │
│               (backend.workforceinstitute.io)                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                 │
│  │    Divi     │  │  WPGraphQL  │  │     ACF     │                 │
│  │   Builder   │  │     API     │  │    Fields   │                 │
│  └─────────────┘  └─────────────┘  └─────────────┘                 │
│                           │                                         │
│              ┌────────────┼────────────┐                           │
│              ▼            ▼            ▼                           │
│         ┌────────┐   ┌────────┐   ┌────────┐                       │
│         │ MySQL  │   │ Redis  │   │ Media  │                       │
│         │   DB   │   │ Cache  │   │Storage │                       │
│         └────────┘   └────────┘   └────────┘                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

# 📅 30-DAY PLAN (Days 1-30)
## Foundation & Core Content Migration

### Goal
Complete core infrastructure, migrate essential content, and prepare for internal testing.

---

### Week 1: Content Structure & Data Migration

| Day | Task | Owner | Deliverable |
|-----|------|-------|-------------|
| 1-2 | Finalize content structure in WordPress | Content Team | Documented content types |
| 1-2 | Create all ACF field groups for custom content | Dev Team | ACF configurations |
| 3-4 | Migrate all Programs content (5-10 programs) | Content Team | Programs in WordPress |
| 5 | Add Testimonials content (10-15 testimonials) | Content Team | Testimonials in WordPress |
| 5 | Add Partner logos and information | Content Team | Partners in WordPress |

**Milestone:** All core content types populated in WordPress

---

### Week 2: Page Development & Styling

| Day | Task | Owner | Deliverable |
|-----|------|-------|-------------|
| 6-7 | Create Events/Webinars pages | Dev Team | /events, /events/[slug] pages |
| 8-9 | Create About Us page (WordPress-managed) | Dev Team | /about page |
| 9 | Create Privacy Policy page | Dev Team | /privacy page |
| 9 | Create Terms of Service page | Dev Team | /terms page |
| 10 | Create Contact page with form | Dev Team | /contact page |
| 10 | Style consistency review across all pages | Dev Team | Consistent UI/UX |

**Milestone:** All main pages functional

---

### Week 3: Navigation & Global Elements

| Day | Task | Owner | Deliverable |
|-----|------|-------|-------------|
| 11 | Implement mobile hamburger menu | Dev Team | Mobile navigation |
| 11-12 | Create footer menus in WordPress (Programs, Company, Resources) | Content Team | Footer menu structure |
| 12 | Connect footer to WordPress menus and social links | Dev Team | Dynamic footer |
| 13 | Create Global Settings in WordPress (ACF Options) | Dev Team | Editable stats, CTAs, contact info |
| 14 | Connect Hero, Stats, CTA sections to ACF Options | Dev Team | Dynamic homepage sections |
| 15 | Implement breadcrumbs and internal linking | Dev Team | Improved navigation |

**Milestone:** Full site navigation working

**Footer Elements to Make Dynamic:**
- Company description text
- Footer navigation menus (3 columns)
- Social media links (Facebook, Twitter, LinkedIn, Instagram)
- Copyright text with dynamic year
- Legal links (Privacy, Terms, Cookies)

---

### Week 4: Testing & Optimization

| Day | Task | Owner | Deliverable |
|-----|------|-------|-------------|
| 16-17 | Mobile responsiveness testing | QA Team | Bug list & fixes |
| 18-19 | Cross-browser testing (Chrome, Safari, Firefox, Edge) | QA Team | Compatibility report |
| 20 | Performance optimization (images, lazy loading) | Dev Team | <3s page load |
| 21 | Internal team review and feedback collection | All Teams | Feedback document |

**Milestone:** Internal staging site ready for review

---

### 30-Day Deliverables Summary

| Deliverable | Status |
|-------------|--------|
| WordPress content fully populated (Programs, Testimonials, Partners, Events) | ⬜ |
| All main pages developed (/events, /about, /contact, /privacy, /terms) | ⬜ |
| Navigation connected to WordPress menus (Header + Footer) | ⬜ |
| Mobile hamburger menu functional | ⬜ |
| Global settings editable from WordPress (Hero, Stats, CTA) | ⬜ |
| Footer fully dynamic (menus, social links, copyright) | ⬜ |
| Mobile responsive across devices | ⬜ |
| Internal staging environment ready | ⬜ |
| Performance baseline established | ⬜ |

### Success Metrics (30 Days)
- [ ] 100% of core content migrated to WordPress
- [ ] All pages load under 3 seconds
- [ ] Zero critical bugs in internal testing
- [ ] Marketing team can edit content independently
- [ ] All homepage sections editable from WordPress
- [ ] Footer content manageable without code changes

---

# 📅 60-DAY PLAN (Days 31-60)
## Advanced Features & Editorial Workflow

### Goal
Implement advanced features, establish editorial workflows, and begin stakeholder testing.

---

### Week 5: Divi Content Integration

| Day | Task | Owner | Deliverable |
|-----|------|-------|-------------|
| 22-24 | Implement Divi-rendered content display | Dev Team | Divi HTML rendering |
| 25-26 | Create Divi CSS compatibility layer | Dev Team | Consistent styling |
| 27-28 | Test Divi page editing → Frontend display flow | Dev + Content | Working workflow |

**Milestone:** Marketing can design pages in Divi, see results on frontend

---

### Week 6: SEO & Analytics

| Day | Task | Owner | Deliverable |
|-----|------|-------|-------------|
| 29-30 | Install and configure Yoast SEO | Dev Team | SEO plugin active |
| 31-32 | Integrate Yoast data with Next.js (meta, OG tags) | Dev Team | SEO metadata working |
| 33-34 | Set up Google Analytics 4 integration | Dev Team | Analytics tracking |
| 35 | Create XML sitemap generation | Dev Team | Sitemap.xml |

**Milestone:** Full SEO infrastructure in place

---

### Week 7: Forms & Integrations

| Day | Task | Owner | Deliverable |
|-----|------|-------|-------------|
| 36-37 | Contact form with email notifications | Dev Team | Working contact form |
| 37 | "Get Started" modal form backend integration | Dev Team | Lead capture from header/hero |
| 38-39 | Newsletter signup integration (Mailchimp/HubSpot) | Dev Team | Email capture working |
| 40-41 | Program registration/inquiry forms | Dev Team | Lead capture forms |
| 42 | CRM integration (if applicable) | Dev Team | Leads flow to CRM |

**Milestone:** All forms functional and connected

**Forms Integration Details:**
| Form | Recommended Solution | Notes |
|------|---------------------|-------|
| Contact Form | Contact Form 7 + WP REST API | Or Formspree for simpler setup |
| Newsletter | Mailchimp or HubSpot | Depends on existing marketing stack |
| Get Started Modal | Same as Newsletter | Single email capture |
| Program Inquiry | Contact Form 7 with program field | Routes to appropriate team |

---

### Week 7.5: Search & Site-wide Features

| Day | Task | Owner | Deliverable |
|-----|------|-------|-------------|
| 43 | Implement site search functionality | Dev Team | Search bar in header |
| 43 | Search results page | Dev Team | /search page |
| 44 | 404 error page design | Dev Team | Custom 404 page |
| 44 | Loading states and skeleton screens | Dev Team | Improved UX |

**Milestone:** Enhanced user experience features

---

### Week 8: Legal Compliance & Accessibility

| Day | Task | Owner | Deliverable |
|-----|------|-------|-------------|
| 45 | Cookie consent banner implementation | Dev Team | GDPR-compliant consent |
| 45-46 | Accessibility audit (WCAG 2.1 AA) | QA Team | Accessibility report |
| 46 | Fix critical accessibility issues | Dev Team | WCAG compliance |
| 47 | Schema markup for SEO (Organization, Programs) | Dev Team | Structured data |

**Milestone:** Legal and accessibility compliance

---

### Week 8.5: Editorial Training & Documentation

| Day | Task | Owner | Deliverable |
|-----|------|-------|-------------|
| 48 | Create WordPress editor documentation | Dev Team | User guide PDF |
| 49 | Record video tutorials for common tasks | Dev Team | Training videos |
| 49 | Conduct live training session for content team | Dev + Content | Recorded session |
| 50 | Stakeholder review and feedback | All Teams | Feedback compiled |

**Milestone:** Content team independently managing content

**Training Topics to Cover:**
1. Adding/editing Programs in WordPress
2. Adding/editing Blog posts with featured images
3. Managing Testimonials and assigning to programs
4. Uploading Partner logos
5. Creating Events/Webinars
6. Updating homepage stats and CTAs (ACF Options)
7. Managing menus (Header and Footer)
8. Using Divi for page design (if applicable)

---

### 60-Day Deliverables Summary

| Deliverable | Status |
|-------------|--------|
| Divi content rendering on frontend | ⬜ |
| SEO optimization complete (Yoast integration) | ⬜ |
| Google Analytics 4 tracking active | ⬜ |
| All forms functional (Contact, Newsletter, Get Started) | ⬜ |
| Site search functionality working | ⬜ |
| Cookie consent banner live | ⬜ |
| WCAG 2.1 AA accessibility compliance | ⬜ |
| Editorial team trained with documentation | ⬜ |
| Training videos recorded | ⬜ |
| Stakeholder approval received | ⬜ |

### Success Metrics (60 Days)
- [ ] Lighthouse SEO score > 90
- [ ] Lighthouse Performance score > 80
- [ ] Lighthouse Accessibility score > 90
- [ ] Content team can publish without developer help
- [ ] All forms capturing leads correctly
- [ ] Search returns relevant results
- [ ] Stakeholder sign-off on design and functionality

---

# 📅 90-DAY PLAN (Days 61-90)
## Launch Preparation & Go-Live

### Goal
Complete final testing, execute launch, and establish post-launch support.

---

### Week 9: Performance & Security Hardening

| Day | Task | Owner | Deliverable |
|-----|------|-------|-------------|
| 50-51 | Image optimization and CDN configuration | Dev Team | Optimized assets |
| 52-53 | Security headers and HTTPS enforcement | Dev Team | Security audit pass |
| 54-55 | Caching strategy implementation (ISR, Redis) | Dev Team | Caching working |
| 56 | Load testing and stress testing | Dev Team | Performance report |

**Milestone:** Production-ready performance

---

### Week 10: Pre-Launch Checklist

| Day | Task | Owner | Deliverable |
|-----|------|-------|-------------|
| 57-58 | Full QA regression testing | QA Team | Test report |
| 59-60 | URL redirect mapping (old → new) | Dev Team | Redirect rules (next.config.js) |
| 61 | DNS configuration planning | Dev Team | DNS cutover plan |
| 61-62 | 404 page and error handling | Dev Team | Custom error pages |
| 63 | Backup current site and database | Dev Team | Full backup stored |
| 63 | Rollback plan documentation | Dev Team | Disaster recovery plan |

**Milestone:** Launch checklist 100% complete

**Pre-Launch Checklist:**
- [ ] All content migrated and verified
- [ ] 301 redirects tested for all old URLs
- [ ] SSL certificate configured
- [ ] DNS TTL reduced (24-48 hours before launch)
- [ ] Analytics tracking verified
- [ ] All forms tested end-to-end
- [ ] Mobile testing on real devices
- [ ] Social media sharing previews working
- [ ] Favicon and app icons configured
- [ ] robots.txt and sitemap.xml ready
- [ ] Backup of old site stored

---

### Week 11: Soft Launch & Monitoring

| Day | Task | Owner | Deliverable |
|-----|------|-------|-------------|
| 64-65 | Deploy to production (limited traffic) | Dev Team | Live on production |
| 66-67 | Monitor performance and errors | Dev Team | Monitoring dashboard |
| 68-69 | Fix any production issues | Dev Team | Hotfixes deployed |
| 70 | Gradual traffic increase | Dev Team | Full traffic on new site |

**Milestone:** Site live with full traffic

---

### Week 12: Post-Launch & Handover

| Day | Task | Owner | Deliverable |
|-----|------|-------|-------------|
| 71-73 | Post-launch monitoring and optimization | Dev Team | Performance tuning |
| 74-75 | Team training refresh (if needed) | Dev Team | Additional training |
| 76-77 | Create maintenance documentation | Dev Team | Runbook |
| 78-80 | Project handover and retrospective | All Teams | Project complete |

**Milestone:** Project successfully completed

---

### 90-Day Deliverables Summary

| Deliverable | Status |
|-------------|--------|
| Production deployment complete | ⬜ |
| All redirects in place | ⬜ |
| Performance optimized (<2s load time) | ⬜ |
| Security audit passed | ⬜ |
| Monitoring and alerting active | ⬜ |
| Team fully trained | ⬜ |
| Documentation complete | ⬜ |
| Old site decommissioned | ⬜ |

### Success Metrics (90 Days)
- [ ] Site live with zero critical issues
- [ ] Page load time < 2 seconds
- [ ] Lighthouse score > 90 across all metrics
- [ ] 100% URL redirects working
- [ ] Zero SEO ranking drops (monitor for 30 days post-launch)
- [ ] Content team operating independently

---

# Risk Assessment & Mitigation

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| Divi HTML complexity breaks on frontend | Medium | High | Pre-process HTML, create sanitization layer, thorough testing |
| SEO ranking drop after migration | Medium | High | Implement 301 redirects, maintain URL structure, monitor closely |
| Content team resistance to new workflow | Low | Medium | Provide training, documentation, and ongoing support |
| Performance issues under load | Low | High | Load testing before launch, CDN caching, monitoring |
| Data loss during migration | Low | Critical | Multiple backups, staged migration, validation checks |
| Timeline delays | Medium | Medium | Buffer time built in, weekly progress reviews |
| Form submissions not reaching team | Medium | High | Test all forms thoroughly, set up email notifications and fallbacks |
| Third-party integration failures | Medium | Medium | Have backup solutions identified, test in staging first |
| Mobile experience issues | Medium | High | Test on multiple real devices, not just browser dev tools |
| DNS propagation delays | Low | Medium | Reduce TTL 48 hours before launch, plan for up to 24hr propagation |
| GraphQL API rate limiting | Low | Medium | Implement caching, use ISR effectively |

---

# Third-Party Integrations Required

### Confirmed Integrations

| Service | Purpose | Priority | Decision Needed |
|---------|---------|----------|-----------------|
| Email Marketing | Newsletter, Lead nurture | High | Mailchimp vs HubSpot vs other? |
| Analytics | Traffic tracking | High | GA4 (recommended) |
| Form Processing | Contact, Inquiries | High | Contact Form 7 vs Formspree? |
| CRM | Lead management | Medium | Which CRM is currently used? |
| Cookie Consent | GDPR compliance | Medium | Cookiebot vs custom? |

### Optional Integrations (Future)

| Service | Purpose | Priority | Notes |
|---------|---------|----------|-------|
| Live Chat | Customer support | Low | Intercom, Drift, Crisp |
| Payment Gateway | Course payments | Low | If selling programs online |
| Calendar Booking | Event registration | Low | Calendly, HubSpot Meetings |
| Social Media Feeds | Dynamic content | Low | Instagram, LinkedIn posts |
| Video Hosting | Course content | Low | Vimeo, Wistia (if not YouTube)

---

# Resource Requirements

### Team Allocation

| Role | 30-Day | 60-Day | 90-Day |
|------|--------|--------|--------|
| Lead Developer | Full-time | Full-time | 50% |
| Frontend Developer | Full-time | Full-time | 50% |
| WordPress Developer | 50% | 25% | As needed |
| QA Engineer | 25% | 50% | 50% |
| Content Manager | 50% | 25% | As needed |
| Project Manager | 25% | 25% | 25% |

### Technology Costs (Estimated Monthly)

| Service | Cost | Notes |
|---------|------|-------|
| Vercel (Frontend Hosting) | $20-150/mo | Based on traffic (Pro plan recommended) |
| WordPress Hosting | Existing | No change |
| Redis Cache (optional) | $15-50/mo | Improves API performance |
| CDN/Media Storage | $20-50/mo | For images/assets |
| Monitoring Tools | $0-50/mo | Sentry, LogRocket, or similar |
| Email Marketing | $0-100/mo | Mailchimp free tier or paid |
| Form Processing | $0-20/mo | Contact Form 7 free, Formspree paid |
| Cookie Consent | $0-15/mo | CookieYes free tier or Cookiebot |

**Total Additional Cost:** ~$55-435/month (depends on choices)

---

# Decisions Needed from Management

Before proceeding, the following decisions should be made:

### Immediate Decisions (Week 1)

| Decision | Options | Impact | Deadline |
|----------|---------|--------|----------|
| Email Marketing Platform | Mailchimp / HubSpot / ConvertKit | Form integrations, newsletter | Day 1 |
| Primary contact email | Which email receives form submissions? | Contact form setup | Day 1 |
| CRM Integration | Yes/No, which CRM? | Lead flow | Day 5 |

### 30-Day Decisions

| Decision | Options | Impact | Deadline |
|----------|---------|--------|----------|
| Domain strategy | Subdomain vs separate domain for backend | DNS setup | Day 10 |
| Social media links | Provide URLs for all platforms | Footer setup | Day 12 |
| Homepage statistics | Confirm actual numbers for stats section | Content accuracy | Day 13 |

### 60-Day Decisions

| Decision | Options | Impact | Deadline |
|----------|---------|--------|----------|
| Go/No-Go for launch | Based on 60-day review | Project timeline | Day 60 |
| Marketing launch date | Announcement timing | PR coordination | Day 55 |
| Old site retirement | Archive or redirect? | SEO, legal | Day 60 |

---

# Communication Plan

### Weekly Updates
- **Every Monday:** Progress report to stakeholders
- **Every Friday:** Dev team sync and planning

### Key Milestones Reviews
- **Day 30:** Internal demo and feedback session
- **Day 60:** Stakeholder review and go/no-go decision
- **Day 90:** Launch retrospective and handover

### Escalation Path
1. Team Lead → Project Manager → Department Head → Executive Sponsor

---

# Success Criteria

### Technical Success
- [ ] All pages load in under 2 seconds
- [ ] Lighthouse scores > 90 in all categories
- [ ] Zero critical security vulnerabilities
- [ ] 99.9% uptime post-launch

### Business Success
- [ ] Content team can update content without developer assistance
- [ ] No loss in organic search traffic (monitor 30 days post-launch)
- [ ] Positive feedback from stakeholders
- [ ] Marketing can design new pages using Divi

### User Experience Success
- [ ] Mobile experience rated satisfactory in user testing
- [ ] Form conversion rates maintained or improved
- [ ] No increase in bounce rate

---

# Quick Wins (Already Available)

These features are ready or near-ready and can be demonstrated:

| Feature | Status | Demo Ready |
|---------|--------|------------|
| Programs listing page | ✅ Built | Yes |
| Individual program pages | ✅ Built | Yes |
| Blog listing page | ✅ Built | Yes |
| Individual blog posts | ✅ Built | Yes |
| Partner logos carousel | ✅ Connected to WordPress | Yes |
| Testimonials by program | ✅ Connected to WordPress | Yes |
| Header menu from WordPress | ✅ Connected | Yes |
| Mobile responsive design | ✅ Working | Yes |
| Dark/Light aesthetic | ✅ Styled | Yes |

---

# Appendix

### A. Technology Stack Summary

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend Framework | Next.js 15 | React-based, SEO-optimized |
| Frontend Hosting | Vercel | Edge deployment, CDN |
| CMS | WordPress | Content management |
| Page Builder | Divi | Visual page design |
| API | WPGraphQL | Structured data queries |
| Custom Fields | ACF Pro | Structured content |
| Database | MySQL | WordPress data |
| Cache | Redis (optional) | Performance optimization |

### B. Key URLs

| Environment | URL | Purpose |
|-------------|-----|---------|
| Frontend (Staging) | staging.workforceinstitute.io | Testing |
| Frontend (Production) | workforceinstitute.io | Public site |
| WordPress Admin | backend.workforceinstitute.io/wp-admin | Content management |
| GraphQL Endpoint | backend.workforceinstitute.io/graphql | API |

### C. Contacts

| Role | Name | Responsibility |
|------|------|----------------|
| Project Lead | [Name] | Overall delivery |
| Lead Developer | [Name] | Technical decisions |
| Content Lead | [Name] | Content migration |
| Stakeholder | [Name] | Approvals |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Jan 2026 | Dev Team | Initial version |
| 1.1 | Jan 2026 | Dev Team | Added: Content inventory, visual roadmap, third-party integrations, management decisions, legal compliance, quick wins, detailed forms plan |

---

## Glossary

| Term | Definition |
|------|------------|
| ACF | Advanced Custom Fields - WordPress plugin for structured content |
| CPT | Custom Post Type - WordPress content types (Programs, Events, etc.) |
| CRM | Customer Relationship Management - Lead tracking system |
| GA4 | Google Analytics 4 - Traffic analytics |
| GraphQL | API query language for efficient data fetching |
| ISR | Incremental Static Regeneration - Next.js feature for dynamic static pages |
| SSR | Server-Side Rendering - Pages rendered on each request |
| WCAG | Web Content Accessibility Guidelines - Accessibility standard |
| WPGraphQL | WordPress plugin exposing content via GraphQL |

---

*This document should be reviewed and updated weekly during the migration project.*

