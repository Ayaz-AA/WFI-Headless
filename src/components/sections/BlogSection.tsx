import { assets } from '@/lib/assets';
import Image from 'next/image';
import { ArrowContinue } from '@/components/icons';

export default function BlogSection() {
  const blogPosts = [
    {
      title: 'Future of ai in software development',
      date: 'October 14, 2025',
      category: 'AI Generative',
      image: assets.blogThumb,
    },
    {
      title: 'Future of ai in software development',
      date: 'October 14, 2025',
      category: 'AI Generative',
      image: assets.blogThumb,
    },
    {
      title: 'Future of ai in software development',
      date: 'October 14, 2025',
      category: 'AI Generative',
      image: assets.blogThumb,
    },
    {
      title: 'Future of ai in software development',
      date: 'October 14, 2025',
      category: 'AI Generative',
      image: assets.blogThumb,
    },
    {
      title: 'Future of ai in software development',
      date: 'October 14, 2025',
      category: 'AI Generative',
      image: assets.blogThumb,
    },
  ];

  return (
    <section id="blogs" className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 md:px-20">
        {/* Featured Blog Post */}
        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          <div className="relative h-[375px] lg:flex-1">
            <Image
              src={assets.blogFeatured}
              alt="Featured blog"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="space-y-6 lg:flex-1">
            <h2 className="text-[68px] leading-[70px] font-['Bayon'] text-black tracking-[1px]">
              Future of ai in software development
            </h2>
            <p className="text-[16px] leading-[23px] text-[#364153] max-w-[354px]">
              Plus, Workforce Institute provides comprehensive career support services to students after program completion. Contact our team today to discover the perfect program for your goals
            </p>
            <div className="flex items-center gap-2 text-[#090914] text-xl font-bold">
              <span>Continue Reading</span>
              <ArrowContinue className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="bg-[#f7f9fc] border border-gray-200 border-solid rounded-[6px] p-4 min-w-[363px] flex-shrink-0"
            >
              <div className="flex gap-4">
                <div className="relative w-[115px] h-[102px] flex-shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="bg-[#f8dbcb] inline-block px-3 py-1 rounded-[2px] mb-2">
                    <span className="text-[#d46527] text-[8px] font-bold">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#888d90] font-medium">
                    {post.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
