'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import { assets } from '@/lib/assets';
import { ArrowRight, ArrowLeft, ArrowRightNav, ArrowContinue, CheckCircle } from '@/components/icons';
import { SignupModal } from '@/components/SignupModal';
import type { WPProgram, WPPartner, WPTestimonial, WPPost, HomepageContent } from '@/lib/graphql/types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HERO_CIRCULAR_TEXT = 'OUR GRADUATES TRUST US';

// Props interface for WordPress data
// All content can come from WordPress via GraphQL:
// - Dynamic content: Programs, Partners, Testimonials, Posts (from CPTs)
// - Static content: Section text (from "Homepage Settings" page with ACF fields)
interface HomeSectionsProps {
  wpPrograms?: WPProgram[];
  wpPartners?: WPPartner[];
  wpTestimonials?: WPTestimonial[];
  wpPosts?: WPPost[];
  content?: HomepageContent | null;
}

function HeroSection({ content }: { content?: HomepageContent | null }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use WordPress content if available, otherwise fall back to defaults
  const titleLine1 = content?.heroTitleLine1 || 'WHERE';
  const titleLine2 = content?.heroTitleLine2 || 'INNOVATION';
  const titleLine3 = content?.heroTitleLine3 || 'MEETS';
  const description = content?.heroDescription || 'Empowers professionals through expert-led training and career support.';
  const buttonText = content?.heroButtonText || 'Register Now';
  const accentText = content?.heroAccentText || "Tomorrow's Workforce.";

  return (
    <section className="hero-section">
      <div className="hero-container">
        <p className="hero-background-text" aria-hidden="true">
          Where Innovation Meets
        </p>

        <div className="hero-grid">
          <div className="hero-text-column">
       

            <div className="hero-headline-group">
              <div className="hero-title-block" aria-label="Where Innovation Meets Tomorrow's Workforce">
                <span>{titleLine1}</span>
                <span>{titleLine2}</span>
                <span>{titleLine3}</span>
              </div>
              <p className="hero-description">
                {description}
              </p>
            </div>
            <button 
              className="hero-register-link" 
              type="button"
              onClick={() => setIsModalOpen(true)}
            >
              {buttonText}
              <ArrowRight className="hero-register-icon" />
            </button>
          </div>
          <div className="hero-image-frame">
            <Image
              src={assets.mainbannerimage}
              alt="Career-focused training at Workforce Institute"
              width={700}
              height={500}
              style={{ height: 'auto' }}
            />
            <HeroEarCircularText />
          </div>
          <div className="hero-image-column">
           
            <p className="hero-headline-accent">{accentText}</p>
            <HeroCircularText />
            <HeroTrustSignal />
          </div>
        </div>
      </div>
      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

function HeroCircularText() {
  return (
    <svg className="hero-circular-text" viewBox="0 0 260 260" aria-hidden="true">
      <defs>
        <path id="hero-circle-path" d="M130 10a120 120 0 1 1 0 240a120 120 0 1 1 0-240" />
      </defs>
      <text>
        <textPath href="#hero-circle-path" startOffset="0%">
          {`${HERO_CIRCULAR_TEXT} ${HERO_CIRCULAR_TEXT}`}
        </textPath>
      </text>
    </svg>
  );
}

function HeroEarCircularText() {
  return (
    <svg
      className="hero-ear-circular-text"
      viewBox="0 0 120 120"
      aria-hidden="true"
    >
      <defs>
        <path
          id="hero-ear-circle-path"
          d="M60 10a50 50 0 1 1 0 100a50 50 0 1 1 0-100"
        />
      </defs>
      <text>
        <textPath href="#hero-ear-circle-path" startOffset="0%">
          0 0 0 0 0 0 0 0 0 0 0 0 0 0 
        </textPath>
      </text>
    </svg>
  );
}

function PartnersSection({ wpPartners, content }: { wpPartners?: WPPartner[]; content?: HomepageContent | null }) {
  // Transform WordPress data to component format, or use fallback
  const partners = wpPartners && wpPartners.length > 0
    ? wpPartners.map((partner) => ({
        logo: partner.featuredImage?.node?.sourceUrl || '/logos/partner-logo-1.png',
        link: partner.partnerFields?.websiteUrl || '#',
        alt: partner.title,
      }))
    : assets.partnerLogos;

  // Use WordPress content if available, otherwise fall back to defaults
  const title = content?.partnersTitle || 'Top university partners';
  const description = content?.partnersDescription || "It's a crowded market, but we know the way. Cut through the fear with a companion by your side. Get access to expert knowledge that others don't have.";
  const feature1 = content?.partnersFeature1 || 'Get unlimited design inspirations. Level up your design.';
  const feature2 = content?.partnersFeature2 || '14+ Premium tailwind UI kits. Start with unlimited product downloads.';

  return (
    <section className="partners-section">
      <div className="partners-container">
     

        <div className="partners-content">
          <div className="partners-text-column">
            <h2 className="partners-title">
              {title}
            </h2>
            <p className="partners-description">
              {description}
            </p>
          </div>

          <div className="partners-features">
            <div className="partners-feature-item">
              <CheckCircle className="partners-check-icon" />
              <p className="partners-feature-text">
                {feature1}
              </p>
            </div>
            <div className="partners-feature-item">
              <CheckCircle className="partners-check-icon" />
              <p className="partners-feature-text">
                {feature2}
              </p>
            </div>
          </div>
        </div>

        <div className="partners-list">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.link}
              className="partners-logo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={partner.alt}
            >
              <Image 
                src={partner.logo} 
                alt={partner.alt} 
                fill
                className="object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}


function HeroTrustSignal() {
  return (
    <div className="hero-trust-cluster" aria-label="Trusted by learners worldwide">
      <span className="hero-trust-line" aria-hidden="true" />
      <div className="hero-trust-avatars">
        <Image src={assets.userAvatar1} alt="User avatar" width={48} height={48} />
        <Image src={assets.userAvatar2} alt="User avatar" width={48} height={48} />
        <Image src={assets.userAvatar2} alt="User avatar" width={48} height={48} />
      </div>
      <div className="hero-trust-copy">
        <p>
          Trusted By <strong>50k+ Users</strong>
        </p>
        <div className="hero-trust-rating">
          <Image src={assets.starsRating} alt="Rating 4.5 out of 5" width={120} height={24} />
          <span>Rate (5 / 4.5)</span>
        </div>
      </div>
    </div>
  );
}

function StatsSection({ content }: { content?: HomepageContent | null }) {
  // Use WordPress content if available, otherwise fall back to defaults
  const stats = [
    { value: content?.stat1Value || '12M', label: content?.stat1Label || 'Resumes created' },
    { value: content?.stat2Value || '65M+', label: content?.stat2Label || 'Resumes reviewed' },
    { value: content?.stat3Value || '10M', label: content?.stat3Label || 'Jobs' },
    { value: content?.stat4Value || '11.2M', label: content?.stat4Label || 'Users worldwide' },
  ];

  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-list">
          {stats.map((stat, index) => (
            <div key={index} className="stats-item">
              <h3 className="stats-value">
                {stat.value}
              </h3>
              <p className="stats-label">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Fallback data for when WordPress data is unavailable
const FALLBACK_PROGRAMS = [
  {
    title: 'AI Generative',
    description: 'Join CMOs from Jasper and Webflow as they discuss.',
    image: assets.programAIGenerative,
    link: '#',
  },
  {
    title: 'UI UX Design',
    description: 'Join CMOs from Jasper and Webflow as they discuss.',
    image: assets.programUIUX,
    link: '#',
  },
  {
    title: 'Digital Marketing',
    description: 'Join CMOs from Jasper and Webflow as they discuss.',
    image: assets.programDigitalMarketing1,
    link: '#',
  },
];

function ProgramsSection({ wpPrograms }: { wpPrograms?: WPProgram[] }) {
  const sliderRef = useRef<Slider>(null);

  // Transform WordPress data to component format, or use fallback
  const programs = wpPrograms && wpPrograms.length > 0
    ? wpPrograms.map((program) => ({
        title: program.title,
        description: program.programFields?.description || 'Discover this amazing program.',
        image: program.featuredImage?.node?.sourceUrl || assets.programAIGenerative,
        link: `/programs/${program.slug}`, // Use slug-based URL
      }))
    : FALLBACK_PROGRAMS;

  const markEdgeSlides = () => {
    const carousel = document.querySelector('.programs-carousel');
    if (carousel) {
      const slides = carousel.querySelectorAll('.slick-slide');
      slides.forEach((slide) => {
        slide.classList.remove('slick-edge');
      });
      
      const centerSlide = carousel.querySelector('.slick-slide.slick-center');
      if (centerSlide) {
        const prevSlide = centerSlide.previousElementSibling as HTMLElement;
        const nextSlide = centerSlide.nextElementSibling as HTMLElement;
        
        if (prevSlide && prevSlide.classList.contains('slick-slide')) {
          prevSlide.classList.add('slick-edge');
        }
        if (nextSlide && nextSlide.classList.contains('slick-slide')) {
          nextSlide.classList.add('slick-edge');
        }
      }
    }
  };

  const handleAfterChange = () => {
    markEdgeSlides();
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    centerMode: true,
    centerPadding: '0px',
    afterChange: handleAfterChange,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
          centerPadding: '0px',
          afterChange: handleAfterChange,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
          centerPadding: '0px',
          afterChange: handleAfterChange,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
        },
      },
    ],
  };

  const goToPrevious = () => {
    sliderRef.current?.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      markEdgeSlides();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="programs" className="programs-section">
      <div className="programs-container">
        <div className="programs-header">
          <h2 className="programs-title">
            <span className="programs-title-span">Our Programs</span>
          </h2>
        </div>

        <div className="programs-list-wrapper">
          <div className="programs-list">
            <Slider
              ref={sliderRef}
              {...sliderSettings}
              className="programs-carousel"
            >
            {programs.map((program, index) => (
              <div key={index} className="program-slide">
                <div className="program-card">
                  <div>
                    <div className="program-image-wrapper">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <strong className="program-title">
                      {program.title}
                    </strong>
                    <p className="program-description">
                      {program.description}
                    </p>
                  </div>
                  <a
                    href={program.link}
                    className="program-link"
                  >
                    Learn More
                    <ArrowRight className="program-link-icon" />
                  </a>
                </div>
              </div>
            )            )}
            </Slider>

            <div className="programs-nav">
              <button 
                className="programs-nav-button"
                onClick={goToPrevious}
                aria-label="Previous slide"
              >
                <ArrowLeft className="programs-nav-icon" />
              </button>
              <button 
                className="programs-nav-button"
                onClick={goToNext}
                aria-label="Next slide"
              >
                <ArrowRightNav className="programs-nav-icon" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function FeaturedProgramSection({ content }: { content?: HomepageContent | null }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Use WordPress content if available, otherwise fall back to defaults
  const titleHighlight = content?.trainingTitleHighlight || 'Training Solutions';
  const titleRest = content?.trainingTitleRest || 'For Every Team';
  const description = content?.trainingDescription || 'At Workforce Institute, we empower professionals to advance their careers in high-demand fields through hands-on, project-driven learning. Our online training programs offer affordable pathways to valuable careers, providing:';
  const subtext = content?.trainingSubtext || 'All the features you need to take a secure, controlled & impactful approach to AI.';
  const buttonText = content?.trainingButtonText || 'Explore More Here';

  const testimonials = [
    {
      id: 1,
      name: 'UI/UX Program Graduate',
      program: 'The UI/UX Program',
      text: 'The UI/UX Program is a fantastic resource for anyone looking to enhance their design skills. It offers a comprehensive curriculum and practical projects.',
      avatar: assets.userAvatar1,
    },
    {
      id: 2,
      name: 'AI Generative Graduate',
      program: 'The AI Generative Program',
      text: 'The AI Generative Program helped me understand how to apply AI in real-world scenarios and build impactful solutions for my team.',
      avatar: assets.userAvatar2,
    },
  ];

  return (
    <section className="featured-program-section">
      <div className="featured-program-container">
        <div className="programs-featured">
          <div className="programs-featured-header">
            <div className="programs-featured-header-left">
              <h2 className="programs-featured-title">
                <span className="programs-featured-title-span">{titleHighlight}</span>
                <br />
                {titleRest}
              </h2>
              <p className="programs-featured-description">
                {description}
              </p>
            </div>
            <div className="programs-featured-header-right">
              <p className="programs-featured-subtext">
                {subtext}
              </p>
              <button className="programs-featured-button" type="button"
              onClick={() => setIsModalOpen(true)}>
                {buttonText}
              </button>
            </div>
          </div>
          <div className="programs-featured-mid-img">
            <Image
              src="/images/middle bg.png"
              alt=""
              width={650}
              height={650}
              className="programs-featured-mid-img-img"
              style={{ height: 'auto' }}
            />
          </div>
        </div>
      </div>
      <div className="vertical-testimonial-carousel">
        <div className="vertical-testimonial-window" aria-label="Student testimonials">
          <Slider
            className="vertical-testimonial-track"
            vertical={true}
            verticalSwiping={true}
            slidesToShow={1}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={2000}
            infinite={true}
            speed={500}
            arrows={false}
            dots={false}
            pauseOnHover={false}
          >
            {testimonials.map((testimonial, index) => (
              <article
                key={`${testimonial.id}-${index}`}
                className="vertical-testimonial-card"
              >
                <div className="vertical-testimonial-avatar">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                  />
                </div>

                <div className="vertical-testimonial-body">
                  <div className="vertical-testimonial-stars">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Image
                        key={starIndex}
                        src={assets.starPng}
                        alt="Star"
                        width={16}
                        height={16}
                      />
                    ))}
                  </div>
                  <p className="vertical-testimonial-text">
                    <span className="vertical-testimonial-program">
                      {testimonial.program}
                    </span>{' '}
                    {testimonial.text}
                  </p>
                </div>
              </article>
            ))}
          </Slider>
        </div>
      </div>
      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

// Fallback testimonials data
const FALLBACK_TESTIMONIALS = {
  'ui-ux': [
    { text: 'Lorem ipsum dolor sit amet, consecteturadipiscing elit. Quis nostrud exercitation ullamco laboris nisi ut aliquip. Ex ea commodo consequat, duis aute irure dolor.', name: 'Emily Rodriguez', program: 'UI/UX Design', rating: 4.4, avatar: assets.userAvatar1 },
    { text: 'The UI/UX Design program completely transformed my career. The comprehensive curriculum and hands-on projects gave me the confidence to land my dream job at a top design agency.', name: 'Alex Thompson', program: 'UI/UX Design', rating: 4.6, avatar: assets.userAvatar2 },
    { text: 'I was amazed by the quality of instruction and the practical approach. The portfolio I built during the program helped me stand out in interviews and secure multiple job offers.', name: 'Maria Garcia', program: 'UI/UX Design', rating: 4.5, avatar: assets.userAvatar1 },
  ],
  'ai-generative': [
    { text: 'The AI Generative Program gave me practical skills I use daily at work. My productivity has increased significantly since completing the course.', name: 'Sarah Chen', program: 'AI Generative', rating: 4.8, avatar: assets.userAvatar2 },
    { text: 'Exceeded all my expectations. The instructors are industry experts who truly understand real-world applications of AI.', name: 'David Kim', program: 'AI Generative', rating: 4.7, avatar: assets.userAvatar1 },
  ],
  'ai-software': [
    { text: 'This program gave me the tools to integrate AI into my development workflow. I received a promotion within 2 months of completing it.', name: 'Michael Johnson', program: 'AI for Software Engineers', rating: 4.9, avatar: assets.userAvatar1 },
    { text: 'Exactly what I needed to stay competitive in the job market. The hands-on projects were particularly valuable.', name: 'James Wilson', program: 'AI for Software Engineers', rating: 4.8, avatar: assets.userAvatar2 },
  ],
  'digital-marketing': [
    { text: 'The Digital Marketing program helped me transition from traditional marketing to digital. Now leading campaigns for major brands!', name: 'Jessica Martinez', program: 'Digital Marketing', rating: 4.7, avatar: assets.userAvatar2 },
    { text: 'Comprehensive coverage of SEO, paid ads, and analytics. The career support team helped me land my dream job.', name: 'Amanda Taylor', program: 'Digital Marketing', rating: 4.8, avatar: assets.userAvatar1 },
  ],
};

// Helper to group WP testimonials by program
function groupTestimonialsByProgram(wpTestimonials: WPTestimonial[]) {
  const grouped: Record<string, Array<{ text: string; name: string; program: string; rating: number; avatar: string }>> = {
    'ui-ux': [],
    'ai-generative': [],
    'ai-software': [],
    'digital-marketing': [],
  };

  wpTestimonials.forEach((t) => {
    // Handle programName - could be string, array, or object from ACF
    let programName = '';
    const rawProgramName = t.testimonialFields?.programName;
    if (typeof rawProgramName === 'string') {
      programName = rawProgramName;
    } else if (Array.isArray(rawProgramName)) {
      programName = rawProgramName[0] || '';
    } else if (rawProgramName && typeof rawProgramName === 'object') {
      programName = (rawProgramName as { value?: string; label?: string }).label || 
                    (rawProgramName as { value?: string; label?: string }).value || '';
    }

    const item = {
      text: t.testimonialFields?.quote || '',
      name: t.testimonialFields?.name || t.title,
      program: programName,
      rating: t.testimonialFields?.rating || 5,
      avatar: t.featuredImage?.node?.sourceUrl || assets.userAvatar1,
    };

    // Safely convert to lowercase
    const programLower = String(programName).toLowerCase();

    // Map program names to tab keys
    if (programLower.includes('ui') || programLower.includes('ux')) {
      grouped['ui-ux'].push(item);
    } else if (programLower.includes('ai generative') || programLower.includes('generative')) {
      grouped['ai-generative'].push(item);
    } else if (programLower.includes('software') || programLower.includes('engineer')) {
      grouped['ai-software'].push(item);
    } else if (programLower.includes('marketing')) {
      grouped['digital-marketing'].push(item);
    } else {
      // Default to first category if no match
      grouped['ui-ux'].push(item);
    }
  });

  return grouped;
}

function AboutSection({ wpTestimonials, content }: { wpTestimonials?: WPTestimonial[]; content?: HomepageContent | null }) {
  const [activeTab, setActiveTab] = useState<'ui-ux' | 'ai-generative' | 'ai-software' | 'digital-marketing'>('ui-ux');
  const testimonialSliderRef = useRef<Slider>(null);
  const [progressKey, setProgressKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const autoplaySpeed = 3000; // 3 seconds

  // Use WordPress content for section text
  const sectionTitle = content?.testimonialsTitle || 'What Our Graduates Are Saying';
  const sectionDescription = content?.testimonialsDescription || 'Plus, Workforce Institute provides comprehensive career support services to students after program completion. Contact our team today to discover the perfect program for your goals';
  const bottomLine1 = content?.testimonialsBottomLine1 || 'How marketing leaders and their teams use';
  const bottomLine2 = content?.testimonialsBottomLine2 || 'Jasper to generate incredible value.';
  const buttonText = content?.testimonialsButtonText || 'Explore More Stories';

  // Use WordPress testimonials if available, otherwise fallback
  const testimonials = wpTestimonials && wpTestimonials.length > 0
    ? groupTestimonialsByProgram(wpTestimonials)
    : FALLBACK_TESTIMONIALS;

  // Ensure each category has at least fallback data
  const safeTestimonials = {
    'ui-ux': testimonials['ui-ux'].length > 0 ? testimonials['ui-ux'] : FALLBACK_TESTIMONIALS['ui-ux'],
    'ai-generative': testimonials['ai-generative'].length > 0 ? testimonials['ai-generative'] : FALLBACK_TESTIMONIALS['ai-generative'],
    'ai-software': testimonials['ai-software'].length > 0 ? testimonials['ai-software'] : FALLBACK_TESTIMONIALS['ai-software'],
    'digital-marketing': testimonials['digital-marketing'].length > 0 ? testimonials['digital-marketing'] : FALLBACK_TESTIMONIALS['digital-marketing'],
  } as {
    'ui-ux': Array<{ text: string; name: string; program: string; rating: number; avatar: string }>;
    'ai-generative': Array<{ text: string; name: string; program: string; rating: number; avatar: string }>;
    'ai-software': Array<{ text: string; name: string; program: string; rating: number; avatar: string }>;
    'digital-marketing': Array<{ text: string; name: string; program: string; rating: number; avatar: string }>;
  };

  const currentTestimonials = safeTestimonials[activeTab];

  const goToPrevious = () => {
    testimonialSliderRef.current?.slickPrev();
  };

  const goToNext = () => {
    testimonialSliderRef.current?.slickNext();
  };

  useEffect(() => {
    if (testimonialSliderRef.current) {
      testimonialSliderRef.current.slickGoTo(0);
    }
    setProgressKey(prev => prev + 1);
  }, [activeTab]);

  const handleAfterChange = () => {
    setProgressKey(prev => prev + 1);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {Array.from({ length: fullStars }).map((_, i) => (
          <Image key={`full-${i}`} src={assets.starPng} alt="Star" width={16} height={16} />
        ))}
        {hasHalfStar && (
          <Image src={assets.starPng} alt="Half star" width={16} height={16} style={{ opacity: 0.5 }} />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Image key={`empty-${i}`} src={assets.starPng} alt="Empty star" width={16} height={16} style={{ opacity: 0.3 }} />
        ))}
      </>
    );
  };

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-header">
          <h2 className="about-title">
            {sectionTitle}
          </h2>
          <p className="about-description">
            {sectionDescription}
          </p>
        </div>

        <div className="about-testimonial-card">
          <div className="about-decor about-decor-left">
            <Image src={assets.ellipseDecor1} alt="decoration" fill className="object-contain" />
          </div>
       

          <div className="about-tabs">
            <button
              className={`about-tab ${activeTab === 'ui-ux' ? 'about-tab-active' : ''}`}
              onClick={() => setActiveTab('ui-ux')}
            >
              UI UX Design
            </button>
            <button
              className={`about-tab ${activeTab === 'ai-generative' ? 'about-tab-active' : ''}`}
              onClick={() => setActiveTab('ai-generative')}
            >
              AI Generetive
            </button>
            <button
              className={`about-tab ${activeTab === 'ai-software' ? 'about-tab-active' : ''}`}
              onClick={() => setActiveTab('ai-software')}
            >
              AI for Software Engineers
            </button>
            <button
              className={`about-tab ${activeTab === 'digital-marketing' ? 'about-tab-active' : ''}`}
              onClick={() => setActiveTab('digital-marketing')}
            >
              Digital Marketing
            </button>
          </div>

          <div className="about-quote-icon">
          <Image src="/images/testimonial-qoute.png" alt="quote icon" width={48} height={48} />
          </div>

          <div className="about-testimonial-slider-wrapper">
            <Slider
              ref={testimonialSliderRef}
              dots={false}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              arrows={false}
              autoplay={true}
              autoplaySpeed={autoplaySpeed}
              pauseOnHover={false}
              centerMode={false}
              fade={true}
              cssEase="linear"
              afterChange={handleAfterChange}
            >
              {currentTestimonials.map((testimonial, index) => (
                <div key={index} className="about-testimonial-uiux">
                  <p className="about-testimonial-text">
                    {testimonial.text}
                  </p>

                  <div className="about-user-card">
                    <div className="about-user-info">
                      <div className="about-user-avatar">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="about-avatar-img"
                        />
                      </div>
                      <div className="about-user-details">
                        <p className="about-user-name">{testimonial.name}</p>
                        <p className="about-user-program">{testimonial.program}</p>
                      </div>
                    </div>
                    <div className="about-rating">
                      <div className="about-stars">
                        {renderStars(testimonial.rating)}
                      </div>
                      <p className="about-rating-text">{testimonial.rating}/ 5</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
  
          <div className="about-progress-bar">
            <div 
              key={progressKey}
              className="about-progress-bar-fill" 
            />
          </div>
        </div>

        <div className="about-bottom-nav">
          <button className="about-nav-button" onClick={goToPrevious} aria-label="Previous">
            <ArrowLeft className="about-nav-icon" />
          </button>
          <button className="about-nav-button" onClick={goToNext} aria-label="Next">
            <ArrowRightNav className="about-nav-icon" />
          </button>
        </div>

        <div className="about-bottom">
          <div className="about-bottom-content">
            <div className="about-bottom-text">
              <p>{bottomLine1}</p>
              <p>{bottomLine2}</p>
            </div>
            <button className="about-bottom-button" type="button" onClick={() => setIsModalOpen(true)}>
              {buttonText}
            </button>
          </div>
        </div>
      </div>
      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

function IntegrationsSection({ content }: { content?: HomepageContent | null }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use WordPress content if available, otherwise fall back to defaults
  const cardTitle = content?.integrationsCardTitle || 'Meet Jasper right in your tech stack';
  const cardDescription = content?.integrationsCardDescription || 'Interface with Jasper from within your tech stack using one of our many integrations.';
  const cardButtonText = content?.integrationsCardButtonText || 'Explore Integrations';
  const mainTitle = content?.integrationsMainTitle || 'The all-in-one career companion';
  const mainDescription = content?.integrationsMainDescription || "It's a crowded market, but we know the way. Cut through the fear with a companion by your side. Get access to expert knowledge that others don't have.";
  const mainButtonText = content?.integrationsMainButtonText || 'Explore Customer Stories';

  return (
    <section id="integrations" className="integrations-section">
      <div className="integrations-container">
        <div className="integrations-content">
          <div className="integrations-card">
            <div className="integrations-card-image-wrapper">
              <Image
                src={assets.futuristicHandDesign}
                alt="Futuristic hand design"
                fill
                className="integrations-card-image"
              />
            </div>
            <div className="integrations-card-content">
              <h3 className="integrations-card-title">
                {cardTitle}
              </h3>
              <p className="integrations-card-description">
                {cardDescription}
              </p>
              <button className="integrations-card-button" type="button" onClick={() => setIsModalOpen(true)}>
                {cardButtonText}
              </button>
            </div>
          </div>

          <div className="integrations-text-column">
            <h2 className="integrations-title">
              {mainTitle}
            </h2>
            <p className="integrations-description">
              {mainDescription}
            </p>
            <button className="integrations-button" type="button" onClick={() => setIsModalOpen(true)}>
              {mainButtonText}
            </button>
          </div>
        </div>
      </div>
      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

function AIPlatformSection({ content }: { content?: HomepageContent | null }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use WordPress content if available, otherwise fall back to defaults
  const titleLine1 = content?.aiPlatformTitleLine1 || 'Seamlessly bring AI into';
  const titleLine2 = content?.aiPlatformTitleLine2 || 'your platform or product';
  const description = content?.aiPlatformDescription || 'Call the Jasper API to create custom content or manipulate images – the only limit is your imagination.';
  const buttonText = content?.aiPlatformButtonText || 'Explore Topics';

  return (
    <section id="ai-platform" className="ai-platform-section">
      <div className="ai-platform-container">
        <div className="ai-platform-content">
          <div className="ai-platform-text-column">
            <h2 className="ai-platform-title">
              {titleLine1}
              <br />
              {titleLine2}
            </h2>
            <p className="ai-platform-description">
              {description}
            </p>
            <button className="ai-platform-button" type="button" onClick={() => setIsModalOpen(true)}>
              {buttonText}
            </button>
          </div>

          <div className="ai-platform-illustration">
            <Image
              src={assets.aiPlatformIllustration}
              alt="AI platform integration illustration"
              width={423}
              height={332}
              className="ai-platform-illustration-img"
            />
          </div>
        </div>
      </div>
      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

function CTASection({ content }: { content?: HomepageContent | null }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use WordPress content if available, otherwise fall back to defaults
  const titleLine1 = content?.ctaTitleLine1 || 'Faster outputs.';
  const titleLine2 = content?.ctaTitleLine2 || 'Better outcomes.';
  const description = content?.ctaDescription || 'Come see why leading businesses chose Jasper for better results using artificial intelligence.';
  const button1Text = content?.ctaButton1Text || 'Start Free Trial';
  const button2Text = content?.ctaButton2Text || 'Get A Demo';

  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-content">
          <div className="cta-column">
            <h2 className="cta-title">
              {titleLine1}
              <br />
              {titleLine2}
            </h2>
          </div>

          <div className="cta-column-spaced">
            <p className="cta-text">
              {description}
            </p>
            <div className="cta-buttons">
              <button className="cta-button cta-button-outline" type="button" onClick={() => setIsModalOpen(true)}>
                {button1Text}
              </button>
              <button className="cta-button cta-button-filled" type="button" onClick={() => setIsModalOpen(true)}>
                {button2Text}
              </button>
            </div>
          </div>
        </div>
      </div>
      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

// FAQ data
const FAQ_DATA = [
  {
    question: 'What is Workforce Institute?',
    answer: 'Workforce Institute is a career-focused education provider that offers immersive, skills-based bootcamps designed to prepare learners for real-world roles. Our programs focus on in-demand skills, hands-on training, and practical experience aligned with today\'s job market.',
  },
  {
    question: 'Are Workforce Institute bootcamps worth it?',
    answer: 'Yes. Workforce Institute bootcamps are designed to help learners gain job-ready skills in high-growth industries. Our hands-on, industry-aligned programs focus on real tools, real projects, and real outcomes—making them a strong alternative to traditional education paths.',
  },
  {
    question: 'Does Workforce Institute partner with universities?',
    answer: 'Yes. Workforce Institute partners with universities across the United States to deliver accredited, university-powered bootcamps. These partnerships combine academic credibility with practical, career-focused training.',
  },
  {
    question: 'What programs does Workforce Institute offer?',
    answer: 'Workforce Institute offers bootcamps in high-demand fields such as Digital Marketing, UI/UX Design, AI and Generative technologies, and other career-focused disciplines. Each program is designed to help learners build in-demand skills and advance their careers.',
  },
  {
    question: 'Are Workforce Institute programs online?',
    answer: 'Yes. All Workforce Institute bootcamps are delivered online, allowing learners to study from anywhere while following a structured, instructor-led learning experience.',
  },
  {
    question: 'Who are Workforce Institute bootcamps for?',
    answer: 'Our programs are ideal for career switchers, professionals looking to upskill or reskill, recent graduates, and anyone seeking practical, job-ready training without committing to a traditional degree.',
  },
  {
    question: 'Do Workforce Institute bootcamps provide hands-on experience?',
    answer: 'Yes. Workforce Institute bootcamps emphasize hands-on learning through real-world projects, practical exercises, and industry-relevant tools. This approach helps learners build confidence and practical experience employers value.',
  },
  {
    question: 'How long are Workforce Institute bootcamps?',
    answer: 'Program lengths vary depending on the discipline, but all Workforce Institute bootcamps are designed to deliver focused, immersive training in a shorter time frame than traditional degree programs.',
  },
  {
    question: 'Does Workforce Institute offer career support?',
    answer: 'Yes. Workforce Institute provides career-focused guidance designed to help learners understand career paths, develop relevant skills, and position themselves for new opportunities in the job market.',
  },
  {
    question: 'How do I know which bootcamp is right for me?',
    answer: 'Workforce Institute offers a free career assessment to help you identify which program aligns best with your skills, interests, and career goals.',
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <h2 className="faq-title">Frequently Asked Questions</h2>
        </div>
        
        <div className="faq-list">
          {FAQ_DATA.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className={`faq-question ${openIndex === index ? 'faq-question-active' : ''}`}
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <svg 
                  className={`faq-icon ${openIndex === index ? 'faq-icon-rotated' : ''}`}
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className={`faq-answer ${openIndex === index ? 'faq-answer-open' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-cta">
          <button className="faq-cta-button" type="button" onClick={() => setIsModalOpen(true)}>
            Start Your Free Assessment
          </button>
        </div>
      </div>
      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

// Fallback blog posts
const FALLBACK_BLOG_POSTS = [
  { title: 'The Future of AI in Software Development', date: 'October 14, 2025', category: 'AI & Generative Technology', image: assets.blogThumb, slug: '/blog' },
  { title: 'Top UI/UX Design Trends for 2026', date: 'October 10, 2025', category: 'UI/UX Design', image: assets.blogThumb, slug: '/blog' },
  { title: 'Digital Marketing Strategies That Drive Results', date: 'October 5, 2025', category: 'Digital Marketing', image: assets.blogThumb, slug: '/blog' },
];

// Helper to format date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function BlogSection({ wpPosts }: { wpPosts?: WPPost[] }) {
  // Transform WordPress posts to component format, or use fallback
  const blogPosts = wpPosts && wpPosts.length > 0
    ? wpPosts.map((post) => ({
        title: post.title,
        date: formatDate(post.date),
        category: post.categories?.nodes?.[0]?.name || 'General',
        image: post.featuredImage?.node?.sourceUrl || assets.blogThumb,
        slug: `/blog/${post.slug}`,
      }))
    : FALLBACK_BLOG_POSTS;

  // Get featured post (first one) and remaining posts
  const featuredPost = blogPosts[0];
  const remainingPosts = blogPosts.slice(1);

  return (
    <section id="blogs" className="blog-section">
      <div className="blog-container">
        <div className="blog-featured">
        <div className="blog-featured-content">
            <h2 className="blog-featured-title">
              {featuredPost?.title || 'The Future of AI in Software Development'}
            </h2>
            <p className="blog-featured-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis nostrud exercitation ullamco laboris nisi ut aliquip. Ex ea commodo consequat, duis aute irure dolor.
            </p>
            <a href={featuredPost?.slug || '#'} className="blog-featured-link">
              <span>Continue Reading</span>
              <ArrowContinue className="blog-featured-link-icon" />
            </a>
          </div>
          <div className="blog-featured-image">
            <Image
              src={featuredPost?.image || assets.blogFeatured}
              alt={featuredPost?.title || 'Featured blog'}
              fill
              className="object-cover rounded-lg"
            />
          </div>
       
        </div>

        <div className="blog-list">
          {remainingPosts.map((post, index) => (
            <div
              key={index}
              className="blog-card"
            >
              <div className="blog-card-content">
                <div className="blog-card-image">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="blog-card-text">
                  <div className="blog-card-category">
                    <span className="blog-card-category-text">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="blog-card-title">
                    {post.title}
                  </h3>
                  <p className="blog-card-date">
                    {post.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomeSections({ 
  wpPrograms, 
  wpPartners, 
  wpTestimonials, 
  wpPosts,
  content
}: HomeSectionsProps) {
  return (
    <>
      <HeroSection content={content} />
      <PartnersSection wpPartners={wpPartners} content={content} />
      <FeaturedProgramSection content={content} />
      <ProgramsSection wpPrograms={wpPrograms} />
      <AboutSection wpTestimonials={wpTestimonials} content={content} />
      <IntegrationsSection content={content} />
      <AIPlatformSection content={content} />
      <StatsSection content={content} />
      <CTASection content={content} />
      <BlogSection wpPosts={wpPosts} />
    </>
  );
}

