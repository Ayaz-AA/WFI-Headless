import { assets } from '@/lib/assets';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 h-[77px]">
      <div className="max-w-[1440px] mx-auto h-full flex items-center justify-between px-10">
        {/* Logo */}
        <div className="h-[42px] w-[146px] relative">
          <Image 
            src={assets.wfiLogo} 
            alt="WFI Logo" 
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#programs" className="text-[#101828] text-base font-normal hover:text-[#d46527] transition-colors">
            Programs
          </a>
          <a href="#about" className="text-[#101828] text-base font-normal hover:text-[#d46527] transition-colors">
            About Us
          </a>
          <a href="#testimonials" className="text-[#101828] text-base font-normal hover:text-[#d46527] transition-colors">
            Testimonials
          </a>
          <a href="#events" className="text-[#101828] text-base font-normal hover:text-[#d46527] transition-colors">
            Webinar/Events
          </a>
          <a href="#blogs" className="text-[#101828] text-base font-normal hover:text-[#d46527] transition-colors">
            Blogs
          </a>
        </nav>

        {/* CTA Button */}
        <button className="border border-[#d46527] border-solid h-[48px] rounded-[5px] px-5 font-medium text-[#d46527] text-sm hover:bg-[#d46527] hover:text-white transition-colors">
          Get Started
        </button>
      </div>
    </header>
  );
}

