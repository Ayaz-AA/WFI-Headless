// =============================================================================
// TESTIMONIALS (Custom Post Type) QUERIES
// =============================================================================

// Get all testimonials
// Note: Only query fields that exist in your ACF setup
export const GET_ALL_TESTIMONIALS = `
  query GetAllTestimonials($first: Int = 100) {
    testimonials(first: $first, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
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
        testimonialFields {
          name
          programName
          quote
          rating
        }
      }
    }
  }
`;

// Get testimonials by program
export const GET_TESTIMONIALS_BY_PROGRAM = `
  query GetTestimonialsByProgram($programName: String!, $first: Int = 20) {
    testimonials(
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
        testimonialFields {
          name
          programName
          quote
          rating
        }
      }
    }
  }
`;

// Get featured testimonials (limited)
export const GET_FEATURED_TESTIMONIALS = `
  query GetFeaturedTestimonials($first: Int = 6) {
    testimonials(
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
        testimonialFields {
          name
          programName
          quote
          rating
        }
      }
    }
  }
`;

