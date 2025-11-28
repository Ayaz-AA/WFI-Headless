import { assets } from '@/lib/assets';
import Image from 'next/image';

export default function PartnersSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 md:px-20">
        <h2 className="text-[68px] leading-[70px] font-['Bayon'] text-black tracking-[1px] mb-8 text-center">
          Top university partners
        </h2>
        <p className="text-[14px] leading-[22px] text-[#090914] max-w-[428px] mx-auto mb-12 text-center">
          It's a crowded market, but we know the way. Cut through the fear with a companion by your side. Get access to expert knowledge that others don't have.
        </p>

        {/* Partners Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8">
          {assets.partnerLogos.map((logo, index) => (
            <div key={index} className="h-[27px] w-[128px] relative">
              <Image 
                src={logo} 
                alt={`Partner ${index + 1}`} 
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
