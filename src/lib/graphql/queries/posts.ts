// =============================================================================
// BLOG POST QUERIES
// =============================================================================

// Get latest posts for blog section/listing
export const GET_LATEST_POSTS = `
  query GetLatestPosts($first: Int = 10, $after: String) {
    posts(
      first: $first
      after: $after
      where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }
    ) {
      nodes {
        id
        databaseId
        title
        slug
        uri
        date
        excerpt(format: RENDERED)
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
        categories {
          nodes {
            id
            name
            slug
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// Get a single post by slug
// Note: SEO fields require WPGraphQL Yoast SEO plugin - removed for now
export const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      databaseId
      title
      slug
      uri
      date
      modified
      content(format: RENDERED)
      excerpt(format: RENDERED)
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          id
          name
          slug
        }
      }
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
    }
  }
`;

// Get all post slugs for static generation
export const GET_ALL_POST_SLUGS = `
  query GetAllPostSlugs {
    posts(first: 1000, where: { status: PUBLISH }) {
      nodes {
        slug
        uri
        modified
      }
    }
  }
`;

// Get posts by category
export const GET_POSTS_BY_CATEGORY = `
  query GetPostsByCategory($categorySlug: String!, $first: Int = 10, $after: String) {
    posts(
      first: $first
      after: $after
      where: { 
        status: PUBLISH
        categoryName: $categorySlug
        orderby: { field: DATE, order: DESC } 
      }
    ) {
      nodes {
        id
        databaseId
        title
        slug
        uri
        date
        excerpt(format: RENDERED)
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// Get featured/sticky posts
export const GET_FEATURED_POSTS = `
  query GetFeaturedPosts($first: Int = 5) {
    posts(
      first: $first
      where: { 
        status: PUBLISH
        onlySticky: true
        orderby: { field: DATE, order: DESC } 
      }
    ) {
      nodes {
        id
        databaseId
        title
        slug
        uri
        date
        excerpt(format: RENDERED)
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
      }
    }
  }
`;

