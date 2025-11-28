import Image from 'next/image';
import { assets } from '@/lib/assets';
import { ArrowRight } from '@/components/icons';

const HERO_CIRCULAR_TEXT = 'OUR GRADUATES TRUST US';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <p className="hero-background-text">Where Innovation Meets</p>

        <div className="hero-grid">
          <div className="hero-text-column">
            <button className="hero-register-link" type="button">
              Register Now
              <ArrowRight className="hero-register-icon" />
            </button>

            <div className="hero-headline-group">
              <div className="hero-title-block">
                <span>Where</span>
                <span>Innovation</span>
                <span>Meets</span>
              </div>
              <p className="hero-description">
                Empowers professionals through expert-led training and career support.
              </p>
            </div>
          </div>

          <div className="hero-image-column">
            <div className="hero-image-frame">
              <Image src={assets.heroMain} alt="Hero illustration" fill priority />
            </div>
            <p className="hero-headline-accent">Tomorrow&apos;s Workforce.</p>
            <HeroCircularText />

            <div className="hero-rating-card hero-rating-card-floating">
              <div className="hero-rating-card-avatars">
                <Image src={assets.userAvatar1} alt="user avatar" width={48} height={48} />
                <Image src={assets.userAvatar2} alt="user avatar" width={48} height={48} />
                <Image src={assets.userAvatar2} alt="user avatar" width={48} height={48} />
              </div>
              <div>
                <p className="hero-rating-card-title">Trusted By 50k+ Users</p>
                <div className="hero-rating-card-meta">
                  <Image src={assets.starsRating} alt="rating" width={120} height={24} />
                  <span>Rate (5 / 4.5)</span>
                </div>
              </div>
            </div>
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
