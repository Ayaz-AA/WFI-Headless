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
    <section id="blogs" className="blog-section">
      <div className="blog-container">
        {/* Featured Blog Post */}
        <div className="blog-featured">
          <div className="blog-featured-image">
            <Image
              src={assets.blogFeatured}
              alt="Featured blog"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="blog-featured-content">
            <h2 className="blog-featured-title">
              Future of ai in software development
            </h2>
            <p className="blog-featured-text">
              Plus, Workforce Institute provides comprehensive career support services to students after program completion. Contact our team today to discover the perfect program for your goals
            </p>
            <a href="#" className="blog-featured-link">
              <span>Continue Reading</span>
              <ArrowContinue className="blog-featured-link-icon" />
            </a>
          </div>
        </div>

        {/* Blog Posts List */}
        <div className="blog-list">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="blog-card"
            >
              <div className="blog-card-content">
                <div className="blog-card-image">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="blog-card-text">
                  <div className="blog-card-category">
                    <span className="blog-card-category-text">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="blog-card-title">
                    {post.title}
                  </h3>
                  <p className="blog-card-date">
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
