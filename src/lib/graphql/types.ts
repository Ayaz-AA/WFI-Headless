// =============================================================================
// WORDPRESS GRAPHQL TYPES
// =============================================================================

// -----------------------------------------------------------------------------
// Media & Images
// -----------------------------------------------------------------------------
export interface WPImage {
  sourceUrl: string;
  altText?: string;
  mediaDetails?: {
    width: number;
    height: number;
  };
}

export interface WPFeaturedImage {
  node: WPImage;
}

// -----------------------------------------------------------------------------
// SEO (Yoast)
// -----------------------------------------------------------------------------
export interface WPSeo {
  title?: string;
  metaDesc?: string;
  canonical?: string;
  opengraphTitle?: string;
  opengraphDescription?: string;
  opengraphImage?: WPImage;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: WPImage;
}

// -----------------------------------------------------------------------------
// Menu Items
// -----------------------------------------------------------------------------
export interface WPMenuItem {
  id: string;
  label: string;
  url: string;
  path: string;
  parentId?: string | null;
  order?: number;
  target?: string;
  cssClasses?: string[];
}

export interface MenuItem extends WPMenuItem {
  children?: MenuItem[];
}

// -----------------------------------------------------------------------------
// Pages
// -----------------------------------------------------------------------------
export interface WPPage {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  uri: string;
  content?: string;
  date?: string;
  modified?: string;
  featuredImage?: WPFeaturedImage;
  seo?: WPSeo;
}

// -----------------------------------------------------------------------------
// Blog Posts
// -----------------------------------------------------------------------------
export interface WPCategory {
  id: string;
  name: string;
  slug: string;
}

export interface WPPost {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  uri: string;
  date: string;
  modified?: string;
  excerpt?: string;
  content?: string;
  featuredImage?: WPFeaturedImage;
  categories?: {
    nodes: WPCategory[];
  };
  author?: {
    node: {
      name: string;
      avatar?: {
        url: string;
      };
    };
  };
  seo?: WPSeo;
}

// -----------------------------------------------------------------------------
// Programs (Custom Post Type)
// -----------------------------------------------------------------------------
export interface ProgramFields {
  description?: string;
  shortDescription?: string;
  category?: string;
  duration?: string;
  price?: string;
  link?: string;
  buttonText?: string;
  featured?: boolean;
}

export interface WPProgram {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  uri: string;
  content?: string;
  featuredImage?: WPFeaturedImage;
  programFields?: ProgramFields;
  seo?: WPSeo;
}

// -----------------------------------------------------------------------------
// Testimonials (Custom Post Type)
// -----------------------------------------------------------------------------
export interface TestimonialFields {
  name: string;
  programName: string;
  quote: string;
  rating: number;
  company?: string;
  position?: string;
}

export interface WPTestimonial {
  id: string;
  databaseId: number;
  title: string;
  featuredImage?: WPFeaturedImage;
  testimonialFields?: TestimonialFields;
}

// -----------------------------------------------------------------------------
// Partners (Custom Post Type)
// -----------------------------------------------------------------------------
export interface PartnerFields {
  websiteUrl?: string;
  order?: number;
}

export interface WPPartner {
  id: string;
  databaseId: number;
  title: string;
  featuredImage?: WPFeaturedImage;
  partnerFields?: PartnerFields;
}

// -----------------------------------------------------------------------------
// Events/Webinars (Custom Post Type)
// -----------------------------------------------------------------------------
export interface EventFields {
  eventDate: string;
  eventTime?: string;
  location?: string;
  registrationLink?: string;
  isOnline?: boolean;
}

export interface WPEvent {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  featuredImage?: WPFeaturedImage;
  eventFields?: EventFields;
  seo?: WPSeo;
}

// -----------------------------------------------------------------------------
// Homepage Section Settings (ACF Options Pages)
// -----------------------------------------------------------------------------

export interface HeroSectionSettings {
  heroTitleLine1?: string;
  heroTitleLine2?: string;
  heroTitleLine3?: string;
  heroDescription?: string;
  heroButtonText?: string;
  heroAccentText?: string;
  heroBackgroundText?: string;
  heroImage?: {
    node?: WPImage;
  };
}

export interface PartnersSectionSettings {
  partnersTitle?: string;
  partnersDescription?: string;
  partnersFeature1?: string;
  partnersFeature2?: string;
}

export interface TrainingSectionSettings {
  trainingTitleHighlight?: string;
  trainingTitleRest?: string;
  trainingDescription?: string;
  trainingSubtext?: string;
  trainingButtonText?: string;
}

export interface TestimonialsSectionSettings {
  testimonialsTitle?: string;
  testimonialsDescription?: string;
  testimonialsBottomLine1?: string;
  testimonialsBottomLine2?: string;
  testimonialsButtonText?: string;
}

export interface IntegrationsSectionSettings {
  integrationsCardTitle?: string;
  integrationsCardDescription?: string;
  integrationsCardButtonText?: string;
  integrationsMainTitle?: string;
  integrationsMainDescription?: string;
  integrationsMainButtonText?: string;
}

