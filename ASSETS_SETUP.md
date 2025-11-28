# Assets Setup Guide

This project uses local assets (images, icons, fonts) instead of remote Figma URLs. Follow these steps to set up all assets:

## Directory Structure

```
public/
├── images/          # All image files (JPG, PNG)
├── icons/           # SVG icons
└── logos/           # Logo files
```

## Downloading Assets

### Option 1: Using PowerShell Script (Windows)

Run the PowerShell script to download all assets automatically:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/download-assets.ps1
```

### Option 2: Manual Download

1. Open the Figma design: https://www.figma.com/design/rkfFTsvVSWNkYxw5Spb3dq/WFI--revamp-design--headless-architecture?node-id=567-545
2. Export all images and icons from Figma
3. Place them in the appropriate directories:
   - Logos → `public/logos/`
   - Icons (SVG) → `public/icons/`
   - Images → `public/images/`

### Option 3: Using Node.js Script

```bash
node scripts/download-assets.js
```

## Required Assets

### Logos
- `wfi-logo.png` - Main WFI logo

### Hero Section
- `hero-main.jpg` - Main hero image
- `user-avatar-1.png` - User avatar 1
- `user-avatar-2.png` - User avatar 2
- `stars-rating.png` - Star rating image

### Programs Section
- `program-video-thumb.jpg` - Video thumbnail
- `program-ai-generative.jpg` - AI Generative program image
- `program-ui-ux.jpg` - UI/UX program image
- `program-digital-marketing-1.jpg` - Digital Marketing image 1
- `program-digital-marketing-2.jpg` - Digital Marketing image 2

### Testimonials Section
- `testimonial-avatar.png` - Testimonial user avatar
- `ellipse-decor-1.png` - Decorative ellipse 1
- `ellipse-decor-2.png` - Decorative ellipse 2
- `ellipse-decor-3.png` - Decorative ellipse 3
- `ellipse-decor-4.png` - Decorative ellipse 4

### Partners Section
- `partner-logo-1.png` through `partner-logo-6.png` - Partner university logos

### Blog Section
- `blog-thumb-1.jpg` - Blog thumbnail
- `blog-featured.jpg` - Featured blog image

## Fonts

The project uses:
- **Inter** - Loaded via Google Fonts (Next.js optimization)
- **Arimo** - Loaded via Google Fonts (Next.js optimization)
- **Bayon** - Currently using system font fallback. To add locally:
  1. Download Bayon font files
  2. Place in `public/fonts/`
  3. Update `globals.css` with `@font-face` declarations

## Asset Mapping

All asset paths are centralized in `src/lib/assets.ts`. Update this file if you need to change asset locations or add new assets.

## Notes

- All icons are now inline SVG components in `src/components/icons.tsx` for better performance
- Images use Next.js `Image` component for optimization
- If assets fail to download, you can manually export from Figma and place them in the correct directories

