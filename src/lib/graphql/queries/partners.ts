// =============================================================================
// PARTNERS (Custom Post Type) QUERIES
// =============================================================================

// Get all partners
// Note: Only query fields that exist in your ACF setup
export const GET_ALL_PARTNERS = `
  query GetAllPartners($first: Int = 50) {
    partners(first: $first, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        databaseId
        title
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        partnerFields {
          websiteUrl
        }
      }
    }
  }
`;

// Get featured partners (for homepage)
export const GET_FEATURED_PARTNERS = `
  query GetFeaturedPartners($first: Int = 10) {
    partners(
      first: $first
      where: { 
        status: PUBLISH
        orderby: { field: DATE, order: DESC }
      }
    ) {
      nodes {
        id
        databaseId
        title
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        partnerFields {
          websiteUrl
        }
      }
    }
  }
`;

