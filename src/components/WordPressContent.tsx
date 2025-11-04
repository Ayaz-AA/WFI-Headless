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
  } | null;
}

export default function WordPressContent({ page, pageHTML }: WordPressContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [stylesLoaded, setStylesLoaded] = useState(false);
  const styleElementRef = useRef<HTMLStyleElement | null>(null);

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
  return (
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
  );
}

