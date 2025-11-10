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

// Query to list all pages
const GET_ALL_PAGES = `
  query GetAllPages {
    pages(first: 100) {
      nodes {
        id
        title
        slug
        uri
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

// Helper function to replace font URLs with proxy URLs
function replaceFontUrlsWithProxy(cssContent: string): string {
  // Replace font URLs in url() functions with proxy URLs
  // Pattern: url('http://backend.workforceinstitute.io/path/to/font.woff')
  // or: url(http://backend.workforceinstitute.io/path/to/font.woff)
  // This handles both single and double quotes, and handles query parameters
  cssContent = cssContent.replace(
    /url\((['"]?)(https?:\/\/backend\.workforceinstitute\.io\/[^'")]+?\/[^'")]*?\.(woff2?|ttf|otf|eot)(\?[^'")]*)?)\1\)/gi,
    (match, quote, url) => {
      // Extract the path after the domain
      const pathMatch = url.match(/https?:\/\/backend\.workforceinstitute\.io\/(.+)/i);
      if (pathMatch) {
        const fontPath = pathMatch[1];
        // Remove query parameters if present
        const cleanPath = fontPath.split('?')[0];
        return `url(${quote || ''}/api/fonts/${cleanPath}${quote || ''})`;
      }
      return match; // Return original if pattern doesn't match
    }
  );
  
  // Also handle URL-encoded font paths
  cssContent = cssContent.replace(
    /url\((['"]?)(https?%3A%2F%2Fbackend\.workforceinstitute\.io%2F[^'")]+?\.(woff2?|ttf|otf|eot))%([^'")]*)?\1\)/gi,
    (match, quote, encodedUrl) => {
      try {
        const decodedUrl = decodeURIComponent(encodedUrl);
        const pathMatch = decodedUrl.match(/https?:\/\/backend\.workforceinstitute\.io\/(.+)/i);
        if (pathMatch) {
          const fontPath = pathMatch[1];
          return `url(${quote || ''}/api/fonts/${fontPath}${quote || ''})`;
        }
      } catch (e) {
        // If decoding fails, return original
      }
      return match;
    }
  );
  
  return cssContent;
}

// Helper function to transform CSS selectors to work in Next.js context
// Removes 'body #page-container' from selectors since we don't have that structure
function transformCSSSelectors(cssContent: string): string {
  // Replace 'body #page-container' with just the content (maintains specificity)
  // This handles cases like 'body #page-container .et_pb_section .et_pb_button_0'
  // Pattern: body (optional space) #page-container (optional space) followed by selector or comma
  
  // Handle: body #page-container followed by space and selector
  cssContent = cssContent.replace(
    /body\s+#page-container\s+/g,
    ''
  );
  
  // Handle: body#page-container (no space) followed by space and selector
  cssContent = cssContent.replace(
    /body#page-container\s+/g,
    ''
  );
  
  // Handle: body #page-container.selector (no space after #page-container)
  cssContent = cssContent.replace(
    /body\s+#page-container\./g,
    '.'
  );
  
  // Handle: body#page-container.selector (no spaces)
  cssContent = cssContent.replace(
    /body#page-container\./g,
    '.'
  );
  
  // Handle cases with comma-separated selectors: 'body #page-container, .other-selector'
  cssContent = cssContent.replace(
    /body\s+#page-container\s*,/g,
    ''
  );
  
  // Handle: body#page-container, (no space before comma)
  cssContent = cssContent.replace(
    /body#page-container\s*,/g,
    ''
  );
  
  // Handle cases where it's just '#page-container' without body
  cssContent = cssContent.replace(
    /#page-container\s+/g,
    ''
  );
  
  // Handle: #page-container.selector (no space)
  cssContent = cssContent.replace(
    /#page-container\./g,
    '.'
  );
  
  return cssContent;
}

// Fetch CSS content server-side to avoid CORS issues
async function fetchCSSContent(url: string): Promise<string | null> {
  try {
    // Convert HTTP to HTTPS
    const httpsUrl = url.replace('http://', 'https://');
    
    const response = await fetch(httpsUrl, {
      next: { revalidate: 0 }, // No cache - always fetch fresh CSS
      cache: 'no-store', // Prevent caching
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
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
    
    // Replace font URLs with proxy URLs to avoid CORS
    cssContent = replaceFontUrlsWithProxy(cssContent);
    
    // Don't transform CSS selectors - we now have #page-container wrapper to match WordPress structure
    // cssContent = transformCSSSelectors(cssContent);
    
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
      next: { revalidate: 0 }, // No cache - always fetch fresh content
      cache: 'no-store', // Prevent caching
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
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
      // Replace font URLs with proxy URLs
      styleContent = replaceFontUrlsWithProxy(styleContent);
      // Don't transform CSS selectors - we now have #page-container wrapper to match WordPress structure
      // styleContent = transformCSSSelectors(styleContent);
      inlineStyles.push(styleContent);
    }
    
    // Extract script tags (both external and inline)
    const scripts: Array<{ src?: string; inline?: string; type?: string; defer?: boolean; async?: boolean }> = [];
    const scriptRegex = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
    while ((match = scriptRegex.exec(html)) !== null) {
      const scriptAttrs = match[1];
      const scriptContent = match[2].trim();
      
      // Extract src attribute
      const srcMatch = scriptAttrs.match(/src=["']([^"']+)["']/i);
      let src = srcMatch ? srcMatch[1] : undefined;
      
      // Convert relative URLs to absolute and HTTP to HTTPS
      if (src) {
        if (!src.startsWith('http')) {
          src = src.startsWith('/') 
            ? `https://backend.workforceinstitute.io${src}`
            : `https://backend.workforceinstitute.io/${src}`;
        }
        src = src.replace('http://', 'https://');
      }
      
      // Extract other attributes
      const hasDefer = /defer/i.test(scriptAttrs);
      const hasAsync = /async/i.test(scriptAttrs);
      const typeMatch = scriptAttrs.match(/type=["']([^"']+)["']/i);
      const type = typeMatch ? typeMatch[1] : undefined;
      
      scripts.push({
        src,
        inline: scriptContent || undefined,
        type,
        defer: hasDefer,
        async: hasAsync,
      });
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
      scripts, // Scripts extracted from WordPress page
    };
  } catch (error) {
    console.error('Error fetching page HTML:', error);
    return null;
  }
}

