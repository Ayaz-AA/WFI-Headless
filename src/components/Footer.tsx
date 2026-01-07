import { assets } from '@/lib/assets';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto px-8 py-16">
        <div className="flex flex-wrap gap-12 md:gap-16 mb-12">
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
              It&apos;s a crowded market, but we know the way. Cut through the fear with a companion by your side. Get access to expert knowledge that others don&apos;t have.
            </p>
          </div>

          <div className="flex-1 min-w-[140px]">
            <h4 className="text-black text-sm font-bold mb-4">Products</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Brand
                </a>
              </li>
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Art
                </a>
              </li>
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Chrome Extension
                </a>
              </li>
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          <div className="flex-1 min-w-[140px]">
            <h4 className="text-black text-sm font-bold mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#blogs" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Webinars
                </a>
              </li>
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div className="flex-1 min-w-[140px]">
            <h4 className="text-black text-sm font-bold mb-4">Learn</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  AI Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Prompts
                </a>
              </li>
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  AI Academy
                </a>
              </li>
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Training
                </a>
              </li>
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  AI Glossary
                </a>
              </li>
            </ul>
          </div>

          <div className="flex-1 min-w-[140px]">
            <h4 className="text-black text-sm font-bold mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Jasper for Business
                </a>
              </li>
              <li>
                <a href="#" className="text-[#4a5565] text-sm hover:text-[#d46527] transition-colors">
                  Contact sales
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#6a7282] text-[13px]">
            © 2024 Jasper AI, Inc
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[#6a7282] text-[13px] hover:text-[#d46527] transition-colors">
              Privacy
            </a>
            <a href="#" className="text-[#6a7282] text-[13px] hover:text-[#d46527] transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