export interface AIPlatformSectionSettings {
  aiPlatformTitleLine1?: string;
  aiPlatformTitleLine2?: string;
  aiPlatformDescription?: string;
  aiPlatformButtonText?: string;
}

export interface StatsSectionSettings {
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;
  stat4Value?: string;
  stat4Label?: string;
}

export interface CTASectionSettings {
  ctaTitleLine1?: string;
  ctaTitleLine2?: string;
  ctaDescription?: string;
  ctaButton1Text?: string;
  ctaButton2Text?: string;
}

export interface BlogSectionSettings {
  blogFeaturedDescription?: string;
}

export interface FooterSectionSettings {
  footerDescription?: string;
  footerCopyright?: string;
}

export interface HomepageSectionSettings {
  heroSection?: HeroSectionSettings;
  partnersSection?: PartnersSectionSettings;
  trainingSection?: TrainingSectionSettings;
  testimonialsSection?: TestimonialsSectionSettings;
  integrationsSection?: IntegrationsSectionSettings;
  aiPlatformSection?: AIPlatformSectionSettings;
  statsSection?: StatsSectionSettings;
  ctaSection?: CTASectionSettings;
  blogSection?: BlogSectionSettings;
  footerSection?: FooterSectionSettings;
}

// Legacy types (keeping for backwards compatibility)
export interface StatsSettings {
  resumesCreated?: string;
  resumesReviewed?: string;
  totalJobs?: string;
  usersWorldwide?: string;
}

export interface CTASettings {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export interface HeroSettings {
  headline?: string;
  subheadline?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: WPImage;
  trustText?: string;
  trustCount?: string;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
}

export interface FooterSettings {
  copyrightText?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface GlobalSettings {
  stats?: StatsSettings;
  cta?: CTASettings;
  hero?: HeroSettings;
  socialLinks?: SocialLinks;
  footer?: FooterSettings;
}

// -----------------------------------------------------------------------------
// GraphQL Response Types
// -----------------------------------------------------------------------------
export interface MenuQueryResponse {
  menuItems: {
    nodes: WPMenuItem[];
  };
}

export interface PageQueryResponse {
  page: WPPage | null;
}

export interface PageByUriResponse {
  pageBy: WPPage | null;
}

export interface AllPagesResponse {
  pages: {
    nodes: WPPage[];
  };
}

export interface PostQueryResponse {
  post: WPPost | null;
}

export interface AllPostsResponse {
  posts: {
    nodes: WPPost[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

export interface ProgramQueryResponse {
  program: WPProgram | null;
}

export interface AllProgramsResponse {
  programs: {
    nodes: WPProgram[];
  };
}

export interface AllTestimonialsResponse {
  testimonials: {
    nodes: WPTestimonial[];
  };
}

export interface AllPartnersResponse {
  partners: {
    nodes: WPPartner[];
  };
}

export interface AllEventsResponse {
  events: {
    nodes: WPEvent[];
  };
}

export interface GlobalSettingsResponse {
  acfOptionsGlobalSettings: {
    globalSettings: GlobalSettings;
  };
}

export interface HomepageSettingsResponse {
  acfOptionsHomepageSections: HomepageSectionSettings;
}

// -----------------------------------------------------------------------------
// Homepage Content (from "Homepage Settings" Page - works with FREE ACF)
// -----------------------------------------------------------------------------
export interface HomepageContent {
  // Hero Section
  heroTitleLine1?: string;
  heroTitleLine2?: string;
  heroTitleLine3?: string;
  heroDescription?: string;
  heroButtonText?: string;
  heroAccentText?: string;
  // Partners Section
  partnersTitle?: string;
  partnersDescription?: string;
  partnersFeature1?: string;
  partnersFeature2?: string;
  // Training Section
  trainingTitleHighlight?: string;
  trainingTitleRest?: string;
  trainingDescription?: string;
  trainingSubtext?: string;
  trainingButtonText?: string;
  // Stats Section
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;
  stat4Value?: string;
  stat4Label?: string;
  // CTA Section
  ctaTitleLine1?: string;
  ctaTitleLine2?: string;
  ctaDescription?: string;
  ctaButton1Text?: string;
  ctaButton2Text?: string;
  // Testimonials Section
  testimonialsTitle?: string;
  testimonialsDescription?: string;
  testimonialsBottomLine1?: string;
  testimonialsBottomLine2?: string;
  testimonialsButtonText?: string;
  // Integrations Section
  integrationsCardTitle?: string;
  integrationsCardDescription?: string;
  integrationsCardButtonText?: string;
  integrationsMainTitle?: string;
  integrationsMainDescription?: string;
  integrationsMainButtonText?: string;
  // AI Platform Section
  aiPlatformTitleLine1?: string;
  aiPlatformTitleLine2?: string;
  aiPlatformDescription?: string;
  aiPlatformButtonText?: string;
}

export interface HomepageContentResponse {
  page: {
    homepageContent: HomepageContent | null;
  } | null;
}

