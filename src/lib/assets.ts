/**
 * Asset paths mapping
 * All assets should be stored in public folder
 */

export const assets = {
  // Logo
  wfiLogo: '/logos/wfi-logo.png',
  
  // Hero Section
  heroMain: '/images/homevideo.mp4',
  mainbannerimage: '/images/mainbannerimage.png',
  userAvatar1: '/images/user-avatar-1.png',
  userAvatar2: '/images/user-avatar-2.png',
  starsRating: '/icons/Group 2.png',
  lineDecor: '/icons/line-decor.svg',
  arrowRight: '/icons/arrow-right.svg',
  
  // Programs Section
  programVideoThumb: '/images/program-video-thumb.jpg',
  quoteIcon: '/icons/quote-icon.svg',
  line52: '/icons/line-52.svg',
  line53: '/icons/line-53.svg',
  playButton: '/images/play-button.png',
  arrowLeft: '/icons/arrow-left.svg',
  arrowRightNav: '/icons/arrow-right-nav.svg',
  programAIGenerative: '/images/program-ai-generative.jpg',
  programUIUX: '/images/program-ui-ux.jpg',
  programDigitalMarketing1: '/images/program-digital-marketing-1.jpg',
  programDigitalMarketing2: '/images/program-digital-marketing-2.jpg',
  
  // Testimonials Section
  testimonialAvatar: '/images/testimonial-avatar.png',
  starFilled: '/icons/star-filled.svg',
  starHalf: '/icons/star-half.svg',
  starEmpty: '/icons/star-empty.svg',
  quoteIconLarge: '/icons/quote-icon-large.svg',
  ellipseDecor1: '/images/ellipse-decor-1.png',
  ellipseDecor2: '/images/ellipse-decor-2.png',
  ellipseDecor3: '/images/ellipse-decor-3.png',
  ellipseDecor4: '/images/ellipse-decor-4.png',
  
  // Partners Section
  partnerLineDecor: '/icons/partner-line-decor.svg',
  partnerLogos: [
    {
      logo: '/logos/partner-logo-1.png',
      link: '#', // Add your partner link here
      alt: 'Partner 1',
    },
    {
      logo: '/logos/partner-logo-2.png',
      link: '#', // Add your partner link here
      alt: 'Partner 2',
    },
    {
      logo: '/logos/partner-logo-3.png',
      link: '#', // Add your partner link here
      alt: 'Partner 3',
    },
    {
      logo: '/logos/partner-logo-4.png',
      link: '#', // Add your partner link here
      alt: 'Partner 4',
    },
  ],
  
  // Blog Section
  blogThumb: '/images/blog-thumb-1.jpg',
  blogFeatured: '/images/blog-featured.jpg',
  arrowContinue: '/icons/arrow-continue.svg',
} as const;

