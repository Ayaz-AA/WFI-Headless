import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WordPressContent from "@/components/WordPressContent";
import { getPageBySlug, getPageHTML } from "@/lib/graphql";
import { notFound } from "next/navigation";

// Force dynamic rendering to ensure fresh content on every request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Join the slug array to get the full path (e.g., ["page", "subpage"] -> "page/subpage")
  const pageSlug = slug.join('/');

  let page = null;
  let pageHTML = null;

  try {
    const results = await Promise.allSettled([
      getPageBySlug(pageSlug),
      getPageHTML(pageSlug),
    ]);

    if (results[0].status === 'fulfilled') {
      page = results[0].value;
    } else {
      console.error('Error loading page:', results[0].reason);
    }

    if (results[1].status === 'fulfilled') {
      pageHTML = results[1].value;
    } else {
      console.error('Error loading page HTML:', results[1].reason);
    }

    // If page doesn't exist, show 404
    if (!page && !pageHTML) {
      notFound();
    }
  } catch (error) {
    console.error('Unexpected error loading page data:', error);
    // If it's a 404 error, show not found
    if (error instanceof Error && error.message.includes('404')) {
      notFound();
    }
  }

  return (
    <div className="font-sans flex flex-col min-h-screen">
      <Header />
      <main className="flex-1" style={{ width: '100%', margin: 0, padding: 0 }}>
        <WordPressContent page={page} pageHTML={pageHTML} />
      </main>
      <Footer />
    </div>
  );
}

