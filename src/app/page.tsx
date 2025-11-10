import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WordPressContent from "@/components/WordPressContent";
import { getPageBySlug, getPageHTML, getAllPages } from "@/lib/graphql";
import Link from "next/link";

// Force dynamic rendering to ensure fresh content on every request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Change this to the slug of the page you want to show on the homepage
// Set to null to show a list of all pages instead
const HOMEPAGE_SLUG: string | null = "course-page"; // e.g., "test-page", "course-page", or null for list

export default async function Home() {
  // If HOMEPAGE_SLUG is set, show that page
  if (HOMEPAGE_SLUG) {
    let page = null;
    let pageHTML = null;

    try {
      const results = await Promise.allSettled([
        getPageBySlug(HOMEPAGE_SLUG),
        getPageHTML(HOMEPAGE_SLUG),
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
    } catch (error) {
      console.error('Unexpected error loading page data:', error);
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

  // Otherwise, show a list of all available pages
  const allPages = await getAllPages();

  return (
    <div className="font-sans flex flex-col min-h-screen">
      <Header />
      <main className="flex-1" style={{ width: '100%', margin: 0, padding: 0 }}>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Available Pages</h1>
          {allPages.length === 0 ? (
            <p className="text-gray-600">No pages found. Please check your WordPress connection.</p>
          ) : (
            <ul className="space-y-4">
              {allPages.map((page) => (
                <li key={page.id}>
                  <Link
                    href={`/${page.slug}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
                  >
                    <h2 className="text-xl font-semibold mb-2">{page.title}</h2>
                    <p className="text-sm text-gray-600">Slug: {page.slug}</p>
                    <p className="text-sm text-gray-500">URI: {page.uri}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
