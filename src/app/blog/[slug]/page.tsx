import { getPostBySlug, getAllPostSlugs } from '@/lib/wordpress';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { assets } from '@/lib/assets';
import type { Metadata } from 'next';

// Revalidate every 60 seconds
export const revalidate = 60;

// Generate static params for all posts
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found - Workforce Institute',
    };
  }

  return {
    title: `${post.title} - Workforce Institute Blog`,
    description: post.excerpt?.replace(/<[^>]*>/g, '').slice(0, 160) || `Read ${post.title} on Workforce Institute Blog.`,
    openGraph: {
      title: post.title,
      description: post.excerpt?.replace(/<[^>]*>/g, '').slice(0, 160) || '',
      images: post.featuredImage?.node?.sourceUrl ? [post.featuredImage.node.sourceUrl] : [],
      type: 'article',
      publishedTime: post.date,
    },
  };
}

// Helper to format date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="bg-[#f7f9fc] min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white py-16">
        <div className="max-w-[900px] mx-auto px-6">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            {post.categories?.nodes?.[0] && (
              <span className="bg-[#d46527] text-white text-sm px-3 py-1 rounded-full">
                {post.categories.nodes[0].name}
              </span>
            )}
            <span className="text-gray-300 text-sm">
              {formatDate(post.date)}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {post.title}
          </h1>

          {post.author?.node && (
            <div className="flex items-center mt-6">
              {post.author.node.avatar?.url && (
                <Image
                  src={post.author.node.avatar.url}
                  alt={post.author.node.name}
                  width={48}
                  height={48}
                  className="rounded-full mr-3"
                />
              )}
              <div>
                <p className="font-medium">{post.author.node.name}</p>
                <p className="text-gray-300 text-sm">Author</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Image */}
      {post.featuredImage?.node?.sourceUrl && (
        <div className="max-w-[900px] mx-auto px-6 -mt-8">
          <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-[900px] mx-auto px-6">
          {/* Post Content */}
          {post.content ? (
            <article 
              className="prose prose-lg max-w-none bg-white rounded-xl p-8 md:p-12 shadow-lg
                prose-headings:text-[#101828] 
                prose-p:text-gray-600 
                prose-a:text-[#d46527] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[#101828]
                prose-img:rounded-lg prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div className="bg-white rounded-xl p-8 md:p-12 shadow-lg">
              <p className="text-gray-600">No content available for this post.</p>
            </div>
          )}

          {/* Share Section */}
          <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-[#101828] mb-4">Share this article</h3>
            <div className="flex gap-3">
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://workforceinstitute.io/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-[#1DA1F2] hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://workforceinstitute.io/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-[#0077B5] hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://workforceinstitute.io/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-[#1877F2] hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-8 text-center">
            <Link 
              href="/blog"
              className="inline-flex items-center text-[#d46527] font-medium hover:underline"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              View All Articles
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

