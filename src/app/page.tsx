import HomeSections from '@/components/sections/HomeSections';
import { getAllPrograms, getAllPartners, getAllTestimonials, getLatestPosts, getHomepageContent } from '@/lib/wordpress';

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function Home() {
  // Fetch all content from WordPress via GraphQL
  // Dynamic content: Programs, Partners, Testimonials, Posts
  // Static content: Homepage text (from "Homepage Settings" page with ACF fields)
  const [programs, partners, testimonials, postsData, homepageContent] = await Promise.all([
    getAllPrograms(),
    getAllPartners(),
    getAllTestimonials(),
    getLatestPosts(5),
    getHomepageContent(),
  ]);

  return (
    <main className="bg-[#f7f9fc]">
      <HomeSections 
        wpPrograms={programs}
        wpPartners={partners}
        wpTestimonials={testimonials}
        wpPosts={postsData.posts}
        content={homepageContent}
      />
    </main>
  );
}
