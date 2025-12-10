'use client';

import Image from 'next/image';
import { assets } from '@/lib/assets';
import { ArrowRight, ArrowLeft, ArrowRightNav, PlayButton, StarFilled, StarHalf, StarEmpty, QuoteIconLarge, ArrowContinue, CheckCircle } from '@/components/icons';
import { useRef, useEffect } from 'react';

const HERO_CIRCULAR_TEXT = 'OUR GRADUATES TRUST US';

// Hero Section
function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const restartVideo = () => {
      video.currentTime = 0;
      video.play().catch((error) => {
        console.error('Error playing video:', error);
      });
    };

    // Restart video every 10 seconds
    const interval = setInterval(restartVideo, 10000);

    // Initial play
    video.play().catch((error) => {
      console.error('Error playing video:', error);
    });

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-container">
        <p className="hero-background-text" aria-hidden="true">
          Where Innovation Meets
        </p>

        <div className="hero-grid">
          <div className="hero-text-column">
            <button className="hero-register-link" type="button">
              Register Now
              <ArrowRight className="hero-register-icon" />
            </button>

            <div className="hero-headline-group">
              <div className="hero-title-block" aria-label="Where innovation meets">
                <span>WHERE</span>
                <span>INNOVATION</span>
                <span>MEETS</span>
              </div>
              <p className="hero-description">
                Empowers professionals through expert-led training and career support.
              </p>
            </div>
          </div>
          <div className="hero-image-frame">
            <video
              ref={videoRef}
              src={assets.heroMain}
              width={500}
              style={{ height: 'auto' }}
              loop
              muted
              playsInline
              autoPlay
            />
          </div>
          <div className="hero-image-column">
           
            <p className="hero-headline-accent">Tomorrow&apos;s Workforce.</p>
            <HeroCircularText />
            <HeroTrustSignal />
          </div>
        </div>
      </div>
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

