import { assets } from '@/lib/assets';
import Image from 'next/image';
import { StarFilled, StarHalf, StarEmpty, QuoteIconLarge } from '@/components/icons';

export default function TestimonialsSection() {
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
