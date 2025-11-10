"use client";

import { useEffect, useRef, useState } from 'react';

interface WordPressHeaderProps {
  headerHTML?: {
    html: string;
    cssLinks: string[];
    cssContents?: string[];
    inlineStyles: string[];
    bodyClasses?: string[];
    scripts?: Array<{ src?: string; inline?: string; type?: string; defer?: boolean; async?: boolean }>;
  } | null;
}

export default function WordPressHeader({ headerHTML }: WordPressHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [stylesLoaded, setStylesLoaded] = useState(false);
  const styleElementRef = useRef<HTMLStyleElement | null>(null);
  const appliedBodyClassesRef = useRef<string[]>([]);
  const loadedScriptsRef = useRef<Set<string>>(new Set());
  const loadedInlineScriptsRef = useRef<Set<string>>(new Set());
  const globalScriptRegistryRef = useRef<{ external: Set<string>; inline: Set<string> } | null>(null);

  const getGlobalScriptRegistry = () => {
    if (globalScriptRegistryRef.current) return globalScriptRegistryRef.current;
    if (typeof window === 'undefined') return null;
    const win = window as typeof window & {
      __wpScriptRegistry?: { external: Set<string>; inline: Set<string> };
    };
    if (!win.__wpScriptRegistry) {
      win.__wpScriptRegistry = {
        external: new Set<string>(),
        inline: new Set<string>(),
      };
    }
    globalScriptRegistryRef.current = win.__wpScriptRegistry;
    return win.__wpScriptRegistry;
  };

  const createInlineScriptHash = (content: string) => {
    return content.length > 200
      ? `${content.substring(0, 200)}_${content.length}`
      : `${content}_${content.length}`;
  };

  useEffect(() => {
    if (!headerHTML?.bodyClasses || headerHTML.bodyClasses.length === 0) {
      return;
    }

    const body = document.body;
    const classesToApply: string[] = [];
    headerHTML.bodyClasses.forEach((cls) => {
      if (!body.classList.contains(cls)) {
        body.classList.add(cls);
        classesToApply.push(cls);
      }
    });

    appliedBodyClassesRef.current = classesToApply;

    return () => {
      if (appliedBodyClassesRef.current.length === 0) return;
      appliedBodyClassesRef.current.forEach((cls) => {
        body.classList.remove(cls);
      });
      appliedBodyClassesRef.current = [];
    };
  }, [headerHTML?.bodyClasses]);

  // Ensure et-pb-icon class uses FontAwesome font (FontAwesome is loaded via npm package in layout.tsx)
  useEffect(() => {
    // Check if style already exists
    if (document.getElementById('et-pb-icon-fontawesome-header')) return;

    // Add FontAwesome font support for et-pb-icon class used by Divi
    const fontAwesomeStyle = document.createElement('style');
    fontAwesomeStyle.id = 'et-pb-icon-fontawesome-header';
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
  useEffect(() => {
    if (!stylesLoaded) return; // Wait for styles to load first
    
    // Check if style already exists
    if (document.getElementById('et-modules-font-header')) return;

    // Check if ETmodules @font-face already exists in loaded CSS
    const existingFontFace = document.querySelector('style#wordpress-header-styles')?.textContent?.includes('font-family:[\'"]ETmodules[\'"]');
    
    // Add ETmodules font-face declaration if it doesn't exist
    if (!existingFontFace) {
      const etModulesStyle = document.createElement('style');
      etModulesStyle.id = 'et-modules-font-header';
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
    if (!document.getElementById('et-modules-font-styles-header')) {
      const etModulesStyles = document.createElement('style');
      etModulesStyles.id = 'et-modules-font-styles-header';
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

  // Helper function to replace font URLs with proxy URLs (client-side)
  const replaceFontUrlsWithProxy = (cssContent: string): string => {
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
  };

  useEffect(() => {
    // Load CSS from headerHTML
    const loadStylesFromHeaderHTML = async () => {
      if (!headerHTML) return;

      try {
        // Combine all CSS content
        const allCSS: string[] = [];
        
        // Add CSS contents fetched server-side
        if (headerHTML.cssContents && headerHTML.cssContents.length > 0) {
          const convertedCSS = headerHTML.cssContents.map(css => {
            // Convert HTTP to HTTPS
            let converted = css
              .replace(/url\((['"]?)http:\/\/backend\.workforceinstitute\.io/gi, 'url($1https://backend.workforceinstitute.io')
              .replace(/url\(http:\/\/backend\.workforceinstitute\.io/gi, 'url(https://backend.workforceinstitute.io')
              .replace(/http:\/\/backend\.workforceinstitute\.io/gi, 'https://backend.workforceinstitute.io')
              .replace(/http%3A%2F%2Fbackend\.workforceinstitute\.io/gi, 'https://backend.workforceinstitute.io');
            
            // Replace font URLs with proxy URLs
            converted = replaceFontUrlsWithProxy(converted);
            return converted;
          });
          allCSS.push(...convertedCSS);
        }
        
        // Add inline styles
        if (headerHTML.inlineStyles.length > 0) {
          const convertedInlineStyles = headerHTML.inlineStyles.map(style => {
            // Convert HTTP to HTTPS
            let converted = style
              .replace(/url\((['"]?)http:\/\/backend\.workforceinstitute\.io/gi, 'url($1https://backend.workforceinstitute.io')
              .replace(/url\(http:\/\/backend\.workforceinstitute\.io/gi, 'url(https://backend.workforceinstitute.io')
              .replace(/http:\/\/backend\.workforceinstitute\.io/gi, 'https://backend.workforceinstitute.io')
              .replace(/http%3A%2F%2Fbackend\.workforceinstitute\.io/gi, 'https://backend.workforceinstitute.io');
            
            // Replace font URLs with proxy URLs
            converted = replaceFontUrlsWithProxy(converted);
            return converted;
          });
          allCSS.push(...convertedInlineStyles);
        }
        
        // Inject all CSS as inline styles
        if (allCSS.length > 0) {
          // Remove old style element if it exists
          if (styleElementRef.current) {
            styleElementRef.current.remove();
          }

          const styleElement = document.createElement('style');
          styleElement.id = 'wordpress-header-styles';
          
          let finalCSS = allCSS.join('\n\n');
          
          // Multiple passes to ensure all HTTP URLs are converted
          for (let i = 0; i < 3; i++) {
            finalCSS = finalCSS.replace(/url\((['"]?)http:\/\/backend\.workforceinstitute\.io/gi, (match, quote) => {
              return `url(${quote || ''}https://backend.workforceinstitute.io`;
            });
            finalCSS = finalCSS.replace(/url\(http:\/\/backend\.workforceinstitute\.io/gi, 'url(https://backend.workforceinstitute.io');
            finalCSS = finalCSS.replace(/http:\/\/backend\.workforceinstitute\.io/gi, 'https://backend.workforceinstitute.io');
            finalCSS = finalCSS.replace(/http%3A%2F%2Fbackend\.workforceinstitute\.io/gi, 'https://backend.workforceinstitute.io');
          }
          
          // Final pass: replace font URLs with proxy URLs
          finalCSS = replaceFontUrlsWithProxy(finalCSS);
          
          styleElement.textContent = finalCSS;
          document.head.appendChild(styleElement);
          styleElementRef.current = styleElement;
          setStylesLoaded(true);
        } else {
          setStylesLoaded(true);
        }
      } catch (error) {
        console.warn('Could not load header styles:', error);
        setStylesLoaded(true);
      }
    };

    if (headerHTML) {
      loadStylesFromHeaderHTML();
    } else {
      setStylesLoaded(true);
    }
  }, [headerHTML]);

  useEffect(() => {
    if (!headerRef.current || !headerHTML?.html) return;

    // Fix URLs in header HTML
    const fixUrls = (html: string) => {
      let fixedHtml = html;
      
      // Multiple conversion passes
      for (let pass = 0; pass < 3; pass++) {
        fixedHtml = fixedHtml
          // Convert WordPress URLs to localhost URLs for links
          .replace(/href=["']https?:\/\/backend\.workforceinstitute\.io\/([^"']*)["']/gi, (match, path) => {
            // Remove trailing slash if present
            const cleanPath = path.replace(/\/$/, '');
            return `href="/${cleanPath}"`;
          })
          .replace(/href=["']https?:\/\/backend\.workforceinstitute\.io["']/gi, 'href="/"')
          // Keep image and asset URLs pointing to WordPress
          .replace(/src=["']https?:\/\/backend\.workforceinstitute\.io/gi, 'src="https://backend.workforceinstitute.io')
          // Convert action URLs
          .replace(/action=["']https?:\/\/backend\.workforceinstitute\.io\/([^"']*)["']/gi, (match, path) => {
            const cleanPath = path.replace(/\/$/, '');
            return `action="/${cleanPath}"`;
          });
      }
      
      return fixedHtml;
    };

    const sanitizeHeaderHtml = (html: string) => {
      return html
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi, '')
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    };

    const fixedContent = sanitizeHeaderHtml(fixUrls(headerHTML.html));
    
    if (headerRef.current) {
      headerRef.current.innerHTML = fixedContent;
      
      // Intercept link clicks to use Next.js routing
      const links = headerRef.current.querySelectorAll('a[href^="/"]');
      links.forEach((link) => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('/') && !href.startsWith('//')) {
            e.preventDefault();
            // Use Next.js router for client-side navigation
            if (typeof window !== 'undefined') {
              window.location.href = href;
            }
          }
        });
      });
      
    }
  }, [headerHTML, stylesLoaded]);

  useEffect(() => {
    if (!headerHTML?.scripts || headerHTML.scripts.length === 0) return;

    const loadScripts = async () => {
      const globalRegistry = getGlobalScriptRegistry();

      for (const script of headerHTML.scripts || []) {
        try {
          if (script.src) {
            const normalizedSrc = script.src;
            if (loadedScriptsRef.current.has(normalizedSrc)) {
              continue;
            }

            if (globalRegistry?.external.has(normalizedSrc)) {
              loadedScriptsRef.current.add(normalizedSrc);
              continue;
            }

            const existingScript = Array.from(document.querySelectorAll('script[src]')).find(
              (existing) => existing.getAttribute('src') === normalizedSrc
            );
            if (existingScript) {
              loadedScriptsRef.current.add(normalizedSrc);
              globalRegistry?.external.add(normalizedSrc);
              continue;
            }

            await new Promise<void>((resolve) => {
              const scriptElement = document.createElement('script');
              scriptElement.src = normalizedSrc;
              if (script.type) {
                scriptElement.type = script.type;
              }
              if (script.defer) {
                scriptElement.defer = true;
              }
              if (script.async) {
                scriptElement.async = true;
              }

              scriptElement.onload = () => {
                loadedScriptsRef.current.add(normalizedSrc);
                globalRegistry?.external.add(normalizedSrc);
                resolve();
              };
              scriptElement.onerror = () => {
                console.warn(`Failed to load header script: ${normalizedSrc}`);
                resolve();
              };
              document.head.appendChild(scriptElement);
            });
          } else if (script.inline) {
            const scriptHash = createInlineScriptHash(script.inline);

            if (loadedInlineScriptsRef.current.has(scriptHash)) {
              continue;
            }

            if (globalRegistry?.inline.has(scriptHash)) {
              loadedInlineScriptsRef.current.add(scriptHash);
              continue;
            }

            const existingInline = Array.from(document.querySelectorAll('script[data-wp-inline-hash]')).find(
              (existing) => existing.getAttribute('data-wp-inline-hash') === scriptHash
            );
            if (existingInline) {
              loadedInlineScriptsRef.current.add(scriptHash);
              globalRegistry?.inline.add(scriptHash);
              continue;
            }

            const scriptElement = document.createElement('script');
            if (script.type) {
              scriptElement.type = script.type;
            }
            scriptElement.textContent = script.inline;
            scriptElement.setAttribute('data-wp-inline-hash', scriptHash);

            try {
              document.head.appendChild(scriptElement);
              loadedInlineScriptsRef.current.add(scriptHash);
              globalRegistry?.inline.add(scriptHash);
            } catch (error) {
              loadedInlineScriptsRef.current.delete(scriptHash);
              throw error;
            }
          }
        } catch (error) {
          console.warn('Error loading header script:', error);
        }
      }
    };

    loadScripts();
  }, [headerHTML?.scripts]);

  if (!headerHTML || !headerHTML.html) {
    return null;
  }

  return (
    <div 
      ref={headerRef}
      style={{
        width: '100%',
        margin: 0,
        padding: 0,
      }}
    />
  );
}

