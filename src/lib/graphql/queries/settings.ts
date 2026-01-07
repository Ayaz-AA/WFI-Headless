// =============================================================================
// HOMEPAGE CONTENT SETTINGS QUERIES
// =============================================================================

/**
 * Fetch homepage content from a WordPress "Homepage Settings" page
 * This works with FREE ACF + WPGraphQL + WPGraphQL for ACF
 * 
 * The content is stored in a page with slug "homepage-settings"
 * ACF fields are attached to that page and exposed via GraphQL
 */

// Get homepage content from the "Homepage Settings" page
// NOTE: Only query fields that actually exist in WordPress ACF
export const GET_HOMEPAGE_CONTENT = `
  query GetHomepageContent {
    page(id: "homepage-settings", idType: URI) {
      homepageContent {
        heroTitleLine1
        heroTitleLine2
        heroTitleLine3
        heroDescription
        heroButtonText
        heroAccentText
        partnersTitle
        partnersDescription
        partnersFeature1
        partnersFeature2
        trainingTitleHighlight
        trainingTitleRest
        trainingDescription
        trainingSubtext
        trainingButtonText
        stat1Value
        stat1Label
        stat2Value
        stat2Label
        stat3Value
        stat3Label
        stat4Value
        stat4Label
        ctaTitleLine1
        ctaTitleLine2
        ctaDescription
        ctaButton1Text
        ctaButton2Text
        testimonialsTitle
        testimonialsDescription
        testimonialsBottomLine1
        testimonialsBottomLine2
        testimonialsButtonText
        integrationsCardTitle
        integrationsCardDescription
        integrationsCardButtonText
        integrationsMainTitle
        integrationsMainDescription
        integrationsMainButtonText
        aiPlatformTitleLine1
        aiPlatformTitleLine2
        aiPlatformDescription
        aiPlatformButtonText
      }
    }
  }
`;

// Individual section queries for granular fetching

export const GET_HERO_SETTINGS = `
  query GetHeroSettings {
    acfOptionsHomepageSections {
      heroSection {
        heroTitleLine1
        heroTitleLine2
        heroTitleLine3
        heroDescription
        heroButtonText
        heroAccentText
        heroBackgroundText
        heroImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export const GET_PARTNERS_SETTINGS = `
  query GetPartnersSettings {
    acfOptionsHomepageSections {
      partnersSection {
        partnersTitle
        partnersDescription
        partnersFeature1
        partnersFeature2
      }
    }
  }
`;

export const GET_TRAINING_SETTINGS = `
  query GetTrainingSettings {
    acfOptionsHomepageSections {
      trainingSection {
        trainingTitleHighlight
        trainingTitleRest
        trainingDescription
        trainingSubtext
        trainingButtonText
      }
    }
  }
`;

export const GET_TESTIMONIALS_SETTINGS = `
  query GetTestimonialsSettings {
    acfOptionsHomepageSections {
      testimonialsSection {
        testimonialsTitle
        testimonialsDescription
        testimonialsBottomLine1
        testimonialsBottomLine2
        testimonialsButtonText
      }
    }
  }
`;

export const GET_INTEGRATIONS_SETTINGS = `
  query GetIntegrationsSettings {
    acfOptionsHomepageSections {
      integrationsSection {
        integrationsCardTitle
        integrationsCardDescription
        integrationsCardButtonText
        integrationsMainTitle
        integrationsMainDescription
        integrationsMainButtonText
      }
    }
  }
`;

export const GET_AI_PLATFORM_SETTINGS = `
  query GetAiPlatformSettings {
    acfOptionsHomepageSections {
      aiPlatformSection {
        aiPlatformTitleLine1
        aiPlatformTitleLine2
        aiPlatformDescription
        aiPlatformButtonText
      }
    }
  }
`;

export const GET_STATS_SETTINGS = `
  query GetStatsSettings {
    acfOptionsHomepageSections {
      statsSection {
        stat1Value
        stat1Label
        stat2Value
        stat2Label
        stat3Value
        stat3Label
        stat4Value
        stat4Label
      }
    }
  }
`;

export const GET_CTA_SETTINGS = `
  query GetCtaSettings {
    acfOptionsHomepageSections {
      ctaSection {
        ctaTitleLine1
        ctaTitleLine2
        ctaDescription
        ctaButton1Text
        ctaButton2Text
      }
    }
  }
`;

export const GET_BLOG_SETTINGS = `
  query GetBlogSettings {
    acfOptionsHomepageSections {
      blogSection {
        blogFeaturedDescription
      }
    }
  }
`;

export const GET_FOOTER_SETTINGS = `
  query GetFooterSettings {
    acfOptionsHomepageSections {
      footerSection {
        footerDescription
        footerCopyright
      }
    }
  }
`;

// Get site general settings (built-in WordPress settings)
export const GET_SITE_SETTINGS = `
  query GetSiteSettings {
    generalSettings {
      title
      description
      url
    }
  }
`;
