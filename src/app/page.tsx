import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import ProgramsSection from '@/components/sections/ProgramsSection';
import AboutSection from '@/components/sections/AboutSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import PartnersSection from '@/components/sections/PartnersSection';
import CTASection from '@/components/sections/CTASection';
import BlogSection from '@/components/sections/BlogSection';

export default function Home() {
  return (
    <main className="bg-[#f7f9fc]">
      <HeroSection />
      <StatsSection />
      <ProgramsSection />
      <AboutSection />
      <TestimonialsSection />
      <PartnersSection />
      <CTASection />
      <BlogSection />
    </main>
  );
}
