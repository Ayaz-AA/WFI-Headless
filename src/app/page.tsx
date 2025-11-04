import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WordPressContent from "@/components/WordPressContent";
import { getPageBySlug, getPageHTML } from "@/lib/graphql";

export default async function Home() {
  let page = null;
  let pageHTML = null;

  try {
    const results = await Promise.allSettled([
      getPageBySlug("test-page"),
      getPageHTML("test-page"),
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
    // Continue rendering with null values - WordPressContent will handle the error state
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
