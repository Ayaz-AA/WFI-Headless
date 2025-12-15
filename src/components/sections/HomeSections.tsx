'use client';

import Image from 'next/image';
import { assets } from '@/lib/assets';
import { ArrowRight, ArrowLeft, ArrowRightNav, StarFilled, StarHalf, StarEmpty, QuoteIconLarge, ArrowContinue, CheckCircle } from '@/components/icons';
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import AutoHeight from "embla-carousel-auto-height";
import { Card, CardContent } from "@/components/ui/card";

const HERO_CIRCULAR_TEXT = 'OUR GRADUATES TRUST US';

// Hero Section
function HeroSection() {
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
            <Image
              src={assets.mainbannerimage}
              alt="Main banner"
              width={700}
              height={500}
              style={{ height: 'auto' }}
            />
            <HeroEarCircularText />
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
              It&apos;s a crowded market, but we know the way. Cut through the fear with a companion by your side. Get access to expert knowledge that others don&apos;t have.
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

// Testimonials data
const TESTIMONIALS_DATA = [
  {
    id: 1,
    content: 'The UI/UX Program is a fantastic resource for anyone looking to enhance their design skills. It offers a comprehensive curriculum',
    rating: 4.9,
    avatar: assets.testimonialAvatar,
  },
  {
    id: 2,
    content: 'The UI/UX program really stood out to me on day one. Very wellorganized and put together. I enjoyed the weekly zoom lectures and was able to get my questions answered promptly.',
    rating: 4.4,
    avatar: assets.testimonialAvatar,
  },
  {
    id: 3,
    content: 'I have signed up for the 24-week immersive program for UX/UI design. The 24-weeks with the immersive program has given me new experiences and helped me develop career skills,',
    rating: 4.4,
    avatar: assets.testimonialAvatar,
  },
  {
    id: 4,
    content: 'Feeling thankful that I found this program at the right moment in my life. For a while I was contemplating changing careers but felt hesitant to do so because I lacked certain skills.',
    rating: 4.4,
    avatar: assets.testimonialAvatar,
  },
];

// Testimonials Carousel Component
function TestimonialsCarousel() {
  const testimonials = TESTIMONIALS_DATA;
  const [api, setApi] = useState<CarouselApi>();
  const [, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (!api) return;

    // Auto-advance carousel every 3 seconds
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [api]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarFilled key={i} className="testimonials-star" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="testimonials-star" />);
    }
    while (stars.length < 5) {
      stars.push(<StarEmpty key={`empty-${stars.length}`} className="testimonials-star" />);
    }
    return stars;
  };

  return (
    <div className="testimonials-carousel-wrapper">
      <Carousel
        orientation="vertical"
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[AutoHeight()]}
        className="w-full"
      >
        <CarouselContent className="-mt-1">
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.id}
              className="testimonials-carousel-item"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="testimonials-user">
                    <div className="testimonials-user-info">
                      <Image
                        src={testimonial.avatar}
                        alt="Testimonial"
                        width={48}
                        height={48}
                        className="testimonials-user-avatar"
                      />
                      <div>
                        <div className="testimonials-rating">
                          <div className="testimonials-stars">
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>
                        <p className="testimonials-user-role">
                          {testimonial.content}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

// Featured Program Section
function FeaturedProgramSection() {
  return (
    <section className="featured-program-section">
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
          <TestimonialsCarousel />
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
              It&apos;s a crowded market, but we know the way. Cut through the fear with a companion by your side. Get access to expert knowledge that others don&apos;t have.
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
              &quot;I appreciated how they matched my personality type with the right program. The bootcamp was challenging but exactly what I needed.&quot;
            </p>

           

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

