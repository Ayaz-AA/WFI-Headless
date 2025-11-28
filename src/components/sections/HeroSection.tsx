import Image from 'next/image';
import { assets } from '@/lib/assets';
import { ArrowRight } from '@/components/icons';

const HERO_CIRCULAR_TEXT = 'OUR GRADUATES TRUST US';

export default function HeroSection() {
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

          <div className="hero-image-column">
            <div className="hero-image-frame">
              <Image
                src={assets.heroMain}
                alt="Futuristic professional"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 640px"
              />
            </div>
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

function HeroTrustSignal() {
  return (
    <div className="hero-trust-cluster" aria-label="Trusted by learners worldwide">
      <div className="hero-trust-avatars">
        <Image src={assets.userAvatar1} alt="User avatar" width={48} height={48} />
        <Image src={assets.userAvatar2} alt="User avatar" width={48} height={48} />
        <Image src={assets.userAvatar2} alt="User avatar" width={48} height={48} />
      </div>
      <span className="hero-trust-line" aria-hidden="true" />
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
