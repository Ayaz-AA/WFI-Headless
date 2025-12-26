'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import { assets } from '@/lib/assets';
import { ArrowRight, ArrowLeft, ArrowRightNav, ArrowContinue, CheckCircle } from '@/components/icons';
import { SignupModal } from '@/components/SignupModal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HERO_CIRCULAR_TEXT = 'OUR GRADUATES TRUST US';

function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="hero-section">
      <div className="hero-container">
        <p className="hero-background-text" aria-hidden="true">
          Where Innovation Meets
        </p>

        <div className="hero-grid">
          <div className="hero-text-column">
       

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
            <button 
              className="hero-register-link" 
              type="button"
              onClick={() => setIsModalOpen(true)}
            >
              Register Now
              <ArrowRight className="hero-register-icon" />
            </button>
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

function PartnersSection() {
  return (
    <section className="partners-section">
      <div className="partners-container">
     

        <div className="partners-content">
          <div className="partners-text-column">
            <h2 className="partners-title">
              Top university partners
            </h2>
            <p className="partners-description">
              It&apos;s a crowded market, but we know the way. Cut through the fear with a companion by your side. Get access to expert knowledge that others don&apos;t have.
            </p>
          </div>

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

function ProgramsSection() {
  const sliderRef = useRef<Slider>(null);

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
      title: 'Digital Marketing 2',
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

function FeaturedProgramSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
              <button className="programs-featured-button"    type="button"
              onClick={() => setIsModalOpen(true)}>
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

function AboutSection() {
  const [activeTab, setActiveTab] = useState<'ui-ux' | 'ai-generative' | 'ai-software' | 'digital-marketing'>('ui-ux');
  const testimonialSliderRef = useRef<Slider>(null);
  const [progressKey, setProgressKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const autoplaySpeed = 3000; // 3 seconds

  const testimonials = {
    'ui-ux': [
      {
        text: 'Lorem ipsum dolor sit amet, consecteturadipiscing elit.Quis nostrud exercitation ullamco laboris nisi ut aliquip.Ex ea commodo consequat, duis aute irure dolor.',
        name: 'Emily Rodriguez',
        program: 'UI/UX Design',
        rating: 4.4,
        avatar: assets.userAvatar1,
      },
      {
        text: 'The UI/UX Design program completely transformed my career. The comprehensive curriculum and hands-on projects gave me the confidence to land my dream job at a top design agency.',
        name: 'Alex Thompson',
        program: 'UI/UX Design',
        rating: 4.6,
        avatar: assets.userAvatar2,
      },
      {
        text: 'I was amazed by the quality of instruction and the practical approach. The portfolio I built during the program helped me stand out in interviews and secure multiple job offers.',
        name: 'Maria Garcia',
        program: 'UI/UX Design',
        rating: 4.5,
        avatar: assets.userAvatar1,
      },
    ],
    'ai-generative': [
      {
        text: 'The AI Generative Program transformed my understanding of creative AI applications. The hands-on projects and expert guidance helped me build real-world solutions that I use daily in my work.',
        name: 'Sarah Chen',
        program: 'AI Generative',
        rating: 4.8,
        avatar: assets.userAvatar2,
      },
      {
        text: 'This program exceeded all my expectations. The instructors were industry experts who provided invaluable insights into the latest AI technologies and creative applications.',
        name: 'David Kim',
        program: 'AI Generative',
        rating: 4.7,
        avatar: assets.userAvatar1,
      },
      {
        text: 'The practical projects and real-world case studies made learning engaging and applicable. I now use AI tools confidently in my creative workflow.',
        name: 'Lisa Wang',
        program: 'AI Generative',
        rating: 4.9,
        avatar: assets.userAvatar2,
      },
    ],
    'ai-software': [
      {
        text: 'As a software engineer, this program gave me the tools to integrate AI into my development workflow. The practical approach and real-world examples made all the difference.',
        name: 'Michael Johnson',
        program: 'AI for Software Engineers',
        rating: 4.6,
        avatar: assets.userAvatar1,
      },
      {
        text: 'The AI for Software Engineers program was exactly what I needed to stay competitive. I learned to build AI-powered features that significantly improved our product.',
        name: 'James Wilson',
        program: 'AI for Software Engineers',
        rating: 4.8,
        avatar: assets.userAvatar2,
      },
      {
        text: 'The code examples and hands-on labs were incredibly valuable. I implemented several AI features in our production system based on what I learned.',
        name: 'Robert Brown',
        program: 'AI for Software Engineers',
        rating: 4.7,
        avatar: assets.userAvatar1,
      },
    ],
    'digital-marketing': [
      {
        text: 'The Digital Marketing program exceeded my expectations. I learned cutting-edge strategies and tools that have directly improved my campaign performance and ROI.',
        name: 'Jessica Martinez',
        program: 'Digital Marketing',
        rating: 4.7,
        avatar: assets.userAvatar2,
      },
      {
        text: 'This program helped me master modern digital marketing techniques. My campaigns now perform significantly better, and I\'ve been promoted to lead our marketing team.',
        name: 'Amanda Taylor',
        program: 'Digital Marketing',
        rating: 4.6,
        avatar: assets.userAvatar1,
      },
      {
        text: 'The comprehensive curriculum covered everything from SEO to social media marketing. The practical assignments gave me real experience I could apply immediately.',
        name: 'Jennifer Lee',
        program: 'Digital Marketing',
        rating: 4.8,
        avatar: assets.userAvatar2,
      },
    ],
  };

  const currentTestimonials = testimonials[activeTab];

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
            What Our Graduates Are Saying
          </h2>
          <p className="about-description">
            Plus, Workforce Institute provides comprehensive career support services to students after program completion. Contact our team today to discover the perfect program for your goals
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
              <p>How marketing leaders and their teams use</p>
              <p>Jasper to generate incredible value.</p>
            </div>
            <button className="about-bottom-button" type="button" onClick={() => setIsModalOpen(true)}>
              Explore More Stories
            </button>
          </div>
        </div>
      </div>
      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

function IntegrationsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
                Meet Jasper right in your tech stack
              </h3>
              <p className="integrations-card-description">
                Interface with Jasper from within your tech stack using one of our many integrations.
              </p>
              <button className="integrations-card-button" type="button" onClick={() => setIsModalOpen(true)}>
                Explore Integrations
              </button>
            </div>
          </div>

          <div className="integrations-text-column">
            <h2 className="integrations-title">
              The all-in-one career companion
            </h2>
            <p className="integrations-description">
              It&apos;s a crowded market, but we know the way. Cut through the fear with a companion by your side. Get access to expert knowledge that others don&apos;t have.
            </p>
            <button className="integrations-button" type="button" onClick={() => setIsModalOpen(true)}>
              Explore Customer Stories
            </button>
          </div>
        </div>
      </div>
      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

function AIPlatformSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <section id="ai-platform" className="ai-platform-section">
      <div className="ai-platform-container">
        <div className="ai-platform-content">
          <div className="ai-platform-text-column">
            <h2 className="ai-platform-title">
              Seamlessly bring AI into
              <br />
              your platform or product
            </h2>
            <p className="ai-platform-description">
              Call the Jasper API to create custom content or manipulate images – the only limit is your imagination.
            </p>
            <button className="ai-platform-button" type="button" onClick={() => setIsModalOpen(true)}>
              Explore Topics
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

function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-content">
          <div className="cta-column">
            <h2 className="cta-title">
              Faster outputs.
              <br />
              Better outcomes.
            </h2>
          </div>

          <div className="cta-column-spaced">
            <p className="cta-text">
              Come see why leading businesses chose Jasper for better results using artificial intelligence.
            </p>
            <div className="cta-buttons">
              <button className="cta-button cta-button-outline" type="button" onClick={() => setIsModalOpen(true)}>
                Start Free Trial
              </button>
              <button className="cta-button cta-button-filled" type="button" onClick={() => setIsModalOpen(true)}>
                Get A Demo
              </button>
            </div>
          </div>
        </div>
      </div>
      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

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
        <div className="blog-featured">
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
          <div className="blog-featured-image">
            <Image
              src={assets.blogFeatured}
              alt="Featured blog"
              fill
              className="object-cover rounded-lg"
            />
          </div>
       
        </div>

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

export default function HomeSections() {
  return (
    <>
      <HeroSection />
      <PartnersSection />
      <FeaturedProgramSection />
      <ProgramsSection />
      <AboutSection />
      <IntegrationsSection />
      <AIPlatformSection />
      <StatsSection />
      <CTASection />
      <BlogSection />
    </>
  );
}

