import { getAllPrograms } from '@/lib/wordpress';
import Image from 'next/image';
import Link from 'next/link';
import { assets } from '@/lib/assets';

// Revalidate every 60 seconds
export const revalidate = 60;

export const metadata = {
  title: 'Our Programs - Workforce Institute',
  description: 'Explore our professional training programs in AI, UI/UX Design, Digital Marketing, and more.',
};

export default async function ProgramsPage() {
  const programs = await getAllPrograms();

  return (
    <main className="bg-[#f7f9fc] min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Programs</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Transform your career with our expert-led training programs. Choose from AI, Design, Marketing, and more.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          {programs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program) => (
                <Link
                  key={program.id}
                  href={`/programs/${program.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={program.featuredImage?.node?.sourceUrl || assets.programAIGenerative}
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-[#101828] mb-2 group-hover:text-[#d46527] transition-colors">
                      {program.title}
                    </h2>
                    <p className="text-gray-600 line-clamp-2">
                      {program.programFields?.description || 'Discover this amazing program and advance your career.'}
                    </p>
                    <div className="mt-4 flex items-center text-[#d46527] font-medium">
                      Learn More
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No programs available at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

