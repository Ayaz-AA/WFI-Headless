'use client';

import { assets } from '@/lib/assets';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getMenu, type MenuItem } from '@/lib/graphql';
import { SignupModal } from '@/components/SignupModal';

export default function Header() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const items = await getMenu();
        if (items.length > 0) {
          setMenuItems(items);
        } else {
          // Fallback navigation matching deployed site
          setMenuItems([
            { id: '1', label: 'Programs', url: '#programs', path: '#programs' },
            { id: '2', label: 'About Us', url: '#about', path: '#about' },
            { id: '3', label: 'Integrations', url: '#integrations', path: '#integrations' },
            { id: '4', label: 'Webinar/Events', url: '#events', path: '#events' },
            { id: '5', label: 'Blogs', url: '#blogs', path: '#blogs' },
          ]);
        }
      } catch (error) {
        console.error('Failed to load menu:', error);
        // Fallback navigation matching deployed site
        setMenuItems([
          { id: '1', label: 'Programs', url: '#programs', path: '#programs' },
          { id: '2', label: 'About Us', url: '#about', path: '#about' },
          { id: '3', label: 'Integrations', url: '#integrations', path: '#integrations' },
          { id: '4', label: 'Webinar/Events', url: '#events', path: '#events' },
          { id: '5', label: 'Blogs', url: '#blogs', path: '#blogs' },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, []);

  const getRelativePath = (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === 'backend.workforceinstitute.io' || urlObj.hostname === 'workforceinstitute.io') {
        return urlObj.pathname + urlObj.search + urlObj.hash;
      }
      return url;
    } catch {
      return url;
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 h-[77px]">
      <div className="max-w-[1440px] mx-auto h-full flex items-center justify-between px-10">
        <div className="h-[42px] w-[146px] relative">
          <Image 
            src={assets.wfiLogo} 
            alt="WFI Logo" 
            fill
            className="object-contain"
            priority
          />
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {loading ? (
            <div className="text-[#101828] text-base">Loading...</div>
          ) : menuItems.length > 0 ? (
            menuItems.map((item) => (
              <a
                key={item.id}
                href={getRelativePath(item.url)}
                className="text-[#101828] text-base font-normal hover:text-[#d46527] transition-colors"
              >
                {item.label}
              </a>
            ))
          ) : (
            <>
              <a href="#programs" className="text-[#101828] text-base font-normal hover:text-[#d46527] transition-colors">
                Programs
              </a>
              <a href="#about" className="text-[#101828] text-base font-normal hover:text-[#d46527] transition-colors">
                About Us
              </a>
              <a href="#integrations" className="text-[#101828] text-base font-normal hover:text-[#d46527] transition-colors">
                Integrations
              </a>
              <a href="#events" className="text-[#101828] text-base font-normal hover:text-[#d46527] transition-colors">
                Webinar/Events
              </a>
              <a href="#blogs" className="text-[#101828] text-base font-normal hover:text-[#d46527] transition-colors">
                Blogs
              </a>
            </>
          )}
        </nav>

        <button className="border border-[#d46527] border-solid h-[48px] rounded-[5px] px-5 font-medium text-[#d46527] text-sm hover:bg-[#d46527] hover:text-white transition-colors" type='button' onClick={() => setIsModalOpen(true)}>
          Get Started
        </button>
      </div>
      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
}

