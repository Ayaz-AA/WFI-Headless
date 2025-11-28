import { assets } from '@/lib/assets';
import Image from 'next/image';
import { StarFilled, StarHalf, StarEmpty, QuoteIconLarge } from '@/components/icons';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 md:px-20">
        <h2 className="text-[68px] leading-[70px] font-['Bayon'] text-black tracking-[1px] mb-16 text-center">
          What Our Graduates Are Saying
        </h2>

        {/* Testimonial Card */}
        <div className="relative bg-gradient-to-r from-[#ff512f] to-[#f09819] rounded-[34px] p-12 min-h-[580px] overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute -left-[183px] top-[207px] w-[366px] h-[372px] opacity-50 hidden lg:block relative">
            <Image src={assets.ellipseDecor1} alt="decoration" fill className="object-contain" />
          </div>
          <div className="absolute -right-[183px] top-[207px] w-[366px] h-[372px] opacity-50 hidden lg:block relative">
            <Image src={assets.ellipseDecor3} alt="decoration" fill className="object-contain" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-[508px] mx-auto text-center">
            {/* Program Tabs */}
            <div className="flex justify-center gap-8 mb-8 text-[24px] font-semibold flex-wrap">
              <span className="text-[rgba(255,255,255,0.63)]">UI UX Design</span>
              <span className="text-[rgba(255,255,255,0.63)]">AI Generetive</span>
              <span className="text-[rgba(255,255,255,0.63)]">AI for Software Engineers</span>
              <span className="text-white">Digital Marketing</span>
            </div>

            {/* Quote Icon */}
            <div className="flex justify-center mb-6">
              <QuoteIconLarge className="w-12 h-12 text-white" />
            </div>

            {/* Testimonial Text */}
            <p className="text-white text-[24px] leading-[26px] font-bold mb-12">
              "I appreciated how they matched my personality type with the right program. The bootcamp was challenging but exactly what I needed."
            </p>

            {/* User Info */}
            <div className="bg-[rgba(247,249,252,0.86)] backdrop-blur-[0.9px] rounded-[8px] p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={assets.testimonialAvatar}
                  alt="Emily Rodriguez"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="text-[#07365c] text-base font-['Arimo'] font-bold">
                    Emily Rodriguez
                  </p>
                  <p className="text-[#6a7282] text-sm font-['Arimo']">
                    Digital Marketing Specialist
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <StarFilled className="w-4 h-4 text-yellow-400" />
                  <StarFilled className="w-4 h-4 text-yellow-400" />
                  <StarFilled className="w-4 h-4 text-yellow-400" />
                  <StarHalf className="w-4 h-4 text-yellow-400" />
                  <StarEmpty className="w-4 h-4 text-yellow-400" />
                </div>
                <span className="text-[#6a7282] text-sm ml-2">4.4/ 5</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-[#f4d3c0] rounded-b-[34px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
