export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 md:px-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:items-center">
          <div className="space-y-6 lg:flex-1">
            <h2 className="text-[68px] leading-[70px] font-['Bayon'] text-black tracking-[1px]">
              Our Programs
            </h2>
            <p className="text-[16px] leading-[20px] text-[#364153] max-w-[377px]">
              At Workforce Institute, we empower professionals to advance their careers in high-demand fields through hands-on, project-driven learning. Our online training programs offer affordable pathways to valuable careers, providing:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-[#2563eb] text-lg">✓</span>
                <p className="text-[18px] font-medium text-[#090914]">
                  Get unlimited design inspirations. Level up your design.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#2563eb] text-lg">✓</span>
                <p className="text-[18px] font-medium text-[#090914]">
                  14+ Premium tailwind UI kits. Start with unlimited product downloads.
                </p>
              </li>
            </ul>
            <button className="border border-[#2f2b24] border-solid h-[48px] rounded-[5px] px-5 font-medium text-[#2f2b24] text-sm hover:bg-[#2f2b24] hover:text-white transition-colors">
              Explore More Stories
            </button>
          </div>
          <div className="space-y-6 lg:flex-1">
            <h3 className="text-[52px] leading-[57px] font-['Bayon'] text-black tracking-[-1.04px]">
              The all-in-one career companion
            </h3>
            <p className="text-[17px] leading-[27px] text-[#090914] max-w-[428px]">
              It's a crowded market, but we know the way. Cut through the fear with a companion by your side. Get access to expert knowledge that others don't have.
            </p>
            <button className="border border-[#2f2b24] border-solid h-[48px] rounded-[5px] px-5 font-medium text-[#2f2b24] text-sm hover:bg-[#2f2b24] hover:text-white transition-colors">
              Explore Customer Stories
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

