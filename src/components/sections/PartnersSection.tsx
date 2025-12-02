import { assets } from '@/lib/assets';
import Image from 'next/image';

export default function PartnersSection() {
  return (
    <section className="partners-section">
      <div className="partners-container">
        <h2 className="partners-title">
          Top university partners
        </h2>
        <p className="partners-description">
          It's a crowded market, but we know the way. Cut through the fear with a companion by your side. Get access to expert knowledge that others don't have.
        </p>

        {/* Partners Logos */}
        <div className="partners-list">
          {assets.partnerLogos.map((logo, index) => (
            <div key={index} className="partners-logo">
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
