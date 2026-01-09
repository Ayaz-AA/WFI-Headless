// =============================================================================
// EVENTS/WEBINARS (Custom Post Type) QUERIES
// =============================================================================

// Get all upcoming events
export const GET_ALL_EVENTS = `
  query GetAllEvents($first: Int = 50) {
    events(
      first: $first
      where: { 
        status: PUBLISH
        orderby: { field: DATE, order: ASC }
      }
    ) {
      nodes {
        id
        databaseId
        title
        slug
        uri
        excerpt(format: RENDERED)
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        eventFields {
          eventDate
          eventTime
          location
          registrationLink
          isOnline
        }
      }
    }
  }
`;

// Get upcoming events (limited for homepage)
export const GET_UPCOMING_EVENTS = `
  query GetUpcomingEvents($first: Int = 5) {
    events(
      first: $first
      where: { 
        status: PUBLISH
        orderby: { field: DATE, order: ASC }
      }
    ) {
      nodes {
        id
        databaseId
        title
        slug
        uri
        excerpt(format: RENDERED)
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        eventFields {
          eventDate
          eventTime
          location
          registrationLink
          isOnline
        }
      }
    }
  }
`;

// Get single event by slug
export const GET_EVENT_BY_SLUG = `
  query GetEventBySlug($slug: ID!) {
    event(id: $slug, idType: SLUG) {
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
          mediaDetails {
            width
            height
          }
        }
      }
      eventFields {
        eventDate
        eventTime
        location
        registrationLink
        isOnline
      }
      seo {
        title
        metaDesc
        canonical
        opengraphImage {
          sourceUrl
        }
      }
    }
  }
`;

// Get all event slugs for static generation
export const GET_ALL_EVENT_SLUGS = `
  query GetAllEventSlugs {
    events(first: 100, where: { status: PUBLISH }) {
      nodes {
        slug
        uri
      }
    }
  }
`;


