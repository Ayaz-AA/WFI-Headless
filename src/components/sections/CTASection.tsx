export default function CTASection() {
  return (
    <section className="py-20 bg-[#224dd0]">
      <div className="max-w-[1350px] mx-auto px-5 md:px-12">
        <div className="flex flex-col md:flex-row gap-12 md:items-center">
          {/* Left Content */}
          <div className="md:flex-1">
            <h2 className="text-[55.2px] leading-[60px] font-['Inter'] font-medium text-white tracking-[-2.4px] mb-6">
              Faster outputs.
              <br />
              Better outcomes.
            </h2>
          </div>

          {/* Right Content */}
          <div className="space-y-8 md:flex-1">
            <p className="text-[18.3px] leading-[25px] font-['Inter'] text-white">
              Come see why leading businesses chose Jasper for better results using artificial intelligence.
            </p>
            <div className="flex gap-4">
              <button className="border-2 border-white border-solid h-[48px] rounded-[5px] px-5 font-medium text-white text-sm hover:bg-white hover:text-[#2f2b24] transition-colors">
                Start Free Trial
              </button>
              <button className="bg-white border-2 border-white border-solid h-[48px] rounded-[5px] px-5 font-medium text-[#2f2b24] text-sm hover:bg-transparent hover:text-white transition-colors">
                Get A Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

