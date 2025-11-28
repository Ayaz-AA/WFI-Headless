export default function StatsSection() {
  const stats = [
    { value: '12M', label: 'Resumes created' },
    { value: '65M+', label: 'Resumes reviewed' },
    { value: '10M', label: 'Jobs' },
    { value: '11.2M', label: 'Users worldwide' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1282px] mx-auto px-5 md:px-20">
        <div className="flex flex-wrap gap-10 md:gap-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center flex-1 basis-1/2 md:basis-1/4">
              <h3 className="text-[56px] leading-[56px] font-['Arimo'] text-black tracking-[-1.4px] mb-2">
                {stat.value}
              </h3>
              <p className="text-[15px] leading-[22.5px] font-['Arimo'] text-[#6a7282]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

