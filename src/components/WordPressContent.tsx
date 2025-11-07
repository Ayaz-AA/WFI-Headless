"use client";

import { WordPressPage } from '@/lib/graphql';
import { useEffect, useRef, useState } from 'react';

interface WordPressContentProps {
  page: WordPressPage | null;
  pageHTML?: {
    html: string;
    cssLinks: string[];
    cssContents?: string[]; // CSS content fetched server-side
    inlineStyles: string[];
    scripts?: Array<{ src?: string; inline?: string; type?: string; defer?: boolean; async?: boolean }>;
  } | null;
}

// Helper function to replace font URLs with proxy URLs (client-side)
function replaceFontUrlsWithProxy(cssContent: string): string {
  // Replace font URLs in url() functions with proxy URLs
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

export default function WordPressContent({ page, pageHTML }: WordPressContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [stylesLoaded, setStylesLoaded] = useState(false);
  const styleElementRef = useRef<HTMLStyleElement | null>(null);
  const loadedScriptsRef = useRef<Set<string>>(new Set()); // Track loaded external scripts to avoid duplicates
  const loadedInlineScriptsRef = useRef<Set<string>>(new Set()); // Track loaded inline scripts to avoid duplicates

  // Ensure et-pb-icon class uses FontAwesome font (FontAwesome is loaded via npm package in layout.tsx)
  useEffect(() => {
    // Check if style already exists
    if (document.getElementById('et-pb-icon-fontawesome')) return;

    // Add FontAwesome font support for et-pb-icon class used by Divi
    const fontAwesomeStyle = document.createElement('style');
    fontAwesomeStyle.id = 'et-pb-icon-fontawesome';
    fontAwesomeStyle.textContent = `
      /* Ensure et-pb-icon class uses FontAwesome font */
      .et-pb-icon,
      .et-pb-icon:before,
      .et-pb-icon:after {
        font-family: "Font Awesome 6 Free", "Font Awesome 6 Pro", "Font Awesome 6 Brands", "FontAwesome", "Font Awesome 5 Free", "Font Awesome 5 Pro", "Font Awesome 5 Brands", sans-serif !important;
        font-weight: 900 !important;
        font-style: normal !important;
        font-variant: normal !important;
        text-rendering: auto !important;
        line-height: 1 !important;
        -webkit-font-smoothing: antialiased !important;
        -moz-osx-font-smoothing: grayscale !important;
        display: inline-block !important;
      }
      
      /* Fix for icon content that might be encoded */
      .et-pb-icon {
        speak: none;
        text-decoration: none;
        text-transform: none;
        letter-spacing: normal;
        word-wrap: normal;
        white-space: nowrap;
        direction: ltr;
      }
    `;
    document.head.appendChild(fontAwesomeStyle);
  }, []);

  // Load ETmodules font for Divi inline icons (et_overlay.et_pb_inline_icon)
  // This runs after styles are loaded to ensure it doesn't conflict
  useEffect(() => {
    if (!stylesLoaded) return; // Wait for styles to load first
    
    // Check if style already exists
    if (document.getElementById('et-modules-font')) return;

    // Check if ETmodules @font-face already exists in loaded CSS
    const existingFontFace = document.querySelector('style#divi-all-styles')?.textContent?.includes('font-family:[\'"]ETmodules[\'"]');
    
    // Add ETmodules font-face declaration if it doesn't exist
    if (!existingFontFace) {
      const etModulesStyle = document.createElement('style');
      etModulesStyle.id = 'et-modules-font';
      etModulesStyle.textContent = `
        /* ETmodules font-face for Divi icons */
        @font-face {
          font-family: 'ETmodules';
          font-style: normal;
          font-weight: 400;
          font-display: block;
          src: url('/api/fonts/wp-content/themes/Divi/core/admin/fonts/modules/all/modules.woff') format('woff'),
               url('/api/fonts/wp-content/themes/Divi/core/admin/fonts/modules/all/modules.woff2') format('woff2');
        }
      `;
      document.head.appendChild(etModulesStyle);
    }
    
    // Always ensure et_overlay and et_pb_inline_icon use ETmodules font
    if (!document.getElementById('et-modules-font-styles')) {
      const etModulesStyles = document.createElement('style');
      etModulesStyles.id = 'et-modules-font-styles';
      etModulesStyles.textContent = `
        /* Ensure et_overlay and et_pb_inline_icon use ETmodules font */
        .et_overlay.et_pb_inline_icon:before,
        .et_pb_inline_icon:before {
          font-family: 'ETmodules' !important;
          font-weight: 400 !important;
          font-style: normal !important;
          font-variant: normal !important;
          text-transform: none !important;
          line-height: 1 !important;
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
          speak: none !important;
          display: inline-block !important;
        }
      `;
      document.head.appendChild(etModulesStyles);
    }
  }, [stylesLoaded]);

  useEffect(() => {
    // Load CSS from pageHTML (extracted from WordPress page source)
    const loadStylesFromPageHTML = async () => {
      if (!pageHTML) return;

      try {
        // Combine all CSS content (fetched server-side to avoid CORS)
        const allCSS: string[] = [];
        
        // Add CSS contents fetched server-side (no CORS issues)
        if (pageHTML.cssContents && pageHTML.cssContents.length > 0) {
          // Ensure all HTTP URLs are converted to HTTPS in CSS (comprehensive conversion)
          const convertedCSS = pageHTML.cssContents.map(css => 
            css
              // Replace http:// in url() functions
              .replace(/url\((['"]?)http:\/\/backend\.workforceinstitute\.io/gi, 'url($1https://backend.workforceinstitute.io')
              .replace(/url\(http:\/\/backend\.workforceinstitute\.io/gi, 'url(https://backend.workforceinstitute.io')
              // Replace plain http:// URLs
              .replace(/http:\/\/backend\.workforceinstitute\.io/gi, 'https://backend.workforceinstitute.io')
              // Replace URL-encoded http://
              .replace(/http%3A%2F%2Fbackend\.workforceinstitute\.io/gi, 'https://backend.workforceinstitute.io')
          );
          allCSS.push(...convertedCSS);
        }
        
        // Add inline styles from the page (already converted server-side, but ensure it's done)
        if (pageHTML.inlineStyles.length > 0) {
          const convertedInlineStyles = pageHTML.inlineStyles.map(style =>
            style
              // Replace http:// in url() functions
              .replace(/url\((['"]?)http:\/\/backend\.workforceinstitute\.io/gi, 'url($1https://backend.workforceinstitute.io')
              .replace(/url\(http:\/\/backend\.workforceinstitute\.io/gi, 'url(https://backend.workforceinstitute.io')
              // Replace plain http:// URLs
              .replace(/http:\/\/backend\.workforceinstitute\.io/gi, 'https://backend.workforceinstitute.io')
              // Replace URL-encoded http://
              .replace(/http%3A%2F%2Fbackend\.workforceinstitute\.io/gi, 'https://backend.workforceinstitute.io')
          );
          allCSS.push(...convertedInlineStyles);
        }
        
        // Inject all CSS as inline styles (avoids CORS completely)
        if (allCSS.length > 0) {
          // Remove old style element if it exists
          if (styleElementRef.current) {
            styleElementRef.current.remove();
          }

          const styleElement = document.createElement('style');
          styleElement.id = 'divi-all-styles';
          // Final pass: ensure no HTTP URLs remain (catch any edge cases)
          let finalCSS = allCSS.join('\n\n');
          
          // Multiple passes to ensure all HTTP URLs are converted
          // Apply conversions multiple times to catch nested cases
          for (let i = 0; i < 3; i++) {
            // url() with quotes - need to preserve the quote
            finalCSS = finalCSS.replace(/url\((['"]?)http:\/\/backend\.workforceinstitute\.io/gi, (match, quote) => {
              return `url(${quote || ''}https://backend.workforceinstitute.io`;
            });
            // url() without quotes
            finalCSS = finalCSS.replace(/url\(http:\/\/backend\.workforceinstitute\.io/gi, 'url(https://backend.workforceinstitute.io');
            // Plain http://
            finalCSS = finalCSS.replace(/http:\/\/backend\.workforceinstitute\.io/gi, 'https://backend.workforceinstitute.io');
            // URL encoded
            finalCSS = finalCSS.replace(/http%3A%2F%2Fbackend\.workforceinstitute\.io/gi, 'https://backend.workforceinstitute.io');
          }
          
          // Replace font URLs with proxy URLs to avoid CORS (even if already done server-side, do it again as fallback)
          finalCSS = replaceFontUrlsWithProxy(finalCSS);
          
          // Don't transform CSS selectors - we now have #page-container wrapper to match WordPress structure
          // finalCSS = transformCSSSelectors(finalCSS);
          
          styleElement.textContent = finalCSS;
          document.head.appendChild(styleElement);
          styleElementRef.current = styleElement;
          setStylesLoaded(true);
          
          // Debug: Check if any HTTP URLs remain
          if (finalCSS.includes('http://backend.workforceinstitute.io')) {
            console.warn('Some HTTP URLs may still remain in CSS');
          }
        }

        // Note: We don't load CSS via <link> tags anymore to avoid CORS issues
        // All CSS is fetched server-side and inlined above
        if (allCSS.length === 0) {
          // If no CSS was loaded, mark as loaded anyway
          setStylesLoaded(true);
        }
      } catch (error) {
        console.warn('Could not load styles from page HTML:', error);
        setStylesLoaded(true);
      }
    };

    if (pageHTML) {
      loadStylesFromPageHTML();
    } else {
      // If no pageHTML, mark as loaded (will use GraphQL content only)
      setStylesLoaded(true);
    }
  }, [pageHTML, page?.enqueuedStylesheets]);

  // Load scripts from WordPress page
  useEffect(() => {
    if (!pageHTML?.scripts || pageHTML.scripts.length === 0) return;

    const loadScripts = async () => {
      for (const script of pageHTML.scripts || []) {
        try {
          if (script.src) {
            // External script - check if already loaded
            if (loadedScriptsRef.current.has(script.src)) {
              continue;
            }

            // Create and load external script
            const scriptElement = document.createElement('script');
            scriptElement.src = script.src;
            if (script.type) {
              scriptElement.type = script.type;
            }
            if (script.defer) {
              scriptElement.defer = true;
            }
            if (script.async) {
              scriptElement.async = true;
            }

            // Wait for script to load
            await new Promise<void>((resolve) => {
              scriptElement.onload = () => {
                loadedScriptsRef.current.add(script.src!);
                resolve();
              };
              scriptElement.onerror = () => {
                console.warn(`Failed to load script: ${script.src}`);
                resolve(); // Continue even if script fails
              };
              document.head.appendChild(scriptElement);
            });
          } else if (script.inline) {
            // Inline script - check if already loaded to avoid duplicate declarations
            // Create a unique identifier from script content (first 200 chars + length for uniqueness)
            const scriptHash = script.inline.length > 200 
              ? `${script.inline.substring(0, 200)}_${script.inline.length}`
              : script.inline;
            if (loadedInlineScriptsRef.current.has(scriptHash)) {
              continue; // Skip if already loaded
            }

            // Inline script - execute it
            const scriptElement = document.createElement('script');
            if (script.type) {
              scriptElement.type = script.type;
            }
            scriptElement.textContent = script.inline;
            
            // Mark as loaded before appending to prevent duplicates
            loadedInlineScriptsRef.current.add(scriptHash);
            
            try {
              document.head.appendChild(scriptElement);
            } catch (error) {
              // If appendChild fails, remove from tracking so it can be retried
              loadedInlineScriptsRef.current.delete(scriptHash);
              throw error;
            }
          }
        } catch (error) {
          console.warn('Error loading script:', error);
        }
      }
    };

    loadScripts();
  }, [pageHTML?.scripts]);

  useEffect(() => {
    if (!contentRef.current) return;

    // Use pageHTML if available (has full rendered HTML), otherwise use GraphQL content
    const htmlContent = pageHTML?.html || page?.content;
    
    if (!htmlContent) return;

    // Fix relative URLs in content to absolute WordPress URLs
    const fixUrls = (html: string) => {
      // Apply multiple passes to ensure all conversions happen
      let fixedHtml = html;
      
      // Multiple conversion passes
      for (let pass = 0; pass < 3; pass++) {
        fixedHtml = fixedHtml
          // Convert HTTP to HTTPS in url() functions (with quotes)
          .replace(/url\((['"]?)http:\/\/backend\.workforceinstitute\.io/gi, 'url($1https://backend.workforceinstitute.io')
          // Convert HTTP to HTTPS in url() functions (without quotes)
          .replace(/url\(http:\/\/backend\.workforceinstitute\.io/gi, 'url(https://backend.workforceinstitute.io')
          // Convert HTTP to HTTPS in style attributes
          .replace(/style=["']([^"']*http:\/\/backend\.workforceinstitute\.io[^"']*)["']/gi, (match, styleContent) => {
            return `style="${styleContent.replace(/http:\/\/backend\.workforceinstitute\.io/gi, 'https://backend.workforceinstitute.io')}"`;
          })
          // Convert plain HTTP URLs
          .replace(/http:\/\/backend\.workforceinstitute\.io/gi, 'https://backend.workforceinstitute.io')
          // Convert URL-encoded HTTP
          .replace(/http%3A%2F%2Fbackend\.workforceinstitute\.io/gi, 'https://backend.workforceinstitute.io');
      }
      
      // Fix relative URLs
      fixedHtml = fixedHtml
        .replace(/src="\//g, 'src="https://backend.workforceinstitute.io/')
        .replace(/href="\//g, 'href="https://backend.workforceinstitute.io/')
        .replace(/url\(['"]?\//g, 'url("https://backend.workforceinstitute.io/')
        // Fix srcset URLs
        .replace(/srcset="([^"]*)"/g, (match, srcset) => {
          const fixedSrcset = srcset.split(',').map((src: string) => {
            const trimmed = src.trim();
            // Convert HTTP to HTTPS
            if (trimmed.startsWith('http://backend.workforceinstitute.io')) {
              return trimmed.replace('http://', 'https://');
            }
            if (trimmed.startsWith('/')) {
              return `https://backend.workforceinstitute.io${trimmed}`;
            }
            return trimmed;
          }).join(', ');
          return `srcset="${fixedSrcset}"`;
        });
      
      return fixedHtml;
    };

    const fixedContent = fixUrls(htmlContent);
    
    if (contentRef.current) {
      contentRef.current.innerHTML = fixedContent;
      
      // Load any scripts that might be in the content
      const scripts = contentRef.current.querySelectorAll('script');
      scripts.forEach((oldScript: HTMLScriptElement) => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach((attr: Attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.textContent = oldScript.textContent;
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });
    }
  }, [page, pageHTML, stylesLoaded]);

  if (!page) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Unable to load content. Please check if the WordPress GraphQL endpoint is accessible.</p>
      </div>
    );
  }

  // Render Divi content exactly as it comes from WordPress, preserving all styles
  // Add #page-container wrapper to match WordPress structure so CSS selectors work
  return (
    <div id="page-container" style={{ width: '100%', margin: 0, padding: 0 }}>
      <div 
        className="et-db et-db--frontend"
        style={{
          width: '100%',
          minHeight: '100%',
          margin: 0,
          padding: 0,
        }}
      >
        <div 
          ref={contentRef}
          className="et-l et-l--post"
          style={{
            width: '100%',
            margin: 0,
            padding: 0,
          }}
        />
      </div>
    </div>
  );
}

