# Download Instructions for Figma Assets

## Quick Start

Run the download script to fetch all assets from Figma:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/download-all-assets.ps1
```

## Manual Download (Alternative)

If the script doesn't work, you can manually download assets from Figma:

1. Open the Figma design: https://www.figma.com/design/rkfFTsvVSWNkYxw5Spb3dq/WFI--revamp-design--headless-architecture?node-id=567-545

2. Export assets:
   - Select each image/icon in Figma
   - Right-click → Export → Choose format (PNG/JPG/SVG)
   - Save to appropriate folder:
     - Logos → `public/logos/`
     - Icons → `public/icons/`
     - Images → `public/images/`

## Required Assets

### Logos (`public/logos/`)
- `wfi-logo.png`

### Images (`public/images/`)
- `hero-main.jpg`
- `user-avatar-1.png`
- `user-avatar-2.png`
- `stars-rating.png`
- `program-video-thumb.jpg`
- `play-button.png`
- `program-ai-generative.jpg`
- `program-ui-ux.jpg`
- `program-digital-marketing-1.jpg`
- `program-digital-marketing-2.jpg`
- `testimonial-avatar.png`
- `ellipse-decor-1.png`
- `ellipse-decor-2.png`
- `ellipse-decor-3.png`
- `ellipse-decor-4.png`
- `blog-thumb-1.jpg`
- `blog-featured.jpg`
- `partner-logo-1.png` through `partner-logo-6.png`

### Icons (`public/icons/`)
- `line-decor.svg`
- `quote-icon.svg`
- `line-52.svg`
- `line-53.svg`
- `star-filled.svg`
- `star-half.svg`
- `star-empty.svg`
- `quote-icon-large.svg`

## Fonts

### Already Configured (via Google Fonts)
- **Inter** - Automatically loaded via Next.js
- **Arimo** - Automatically loaded via Next.js

### Bayon Font
Bayon is not available on Google Fonts. Options:

1. **Export from Figma:**
   - In Figma, select text using Bayon font
   - Right-click → Export → Font → Download
   - Place font files in `public/fonts/`
   - Update `globals.css` with `@font-face` declarations

2. **Use Alternative:**
   - The app currently uses system font fallback
   - You can use a similar font like "Arial Black" or "Impact"

3. **Purchase/Download:**
   - Get Bayon from a font service
   - Place `.woff2` or `.woff` files in `public/fonts/`

## Verification

After downloading, verify assets are in place:

```powershell
# Check downloaded files
Get-ChildItem -Recurse public\images, public\icons, public\logos | Measure-Object | Select-Object Count
```

## Asset URLs

All asset URLs are available in the Figma design. The download script uses these URLs:
- Figma API URLs: `https://www.figma.com/api/mcp/asset/{asset-id}`

Note: These URLs expire after 7 days. Download assets promptly or export directly from Figma.

