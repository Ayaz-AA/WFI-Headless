import { getProgramBySlug, getAllProgramSlugs } from '@/lib/wordpress';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { assets } from '@/lib/assets';
import type { Metadata } from 'next';

// Revalidate every 60 seconds
export const revalidate = 60;

// Generate static params for all programs
export async function generateStaticParams() {
  const slugs = await getAllProgramSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  
  if (!program) {
    return {
      title: 'Program Not Found - Workforce Institute',
    };
  }

  return {
    title: `${program.title} - Workforce Institute`,
    description: program.programFields?.description || `Learn more about our ${program.title} program.`,
    openGraph: {
      title: program.title,
      description: program.programFields?.description || '',
      images: program.featuredImage?.node?.sourceUrl ? [program.featuredImage.node.sourceUrl] : [],
    },
  };
}

export default async function ProgramPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  return (
    <main className="bg-[#f7f9fc] min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <Link 
            href="/programs" 
            className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Programs
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{program.title}</h1>
          {program.programFields?.description && (
            <p className="text-xl text-gray-300 max-w-2xl">
              {program.programFields.description}
            </p>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Featured Image */}
              {program.featuredImage?.node?.sourceUrl && (
                <div className="relative h-[400px] rounded-xl overflow-hidden mb-8 shadow-lg">
                  <Image
                    src={program.featuredImage.node.sourceUrl}
                    alt={program.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Program Content (from WordPress editor or Divi) */}
              {program.content ? (
                <div 
                  className="prose prose-lg max-w-none bg-white rounded-xl p-8 shadow-lg"
                  dangerouslySetInnerHTML={{ __html: program.content }}
                />
              ) : (
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-[#101828] mb-4">About This Program</h2>
                  <p className="text-gray-600">
                    {program.programFields?.description || 
                      'This program is designed to help you advance your career with cutting-edge skills and hands-on experience. Contact us to learn more about enrollment.'}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24">
                <h3 className="text-xl font-bold text-[#101828] mb-6">Program Details</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-[#d46527]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Flexible Schedule</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-[#d46527]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>100% Online</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-[#d46527]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <span>Certificate Included</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-[#d46527]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Career Support</span>
                  </div>
                </div>

                <button className="w-full bg-[#d46527] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#b85520] transition-colors">
                  Enroll Now
                </button>
                
                <p className="text-center text-sm text-gray-500 mt-4">
                  Have questions? <a href="#" className="text-[#d46527] hover:underline">Contact us</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


