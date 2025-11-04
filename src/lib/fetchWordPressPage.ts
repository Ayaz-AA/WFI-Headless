/**
 * Fetch the full rendered HTML from WordPress page
 * This includes all CSS links and inline styles that Divi generates
 */
export async function fetchWordPressPageHTML(slug: string): Promise<{
  html: string;
  cssLinks: string[];
  inlineStyles: string[];
} | null> {
  try {
    const url = `https://backend.workforceinstitute.io/${slug}/`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.status}`);
    }

    const html = await response.text();
    
    // Extract all CSS link tags
    const cssLinkRegex = /<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["'][^>]*>/gi;
    const cssLinks: string[] = [];
    let match;
    
    while ((match = cssLinkRegex.exec(html)) !== null) {
      const href = match[1];
      // Convert relative URLs to absolute
      if (href.startsWith('http')) {
        cssLinks.push(href);
      } else if (href.startsWith('//')) {
        cssLinks.push(`https:${href}`);
      } else if (href.startsWith('/')) {
        cssLinks.push(`https://backend.workforceinstitute.io${href}`);
      } else {
        cssLinks.push(`https://backend.workforceinstitute.io/${href}`);
      }
    }

    // Extract inline styles from <style> tags
    const styleTagRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    const inlineStyles: string[] = [];
    
    while ((match = styleTagRegex.exec(html)) !== null) {
      const styleContent = match[1].trim();
      if (styleContent) {
        inlineStyles.push(styleContent);
      }
    }

    // Extract the main content area (usually in #main-content or .entry-content or similar)
    // Try to find the Divi content wrapper
    const contentMatch = html.match(/<div[^>]*class=["'][^"']*et_pb_section[^"']*["'][^>]*>[\s\S]*/i);
    
    let contentHTML = '';
    if (contentMatch) {
      // Find the closing tag for the main content wrapper
      const startIndex = contentMatch.index || 0;
      let openTags = 0;
      let inContent = false;
      let endIndex = startIndex;
      
      for (let i = startIndex; i < html.length; i++) {
        if (html.substring(i).startsWith('<div')) {
          openTags++;
          inContent = true;
        } else if (html.substring(i).startsWith('</div>')) {
          openTags--;
          if (inContent && openTags === 0) {
            endIndex = i + 6;
            break;
          }
        }
      }
      
      if (endIndex > startIndex) {
        contentHTML = html.substring(startIndex, endIndex);
      }
    }

    // If we can't find specific content, try to get body content
    if (!contentHTML) {
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      if (bodyMatch) {
        // Try to extract main content from body
        const bodyContent = bodyMatch[1];
        const mainContentMatch = bodyContent.match(/<main[^>]*>([\s\S]*?)<\/main>/i) ||
                                 bodyContent.match(/<div[^>]*id=["']main-content["'][^>]*>([\s\S]*?)<\/div>/i) ||
                                 bodyContent.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
        
        if (mainContentMatch) {
          contentHTML = mainContentMatch[1];
        } else {
          // Fallback: get content between header and footer
          const headerEnd = bodyContent.indexOf('</header>');
          const footerStart = bodyContent.indexOf('<footer');
          if (headerEnd > -1 && footerStart > -1) {
            contentHTML = bodyContent.substring(headerEnd + 9, footerStart);
          }
        }
      }
    }

    return {
      html: contentHTML || html,
      cssLinks: [...new Set(cssLinks)], // Remove duplicates
      inlineStyles,
    };
  } catch (error) {
    console.error('Error fetching WordPress page HTML:', error);
    return null;
  }
}

