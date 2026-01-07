// =============================================================================
// PROGRAMS (Custom Post Type) QUERIES
// =============================================================================

// Get all programs for homepage carousel
// Note: Only query fields that exist in your ACF setup
export const GET_ALL_PROGRAMS = `
  query GetAllPrograms($first: Int = 100) {
    programs(first: $first, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        databaseId
        title
        slug
        uri
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        programFields {
          description
        }
      }
    }
  }
`;

// Get featured programs only
export const GET_FEATURED_PROGRAMS = `
  query GetFeaturedPrograms($first: Int = 10) {
    programs(
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
        slug
        uri
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        programFields {
          description
        }
      }
    }
  }
`;

// Get single program by slug
// Note: Only query fields that exist in your ACF setup
export const GET_PROGRAM_BY_SLUG = `
  query GetProgramBySlug($slug: ID!) {
    program(id: $slug, idType: SLUG) {
      id
      databaseId
      title
      slug
      uri
      content(format: RENDERED)
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      programFields {
        description
      }
    }
  }
`;

// Get all program slugs for static generation
export const GET_ALL_PROGRAM_SLUGS = `
  query GetAllProgramSlugs {
    programs(first: 100, where: { status: PUBLISH }) {
      nodes {
        slug
        uri
      }
    }
  }
`;