export async function getPageBySlug(slug: string): Promise<WordPressPage | null> {
  try {
    // Try with URI format (with trailing slash)
    const uri = slug.startsWith('/') ? slug : `/${slug}/`;
    
    const data = await client.request<{ page: WordPressPage | null }>(
      GET_PAGE_BY_SLUG,
      { uri }
    );
    return data.page;
  } catch (error) {
    // If URI format with trailing slash fails, try without trailing slash
    try {
      const uri = slug.startsWith('/') ? slug : `/${slug}`;
      const data = await client.request<{ page: WordPressPage | null }>(
        GET_PAGE_BY_SLUG,
        { uri }
      );
      return data.page;
    } catch {
      // If URI method fails, try alternative query using pages filter
      try {
        const altData = await client.request<{ pages: { nodes: WordPressPage[] } }>(
          GET_PAGE_BY_SLUG_ALT,
          { slug }
        );
        return altData.pages.nodes[0] || null;
      } catch {
        console.error('Error fetching page from WordPress:', error);
        
        // Provide more detailed error information
        if (error && typeof error === 'object' && 'response' in error) {
          const graphqlError = error as { response?: { errors?: unknown } };
          console.error('GraphQL Response:', graphqlError.response);
          console.error('GraphQL Errors:', graphqlError.response?.errors);
        }
        
        if (error instanceof Error) {
          console.error('Error message:', error.message);
          
          // Check if it's a network/connection error
          if (error.message.includes('fetch')) {
            console.error('Network error - check if WordPress GraphQL endpoint is accessible');
          }
        }
        
        return null;
      }
    }
  }
}

// Get all pages from WordPress
export async function getAllPages(): Promise<Array<{ id: string; title: string; slug: string; uri: string }>> {
  try {
    const data = await client.request<{ pages: { nodes: Array<{ id: string; title: string; slug: string; uri: string }> } }>(
      GET_ALL_PAGES
    );
    return data.pages.nodes;
  } catch (error) {
    console.error('Error fetching all pages from WordPress:', error);
    return [];
  }
}

