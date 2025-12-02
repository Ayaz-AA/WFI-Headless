import { assets } from '@/lib/assets';
import Image from 'next/image';
import { ArrowLeft, ArrowRightNav, ArrowRight, PlayButton } from '@/components/icons';

export default function ProgramsSection() {
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

        {/* Featured Program Card */}
        <div className="programs-featured">
          <div className="programs-featured-image">
            <Image
              src={assets.programVideoThumb}
              alt="Program"
              width={405}
              height={287}
              className="programs-featured-image-img"
            />
            <div className="programs-featured-play">
              <PlayButton className="programs-featured-play-icon" />
            </div>
          </div>
          <div className="programs-featured-content">
            <Image src={assets.quoteIcon} alt="quote" width={108} height={33} />
            <p className="programs-featured-quote">
              The UI/UX Program is a fantastic resource for anyone looking to enhance their design skills. It offers a comprehensive curriculum
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
