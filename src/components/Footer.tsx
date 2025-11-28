import { assets } from '@/lib/assets';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto px-8 py-16">
        <div className="flex flex-wrap gap-12 md:gap-16 mb-12">
          {/* Logo and Description */}
          <div className="flex-1 min-w-[220px] max-w-[364px]">
            <div className="h-[32px] w-[111px] mb-6 relative">
              <Image 
                src={assets.wfiLogo} 
                alt="WFI Logo" 
                fill
                className="object-contain"
              />
            </div>
            <p className="text-[#4a5565] text-sm leading-[22.75px] max-w-[364px]">
              Empowering professionals through expert-led training and career support. Join thousands who have transformed their careers with us.
            </p>
          </div>

          {/* Programs */}
          <div className="flex-1 min-w-[180px]">
            <h4 className="text-black text-sm font-bold mb-4">Programs</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Link One
                </a>
              </li>
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Link Two
                </a>
              </li>
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Link Three
                </a>
              </li>
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Link Four
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="flex-1 min-w-[180px]">
            <h4 className="text-black text-sm font-bold mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Link One
                </a>
              </li>
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Link Two
                </a>
              </li>
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Link Three
                </a>
              </li>
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Link Four
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="flex-1 min-w-[180px]">
            <h4 className="text-black text-sm font-bold mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Link One
                </a>
              </li>
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Link Two
                </a>
              </li>
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Link Three
                </a>
              </li>
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Link Four
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#6a7282] text-[13px]">
            © 2025 Workforce Institute. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[#6a7282] text-[13px] hover:text-[#d46527] transition-colors">
              Privacy
            </a>
            <a href="#" className="text-[#6a7282] text-[13px] hover:text-[#d46527] transition-colors">
              Terms
            </a>
            <a href="#" className="text-[#6a7282] text-[13px] hover:text-[#d46527] transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

