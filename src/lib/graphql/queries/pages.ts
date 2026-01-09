// =============================================================================
// PAGE QUERIES
// =============================================================================

// Get a single page by slug/URI (includes Divi-rendered content)
export const GET_PAGE_BY_SLUG = `
  query GetPageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
      id
      databaseId
      title
      slug
      uri
      content(format: RENDERED)
      date
      modified
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
      seo {
        title
        metaDesc
        canonical
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
        }
        twitterTitle
        twitterDescription
      }
    }
  }
`;

// Get page by database ID
export const GET_PAGE_BY_ID = `
  query GetPageById($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      id
      databaseId
      title
      slug
      uri
      content(format: RENDERED)
      date
      modified
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      seo {
        title
        metaDesc
        canonical
      }
    }
  }
`;

// Get all pages (for static generation)
export const GET_ALL_PAGES = `
  query GetAllPages {
    pages(first: 100, where: { status: PUBLISH }) {
      nodes {
        id
        databaseId
        title
        slug
        uri
        date
        modified
      }
    }
  }
`;

// Get all page slugs (for generateStaticParams)
export const GET_ALL_PAGE_SLUGS = `
  query GetAllPageSlugs {
    pages(first: 100, where: { status: PUBLISH }) {
      nodes {
        slug
        uri
      }
    }
  }
`;

// Get home page specifically
export const GET_HOME_PAGE = `
  query GetHomePage {
    page(id: "/", idType: URI) {
      id
      databaseId
      title
      content(format: RENDERED)
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      seo {
        title
        metaDesc
        opengraphImage {
          sourceUrl
        }
      }
    }
  }
`;


