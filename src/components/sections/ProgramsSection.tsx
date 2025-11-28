import { assets } from '@/lib/assets';
import Image from 'next/image';
import { ArrowLeft, ArrowRightNav, ArrowRight, PlayButton } from '@/components/icons';

export default function ProgramsSection() {
  const programs = [
    {
      title: 'AI Generative',
      description: 'Join CMOs from Jasper and Webflow as they discuss.',
      image: assets.programAIGenerative,
      link: '#',
    },
    {
      title: 'UI UX Design',
      description: 'Join CMOs from Jasper and Webflow as they discuss.',
      image: assets.programUIUX,
      link: '#',
    },
    {
      title: 'Digital Marketing',
      description: 'Join CMOs from Jasper and Webflow as they discuss.',
      image: assets.programDigitalMarketing1,
      link: '#',
    },
    {
      title: 'Digital Marketing',
      description: 'Join CMOs from Jasper and Webflow as they discuss.',
      image: assets.programDigitalMarketing2,
      link: '#',
    },
  ];

  return (
    <section id="programs" className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 md:px-20">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-[68px] leading-[70px] font-['Bayon'] text-black tracking-[1px] mb-6">
            <span className="tracking-[3px]">Training Solutions</span>
            <br />
            For Every Team
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <p className="text-[18.3px] leading-[25px] font-['Inter'] text-[#2f2b24] max-w-[390px]">
              All the features you need to take a secure, controlled & impactful approach to AI.
            </p>
            <button className="border border-[#2f2b24] border-solid h-[48px] rounded-[5px] px-5 font-medium text-[#2f2b24] text-sm hover:bg-[#2f2b24] hover:text-white transition-colors">
              Explore More Here
            </button>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-white border border-[#dcd9d0] border-solid rounded-[20px] p-[18px] min-w-[436px] flex-shrink-0"
              >
                <div className="mb-4">
                  <div className="h-[226px] w-full rounded-[4px] overflow-hidden mb-4 relative">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-[19.7px] font-bold text-[#2f2b24] mb-2">
                    {program.title}
                  </h3>
                  <p className="text-[16.7px] leading-[21.6px] text-[#2f2b24] mb-4">
                    {program.description}
                  </p>
                </div>
                <a
                  href={program.link}
                  className="flex items-center gap-2 text-[#2f2b24] text-sm font-medium hover:text-[#d46527] transition-colors"
                >
                  Learn More
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2 justify-end mt-4">
            <button className="w-8 h-8 rounded-[5px] flex items-center justify-center hover:bg-gray-100 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button className="w-8 h-8 rounded-[5px] flex items-center justify-center hover:bg-gray-100 transition-colors">
              <ArrowRightNav className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Featured Program Card */}
        <div className="mt-20 flex flex-col lg:flex-row gap-8 lg:items-center">
          <div className="relative lg:flex-1">
            <Image
              src={assets.programVideoThumb}
              alt="Program"
              width={405}
              height={287}
              className="w-full h-[287px] object-cover rounded-lg"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <PlayButton className="w-16 h-16" />
            </div>
          </div>
          <div className="space-y-4 lg:flex-1">
            <Image src={assets.quoteIcon} alt="quote" width={108} height={33} />
            <p className="text-[18px] leading-[26px] text-[#2f2b24] font-['Arimo'] max-w-[381px]">
              The UI/UX Program is a fantastic resource for anyone looking to enhance their design skills. It offers a comprehensive curriculum
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