// Partners Section
function PartnersSection() {
  return (
    <section className="partners-section">
      <div className="partners-container">
     

        {/* Main Content */}
        <div className="partners-content">
          {/* Left Column: Title and Description */}
          <div className="partners-text-column">
            <h2 className="partners-title">
              Top university partners
            </h2>
            <p className="partners-description">
              It's a crowded market, but we know the way. Cut through the fear with a companion by your side. Get access to expert knowledge that others don't have.
            </p>
          </div>

          {/* Right Column: Checkmark Items */}
          <div className="partners-features">
            <div className="partners-feature-item">
              <CheckCircle className="partners-check-icon" />
              <p className="partners-feature-text">
                Get unlimited design inspirations. Level up your design.
              </p>
            </div>
            <div className="partners-feature-item">
              <CheckCircle className="partners-check-icon" />
              <p className="partners-feature-text">
                14+ Premium tailwind UI kits. Start with unlimited product downloads.
              </p>
            </div>
          </div>
        </div>

        {/* Partners Logos */}
        <div className="partners-list">
          {assets.partnerLogos.map((partner, index) => (
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

// Stats Section
function StatsSection() {
  const stats = [
    { value: '12M', label: 'Resumes created' },
    { value: '65M+', label: 'Resumes reviewed' },
    { value: '10M', label: 'Jobs' },
    { value: '11.2M', label: 'Users worldwide' },
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

// Programs Section
function ProgramsSection() {
  const programs = [
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
    {
      title: 'Digital Marketing',
      description: 'Join CMOs from Jasper and Webflow as they discuss.',
      image: assets.programDigitalMarketing2,
      link: '#',
    },
  ];

  return (
    <section id="programs" className="programs-section">
      <div className="programs-container">
        {/* Section Header */}
        <div className="programs-header">
          <h2 className="programs-title">
            <span className="programs-title-span">Training Solutions</span>
            <br />
            For Every Team
          </h2>
          <div className="programs-header-content">
            <p className="programs-description">
              All the features you need to take a secure, controlled & impactful approach to AI.
            </p>
            <button className="programs-button">
              Explore More Here
            </button>
          </div>
        </div>

        {/* Programs List */}
        <div className="programs-list">
          <div className="programs-scroll">
            {programs.map((program, index) => (
              <div
                key={index}
                className="program-card"
              >
                <div>
                  <div className="program-image-wrapper">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="program-title">
                    {program.title}
                  </h3>
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
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="programs-nav">
            <button className="programs-nav-button">
              <ArrowLeft className="programs-nav-icon" />
            </button>
            <button className="programs-nav-button">
              <ArrowRightNav className="programs-nav-icon" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

// Featured Program Section
function FeaturedProgramSection() {
  const CIRCULAR_TEXT = 'OUR GRADUATES TRUST US';
  
  return (
    <section className="featured-program-section">
      <div className="featured-program-decor" aria-hidden="true" />
      <div className="featured-program-container">
        <div className="programs-featured">
          {/* Top Section: Title, Description, and Button */}
          <div className="programs-featured-header">
            <div className="programs-featured-header-left">
              <h2 className="programs-featured-title">
                <span className="programs-featured-title-span">Training Solutions</span>
                <br />
                For Every Team
              </h2>
              <p className="programs-featured-description">
                At Workforce Institute, we empower professionals to advance their careers in high-demand fields through hands-on, project-driven learning. Our online training programs offer affordable pathways to valuable careers, providing:
              </p>
            </div>
            <div className="programs-featured-header-right">
              <p className="programs-featured-subtext">
                All the features you need to take a secure, controlled & impactful approach to AI.
              </p>
              <button className="programs-featured-button">
                Explore More Here
              </button>
            </div>
          </div>

          {/* Central Section: Circular Text and Image */}
          <div className="programs-featured-center">
            <div className="programs-featured-circular-wrapper">
              {/* Circular Text SVG */}
              <svg className="programs-featured-circular-text" viewBox="0 0 352 352" aria-hidden="true">
                <defs>
                  <path id="programs-circle-path" d="M176 20a156 156 0 1 1 0 312a156 156 0 1 1 0-312" />
                </defs>
                <text>
                  <textPath href="#programs-circle-path" startOffset="0%">
                    {`${CIRCULAR_TEXT} ${CIRCULAR_TEXT}`}
                  </textPath>
                </text>
              </svg>
              
              {/* Central Image with Ellipse Background */}
              <div className="programs-featured-image-wrapper">
                <div className="programs-featured-ellipse-bg">
                  <img
                    src="https://www.figma.com/api/mcp/asset/cb87b3af-47f6-40d2-ac4a-f6ad6114cc46"
                    alt=""
                    width={596}
                    height={622}
                    className="programs-featured-ellipse"
                  />
                </div>
                <div className="programs-featured-main-image">
                  <img
                    src="https://www.figma.com/api/mcp/asset/bfa51766-45b3-4197-ad5b-b5607b16e299"
                    alt="Program participant"
                    width={405}
                    height={287}
                    className="programs-featured-image-img"
                  />
                </div>
              </div>
            </div>

            {/* Decorative Lines */}
            <div className="programs-featured-line programs-featured-line-1">
              <img
                src="https://www.figma.com/api/mcp/asset/1b81b1da-99d4-46f7-83e3-d9c95afd0ae7"
                alt=""
                width={147}
                height={26}
                className="programs-featured-line-img"
              />
            </div>
            <div className="programs-featured-line programs-featured-line-2">
              <img
                src="https://www.figma.com/api/mcp/asset/178e314e-d1b1-4055-a374-813ec2ecb5e0"
                alt=""
                width={116}
                height={38}
                className="programs-featured-line-img"
              />
            </div>

            {/* Testimonial Section */}
            <div className="programs-featured-testimonial">
              <div className="programs-featured-quote-icon-wrapper">
                <img
                  src="https://www.figma.com/api/mcp/asset/3fe3f124-eaa4-4d5e-a798-ce47ae8627aa"
                  alt=""
                  width={108}
                  height={33}
                  className="programs-featured-quote-icon"
                />
              </div>
              <p className="programs-featured-quote">
                The UI/UX Program is a fantastic resource for anyone looking to enhance their design skills. It offers a comprehensive curriculum
              </p>
            </div>

            {/* Decorative Ellipse */}
            <div className="programs-featured-ellipse-decor">
              <img
                src="https://www.figma.com/api/mcp/asset/2cc55252-c673-43be-ac3e-fd97afc552ed"
                alt=""
                width={68}
                height={68}
                className="programs-featured-ellipse-small"
              />
            </div>
          </div>

          {/* Bottom Section: Our Programs Title */}
          <h2 className="programs-featured-bottom-title">
            Our Programs
          </h2>
        </div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="about-column">
            <h2 className="about-title">
              Our Programs
            </h2>
            <p className="about-text">
              At Workforce Institute, we empower professionals to advance their careers in high-demand fields through hands-on, project-driven learning. Our online training programs offer affordable pathways to valuable careers, providing:
            </p>
            <ul className="about-list">
              <li className="about-list-item">
                <span className="about-list-check">✓</span>
                <p className="about-list-text">
                  Get unlimited design inspirations. Level up your design.
                </p>
              </li>
              <li className="about-list-item">
                <span className="about-list-check">✓</span>
                <p className="about-list-text">
                  14+ Premium tailwind UI kits. Start with unlimited product downloads.
                </p>
              </li>
            </ul>
            <button className="about-button">
              Explore More Stories
            </button>
          </div>
          <div className="about-column">
            <h3 className="about-subtitle">
              The all-in-one career companion
            </h3>
            <p className="about-subtext">
              It's a crowded market, but we know the way. Cut through the fear with a companion by your side. Get access to expert knowledge that others don't have.
            </p>
            <button className="about-button">
              Explore Customer Stories
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-container">
        <h2 className="testimonials-title">
          What Our Graduates Are Saying
        </h2>

        {/* Testimonial Card */}
        <div className="testimonials-card">
          {/* Decorative Elements */}
          <div className="testimonials-decor testimonials-decor-left">
            <Image src={assets.ellipseDecor1} alt="decoration" fill className="object-contain" />
          </div>
          <div className="testimonials-decor testimonials-decor-right">
            <Image src={assets.ellipseDecor3} alt="decoration" fill className="object-contain" />
          </div>

          {/* Content */}
          <div className="testimonials-content">
            {/* Program Tabs */}
            <div className="testimonials-tabs">
              <span className="testimonials-tab">UI UX Design</span>
              <span className="testimonials-tab">AI Generetive</span>
              <span className="testimonials-tab">AI for Software Engineers</span>
              <span className="testimonials-tab-active">Digital Marketing</span>
            </div>

            {/* Quote Icon */}
            <div className="testimonials-quote-icon">
              <QuoteIconLarge />
            </div>

            {/* Testimonial Text */}
            <p className="testimonials-text">
              "I appreciated how they matched my personality type with the right program. The bootcamp was challenging but exactly what I needed."
            </p>

            {/* User Info */}
            <div className="testimonials-user">
              <div className="testimonials-user-info">
                <Image
                  src={assets.testimonialAvatar}
                  alt="Emily Rodriguez"
                  width={48}
                  height={48}
                  className="testimonials-user-avatar"
                />
                <div>
                  <p className="testimonials-user-name">
                    Emily Rodriguez
                  </p>
                  <p className="testimonials-user-role">
                    Digital Marketing Specialist
                  </p>
                </div>
              </div>
              <div className="testimonials-rating">
                <div className="testimonials-stars">
                  <StarFilled className="testimonials-star" />
                  <StarFilled className="testimonials-star" />
                  <StarFilled className="testimonials-star" />
                  <StarHalf className="testimonials-star" />
                  <StarEmpty className="testimonials-star" />
                </div>
                <span className="testimonials-rating-text">4.4/ 5</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="testimonials-progress" />
          </div>
        </div>
      </div>
    </section>
  );
}



// CTA Section
function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-content">
          {/* Left Content */}
          <div className="cta-column">
            <h2 className="cta-title">
              Faster outputs.
              <br />
              Better outcomes.
            </h2>
          </div>

          {/* Right Content */}
          <div className="cta-column-spaced">
            <p className="cta-text">
              Come see why leading businesses chose Jasper for better results using artificial intelligence.
            </p>
            <div className="cta-buttons">
              <button className="cta-button cta-button-outline">
                Start Free Trial
              </button>
              <button className="cta-button cta-button-filled">
                Get A Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Blog Section
function BlogSection() {
  const blogPosts = [
    {
      title: 'Future of ai in software development',
      date: 'October 14, 2025',
      category: 'AI Generative',
      image: assets.blogThumb,
    },
    {
      title: 'Future of ai in software development',
      date: 'October 14, 2025',
      category: 'AI Generative',
      image: assets.blogThumb,
    },
    {
      title: 'Future of ai in software development',
      date: 'October 14, 2025',
      category: 'AI Generative',
      image: assets.blogThumb,
    },
    {
      title: 'Future of ai in software development',
      date: 'October 14, 2025',
      category: 'AI Generative',
      image: assets.blogThumb,
    },
    {
      title: 'Future of ai in software development',
      date: 'October 14, 2025',
      category: 'AI Generative',
      image: assets.blogThumb,
    },
  ];

  return (
    <section id="blogs" className="blog-section">
      <div className="blog-container">
        {/* Featured Blog Post */}
        <div className="blog-featured">
          <div className="blog-featured-image">
            <Image
              src={assets.blogFeatured}
              alt="Featured blog"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="blog-featured-content">
            <h2 className="blog-featured-title">
              Future of ai in software development
            </h2>
            <p className="blog-featured-text">
              Plus, Workforce Institute provides comprehensive career support services to students after program completion. Contact our team today to discover the perfect program for your goals
            </p>
            <a href="#" className="blog-featured-link">
              <span>Continue Reading</span>
              <ArrowContinue className="blog-featured-link-icon" />
            </a>
          </div>
        </div>

        {/* Blog Posts List */}
        <div className="blog-list">
          {blogPosts.map((post, index) => (
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

// Main export component
export default function HomeSections() {
  return (
    <>
      <HeroSection />
      <PartnersSection />
      <FeaturedProgramSection />
      <ProgramsSection />
      <AboutSection />
      <TestimonialsSection />
      <StatsSection />
      <CTASection />
      <BlogSection />
    </>
  );
}

