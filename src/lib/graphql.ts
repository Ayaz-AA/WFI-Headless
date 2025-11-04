import { GraphQLClient } from 'graphql-request';

const WORDPRESS_GRAPHQL_URL = 'https://backend.workforceinstitute.io/graphql';

const client = new GraphQLClient(WORDPRESS_GRAPHQL_URL);

export interface WordPressPage {
  id: string;
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  enqueuedStylesheets?: {
    nodes: Array<{
      src: string;
      handle?: string;
    }>;
  };
  customCSS?: string;
  diviContent?: string;
}

export interface WordPressPageResponse {
  page: WordPressPage | null;
}

// GraphQL query to fetch page by slug with all Divi content and styles
// Using URI idType which works with slugs (e.g., "test-page" or "/test-page/")
const GET_PAGE_BY_SLUG = `
  query GetPageBySlug($uri: String!) {
    page(id: $uri, idType: URI) {
      id
      title
      content
      slug
      excerpt
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      enqueuedStylesheets {
        nodes {
          src
          handle
        }
      }
    }
  }
`;

// Alternative query using pages with slug filter
const GET_PAGE_BY_SLUG_ALT = `
  query GetPageBySlugAlt($slug: String!) {
    pages(where: { name: $slug }) {
      nodes {
        id
        title
        content
        slug
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

// Test function to verify GraphQL endpoint is accessible
export async function testGraphQLConnection(): Promise<boolean> {
  try {
    const testQuery = `
      query {
        __typename
      }
    `;
    await client.request(testQuery);
    return true;
  } catch (error) {
    console.error('GraphQL connection test failed:', error);
    return false;
  }
}

// Fetch CSS content server-side to avoid CORS issues
async function fetchCSSContent(url: string): Promise<string | null> {
  try {
    // Convert HTTP to HTTPS
    const httpsUrl = url.replace('http://', 'https://');
    
    const response = await fetch(httpsUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    
    if (!response.ok) return null;
    
    let cssContent = await response.text();
    
    // Convert all HTTP URLs to HTTPS in CSS content (multiple patterns)
    // Handle @font-face src: url() declarations
    cssContent = cssContent
      // Replace http:// in url() functions (with quotes)
      .replace(/url\((['"]?)http:\/\/backend\.workforceinstitute\.io/gi, 'url($1https://backend.workforceinstitute.io')
      // Replace http:// in url() functions (without quotes)
      .replace(/url\(http:\/\/backend\.workforceinstitute\.io/gi, 'url(https://backend.workforceinstitute.io')
      // Replace plain http:// URLs
      .replace(/http:\/\/backend\.workforceinstitute\.io/gi, 'https://backend.workforceinstitute.io')
      // Replace URL-encoded http://
      .replace(/http%3A%2F%2Fbackend\.workforceinstitute\.io/gi, 'https://backend.workforceinstitute.io');
    
    return cssContent;
  } catch (error) {
    console.error(`Failed to fetch CSS from ${url}:`, error);
    return null;
  }
}

// Fetch page HTML directly from WordPress (includes all styles)
export async function getPageHTML(slug: string) {
  try {
    const response = await fetch(`https://backend.workforceinstitute.io/${slug}/`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    
    if (!response.ok) return null;
    
    const html = await response.text();
    
    // Extract CSS links and fetch their content
    const cssLinks: string[] = [];
    const cssContents: string[] = [];
    const linkRegex = /<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["'][^>]*>/gi;
    let match;
    
    while ((match = linkRegex.exec(html)) !== null) {
      let href = match[1];
      if (!href.startsWith('http')) {
        href = href.startsWith('/') 
          ? `https://backend.workforceinstitute.io${href}`
          : `https://backend.workforceinstitute.io/${href}`;
      }
      // Convert HTTP to HTTPS
      href = href.replace('http://', 'https://');
      cssLinks.push(href);
      
      // Fetch CSS content server-side to avoid CORS
      const cssContent = await fetchCSSContent(href);
      if (cssContent) {
        cssContents.push(cssContent);
      }
    }
    
    // Extract inline styles and convert HTTP to HTTPS
    const inlineStyles: string[] = [];
    const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    while ((match = styleRegex.exec(html)) !== null) {
      let styleContent = match[1].trim();
      // Convert HTTP to HTTPS in inline styles
      styleContent = styleContent.replace(/http:\/\/backend\.workforceinstitute\.io/g, 'https://backend.workforceinstitute.io');
      inlineStyles.push(styleContent);
    }
    
    // Extract content - find the main Divi content area
    let content = '';
    
    // Try to find the main content wrapper (usually after header)
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
      const bodyContent = bodyMatch[1];
      
      // Try multiple patterns to find the main content
      // Pattern 1: Find content after header, before footer
      const headerEnd = bodyContent.indexOf('</header>');
      const footerStart = bodyContent.indexOf('<footer');
      
      if (headerEnd > -1 && footerStart > -1) {
        content = bodyContent.substring(headerEnd + 9, footerStart).trim();
      } else {
        // Pattern 2: Find main tag
        const mainMatch = bodyContent.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
        if (mainMatch) {
          content = mainMatch[1];
        } else {
          // Pattern 3: Find article tag
          const articleMatch = bodyContent.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
          if (articleMatch) {
            content = articleMatch[1];
          } else {
            // Pattern 4: Find div with et_pb_section (Divi sections)
            const diviMatch = bodyContent.match(/(<div[^>]*class=["'][^"']*et_pb_section[^"']*["'][^>]*>[\s\S]*?)(?=<footer|<\/body)/i);
            if (diviMatch) {
              content = diviMatch[1];
            } else {
              // Fallback: Use body content minus header/footer
              content = bodyContent;
            }
          }
        }
      }
    }
    
    return {
      html: content,
      cssLinks: [...new Set(cssLinks)],
      cssContents, // Inlined CSS content fetched server-side
      inlineStyles,
    };
  } catch (error) {
    console.error('Error fetching page HTML:', error);
    return null;
  }
}

export async function getPageBySlug(slug: string): Promise<WordPressPage | null> {
  try {
    // Try with URI format (with trailing slash)
    let uri = slug.startsWith('/') ? slug : `/${slug}/`;
    
    const data = await client.request<{ page: WordPressPage | null }>(
      GET_PAGE_BY_SLUG,
      { uri }
    );
    return data.page;
  } catch (error: any) {
    // If URI format with trailing slash fails, try without trailing slash
    try {
      const uri = slug.startsWith('/') ? slug : `/${slug}`;
      const data = await client.request<{ page: WordPressPage | null }>(
        GET_PAGE_BY_SLUG,
        { uri }
      );
      return data.page;
    } catch (secondError: any) {
      // If URI method fails, try alternative query using pages filter
      try {
        const altData = await client.request<{ pages: { nodes: WordPressPage[] } }>(
          GET_PAGE_BY_SLUG_ALT,
          { slug }
        );
        return altData.pages.nodes[0] || null;
      } catch (thirdError: any) {
        console.error('Error fetching page from WordPress:', error);
        
        // Provide more detailed error information
        if (error.response) {
          console.error('GraphQL Response:', error.response);
          console.error('GraphQL Errors:', error.response.errors);
        }
        
        if (error.message) {
          console.error('Error message:', error.message);
        }
        
        // Check if it's a network/connection error
        if (error.message?.includes('fetch')) {
          console.error('Network error - check if WordPress GraphQL endpoint is accessible');
        }
        
        return null;
      }
    }
  }
}