// Fetch header/navigation HTML directly from WordPress
export async function getHeaderHTML() {
  try {
    const response = await fetch('https://backend.workforceinstitute.io/', {
      next: { revalidate: 0 }, // No cache - always fetch fresh content
      cache: 'no-store', // Prevent caching
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
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
      // Replace font URLs with proxy URLs
      styleContent = replaceFontUrlsWithProxy(styleContent);
      inlineStyles.push(styleContent);
    }

    // Extract script tags (both external and inline)
    const scripts: Array<{ src?: string; inline?: string; type?: string; defer?: boolean; async?: boolean }> = [];
    const scriptRegex = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
    while ((match = scriptRegex.exec(html)) !== null) {
      const scriptAttrs = match[1];
      const scriptContent = match[2].trim();

      // Extract src attribute
      const srcMatch = scriptAttrs.match(/src=["']([^"']+)["']/i);
      let src = srcMatch ? srcMatch[1] : undefined;

      // Convert relative URLs to absolute and HTTP to HTTPS
      if (src) {
        if (!src.startsWith('http')) {
          src = src.startsWith('/') 
            ? `https://backend.workforceinstitute.io${src}`
            : `https://backend.workforceinstitute.io/${src}`;
        }
        src = src.replace('http://', 'https://');
      }

      // Extract other attributes
      const hasDefer = /defer/i.test(scriptAttrs);
      const hasAsync = /async/i.test(scriptAttrs);
      const typeMatch = scriptAttrs.match(/type=["']([^"']+)["']/i);
      const type = typeMatch ? typeMatch[1] : undefined;

      scripts.push({
        src,
        inline: scriptContent || undefined,
        type,
        defer: hasDefer,
        async: hasAsync,
      });
    }
    
    // Extract header content
    let headerHTML = '';
    
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const bodyClassMatch = html.match(/<body[^>]*class=["']([^"']+)["'][^>]*>/i);
    const bodyClasses = bodyClassMatch
      ? bodyClassMatch[1].split(/\s+/).map((cls) => cls.trim()).filter(Boolean)
      : [];
    if (!bodyMatch) {
      return null;
    }
    
    const bodyContent = bodyMatch[1];
    
    // Try multiple patterns to find header
    // Pattern 1: Standard header tag
    const headerMatch = bodyContent.match(/<header[^>]*>([\s\S]*?)<\/header>/i);
    if (headerMatch) {
      headerHTML = headerMatch[0];
    }
    
    // Pattern 2: Divi header structure - find #main-header or header wrapper
    if (!headerHTML) {
      // Find the opening of main-header or et_header_style
      const headerStartPattern = /<div[^>]*(?:id=["']main-header["']|class=["'][^"']*et_header_style[^"']*["']|class=["'][^"']*main-header[^"']*["'])[^>]*>/i;
      const headerStartMatch = bodyContent.search(headerStartPattern);
      
      if (headerStartMatch > -1) {
        // Find the closing div tag by counting opening/closing divs
        let openDivs = 0;
        let inHeader = false;
        let headerEnd = -1;
        
        // Start from the opening div
        for (let i = headerStartMatch; i < bodyContent.length; i++) {
          const remaining = bodyContent.substring(i);
          
          // Check for opening div (but not self-closing like <div />)
          if (remaining.startsWith('<div') && !remaining.match(/^<div[^>]*\/>/)) {
            const tagEnd = remaining.indexOf('>');
            if (tagEnd > -1) {
              if (!inHeader) {
                inHeader = true;
              }
              openDivs++;
              i += tagEnd; // Skip past the opening tag
            }
          } 
          // Check for closing div
          else if (remaining.startsWith('</div>')) {
            openDivs--;
            if (inHeader && openDivs === 0) {
              headerEnd = i + 6; // Include the closing tag
              break;
            }
            i += 5; // Skip past </div>
          }
        }
        
        if (headerEnd > headerStartMatch) {
          headerHTML = bodyContent.substring(headerStartMatch, headerEnd);
        }
      }
    }
    
    // Pattern 3: Find content before main content starts (everything before first et_pb_section or main tag)
    if (!headerHTML) {
      const mainStartPattern = /<(?:main|div[^>]*id=["']main-content["']|div[^>]*class=["'][^"']*et_pb_section[^"']*["'])/i;
      const mainStartMatch = bodyContent.search(mainStartPattern);
      
      if (mainStartMatch > -1) {
        headerHTML = bodyContent.substring(0, mainStartMatch).trim();
      }
    }
    
    // Pattern 4: Try to extract navigation menu
    if (!headerHTML) {
      const navMenuMatch = bodyContent.match(/<nav[^>]*>([\s\S]*?)<\/nav>/i);
      if (navMenuMatch) {
        headerHTML = navMenuMatch[0];
      }
    }
    
    // Pattern 5: Find everything up to the first content section (before footer)
    if (!headerHTML) {
      const footerStart = bodyContent.indexOf('<footer');
      if (footerStart > -1) {
        // Get a reasonable header section (first 10000 chars or until we hit content)
        const contentStart = bodyContent.search(/<div[^>]*class=["'][^"']*et_pb_section|<main|<article/i);
        const headerEnd = contentStart > -1 && contentStart < footerStart ? contentStart : Math.min(10000, footerStart);
        headerHTML = bodyContent.substring(0, headerEnd).trim();
      }
    }
    
    // Convert WordPress URLs to localhost URLs in the header HTML
    if (headerHTML) {
      headerHTML = headerHTML
        // Convert href URLs - remove domain and trailing slash
        .replace(/href=["']https?:\/\/backend\.workforceinstitute\.io\/([^"']*)["']/gi, (match, path) => {
          const cleanPath = path.replace(/\/$/, ''); // Remove trailing slash
          return cleanPath ? `href="/${cleanPath}"` : 'href="/"';
        })
        .replace(/href=["']https?:\/\/backend\.workforceinstitute\.io["']/gi, 'href="/"')
        // Convert action URLs (forms)
        .replace(/action=["']https?:\/\/backend\.workforceinstitute\.io\/([^"']*)["']/gi, (match, path) => {
          const cleanPath = path.replace(/\/$/, '');
          return cleanPath ? `action="/${cleanPath}"` : 'action="/"';
        })
        // Keep image and asset URLs pointing to WordPress (don't convert src)
        .replace(/src=["']https?:\/\/backend\.workforceinstitute\.io/gi, 'src="https://backend.workforceinstitute.io');
    }
    
    return {
      html: headerHTML || '',
      cssLinks: [...new Set(cssLinks)],
      cssContents, // Inlined CSS content fetched server-side
      inlineStyles,
      bodyClasses,
      scripts,
    };
  } catch (error) {
    console.error('Error fetching header HTML:', error);
    return null;
  }
}

