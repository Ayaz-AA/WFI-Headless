import { getLatestPosts } from '@/lib/wordpress';
import Image from 'next/image';
import Link from 'next/link';
import { assets } from '@/lib/assets';

// Revalidate every 60 seconds
export const revalidate = 60;

export const metadata = {
  title: 'Blog - Workforce Institute',
  description: 'Read the latest articles on AI, Design, Marketing, and career development.',
};

// Helper to format date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function BlogPage() {
  const { posts } = await getLatestPosts(20);

  // Get featured post (first one) and remaining posts
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <main className="bg-[#f7f9fc] min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Insights, tutorials, and updates from the Workforce Institute team.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          {posts.length > 0 ? (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="group block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 mb-12"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-64 lg:h-auto">
                      <Image
                        src={featuredPost.featuredImage?.node?.sourceUrl || assets.blogFeatured}
                        alt={featuredPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        {featuredPost.categories?.nodes?.[0] && (
                          <span className="bg-[#d46527] text-white text-sm px-3 py-1 rounded-full">
                            {featuredPost.categories.nodes[0].name}
                          </span>
                        )}
                        <span className="text-gray-500 text-sm">
                          {formatDate(featuredPost.date)}
                        </span>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-[#101828] mb-4 group-hover:text-[#d46527] transition-colors">
                        {featuredPost.title}
                      </h2>
                      {featuredPost.excerpt && (
                        <div 
                          className="text-gray-600 line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: featuredPost.excerpt }}
                        />
                      )}
                      <div className="mt-6 flex items-center text-[#d46527] font-medium">
                        Read Article
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Posts Grid */}
              {remainingPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {remainingPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.featuredImage?.node?.sourceUrl || assets.blogThumb}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          {post.categories?.nodes?.[0] && (
                            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                              {post.categories.nodes[0].name}
                            </span>
                          )}
                          <span className="text-gray-400 text-xs">
                            {formatDate(post.date)}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[#101828] mb-2 group-hover:text-[#d46527] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <div 
                            className="text-gray-600 text-sm line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: post.excerpt }}
                          />
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No blog posts available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}


