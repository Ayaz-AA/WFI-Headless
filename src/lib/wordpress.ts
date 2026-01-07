// =============================================================================
// WORDPRESS DATA FETCHING UTILITIES
// =============================================================================
// Main entry point for fetching WordPress content
// Uses ISR (Incremental Static Regeneration) for optimal performance

import { fetchGraphQL } from './graphql/client';
import {
  GET_MAIN_MENU,
  GET_FOOTER_MENU,
  GET_PAGE_BY_SLUG,
  GET_ALL_PAGE_SLUGS,
  GET_LATEST_POSTS,
  GET_POST_BY_SLUG,
  GET_ALL_POST_SLUGS,
  GET_ALL_PROGRAMS,
  GET_PROGRAM_BY_SLUG,
  GET_ALL_PROGRAM_SLUGS,
  GET_ALL_TESTIMONIALS,
  GET_ALL_PARTNERS,
  GET_UPCOMING_EVENTS,
  GET_EVENT_BY_SLUG,
  GET_ALL_EVENT_SLUGS,
  GET_HOMEPAGE_CONTENT,
} from './graphql/queries';
import type {
  MenuItem,
  WPMenuItem,
  WPPage,
  WPPost,
  WPProgram,
  WPTestimonial,
  WPPartner,
  WPEvent,
  HomepageContent,
  MenuQueryResponse,
  PageQueryResponse,
  AllPostsResponse,
  PostQueryResponse,
  AllProgramsResponse,
  ProgramQueryResponse,
  AllTestimonialsResponse,
  AllPartnersResponse,
  AllEventsResponse,
  HomepageContentResponse,
} from './graphql/types';

// -----------------------------------------------------------------------------
// MENU UTILITIES
// -----------------------------------------------------------------------------

/**
 * Transform flat menu items to nested structure
 */
function transformMenuItems(nodes: WPMenuItem[]): MenuItem[] {
  const items: MenuItem[] = [];
  const itemMap = new Map<string, MenuItem>();

  // Sort by order first
  const sortedNodes = [...nodes].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    return 0;
  });

  // Create map of all items
  sortedNodes.forEach((node) => {
    const item: MenuItem = {
      id: node.id,
      label: node.label,
      url: node.url || node.path || '#',
      path: node.path || node.url || '#',
      parentId: node.parentId || null,
      order: node.order,
      target: node.target,
      cssClasses: node.cssClasses,
    };
    itemMap.set(node.id, item);
  });

  // Build hierarchy
  sortedNodes.forEach((node) => {
    const item = itemMap.get(node.id)!;
    
    const children = sortedNodes
      .filter((n) => n.parentId === node.id)
      .map((child) => itemMap.get(child.id)!)
      .sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) {
          return a.order - b.order;
        }
        return 0;
      });
    
    if (children.length > 0) {
      item.children = children;
    }
    
    // Only add top-level items to the result
    if (!node.parentId) {
      items.push(item);
    }
  });

  return items;
}

/**
 * Get main navigation menu
 */
export async function getMainMenu(): Promise<MenuItem[]> {
  const data = await fetchGraphQL<MenuQueryResponse>(GET_MAIN_MENU);
  if (data?.menuItems?.nodes) {
    return transformMenuItems(data.menuItems.nodes);
  }
  return [];
}

/**
 * Get footer menu
 */
export async function getFooterMenu(): Promise<MenuItem[]> {
  const data = await fetchGraphQL<MenuQueryResponse>(GET_FOOTER_MENU);
  if (data?.menuItems?.nodes) {
    return transformMenuItems(data.menuItems.nodes);
  }
  return [];
}

// -----------------------------------------------------------------------------
// PAGE UTILITIES
// -----------------------------------------------------------------------------

/**
 * Get a page by its slug/URI
 */
export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  // Ensure slug starts with /
  const uri = slug.startsWith('/') ? slug : `/${slug}`;
  const data = await fetchGraphQL<PageQueryResponse>(GET_PAGE_BY_SLUG, { slug: uri });
  return data?.page || null;
}

/**
 * Get all page slugs for static generation
 */
export async function getAllPageSlugs(): Promise<string[]> {
  const data = await fetchGraphQL<{ pages: { nodes: { slug: string }[] } }>(GET_ALL_PAGE_SLUGS);
  return data?.pages?.nodes?.map((page) => page.slug) || [];
}

// -----------------------------------------------------------------------------
// BLOG POST UTILITIES
// -----------------------------------------------------------------------------

/**
 * Get latest blog posts
 */
export async function getLatestPosts(first: number = 10, after?: string): Promise<{
  posts: WPPost[];
  hasNextPage: boolean;
  endCursor: string;
}> {
  const data = await fetchGraphQL<AllPostsResponse>(GET_LATEST_POSTS, { first, after });
  return {
    posts: data?.posts?.nodes || [],
    hasNextPage: data?.posts?.pageInfo?.hasNextPage || false,
    endCursor: data?.posts?.pageInfo?.endCursor || '',
  };
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const data = await fetchGraphQL<PostQueryResponse>(GET_POST_BY_SLUG, { slug });
  return data?.post || null;
}

/**
 * Get all post slugs for static generation
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const data = await fetchGraphQL<{ posts: { nodes: { slug: string }[] } }>(GET_ALL_POST_SLUGS);
  return data?.posts?.nodes?.map((post) => post.slug) || [];
}

// -----------------------------------------------------------------------------
// PROGRAMS UTILITIES
// -----------------------------------------------------------------------------

/**
 * Get all programs
 */
export async function getAllPrograms(): Promise<WPProgram[]> {
  const data = await fetchGraphQL<AllProgramsResponse>(GET_ALL_PROGRAMS);
  return data?.programs?.nodes || [];
}

/**
 * Get a single program by slug
 */
export async function getProgramBySlug(slug: string): Promise<WPProgram | null> {
  const data = await fetchGraphQL<ProgramQueryResponse>(GET_PROGRAM_BY_SLUG, { slug });
  return data?.program || null;
}

/**
 * Get all program slugs for static generation
 */
export async function getAllProgramSlugs(): Promise<string[]> {
  const data = await fetchGraphQL<{ programs: { nodes: { slug: string }[] } }>(GET_ALL_PROGRAM_SLUGS);
  return data?.programs?.nodes?.map((program) => program.slug) || [];
}

// -----------------------------------------------------------------------------
// TESTIMONIALS UTILITIES
// -----------------------------------------------------------------------------

/**
 * Get all testimonials
 */
export async function getAllTestimonials(): Promise<WPTestimonial[]> {
  const data = await fetchGraphQL<AllTestimonialsResponse>(GET_ALL_TESTIMONIALS);
  return data?.testimonials?.nodes || [];
}

/**
 * Get testimonials grouped by program
 */
export async function getTestimonialsByProgram(): Promise<Record<string, WPTestimonial[]>> {
  const testimonials = await getAllTestimonials();
  const grouped: Record<string, WPTestimonial[]> = {};
  
  testimonials.forEach((testimonial) => {
    const program = testimonial.testimonialFields?.programName || 'General';
    if (!grouped[program]) {
      grouped[program] = [];
    }
    grouped[program].push(testimonial);
  });
  
  return grouped;
}

// -----------------------------------------------------------------------------
// PARTNERS UTILITIES
// -----------------------------------------------------------------------------

/**
 * Get all partners
 */
export async function getAllPartners(): Promise<WPPartner[]> {
  const data = await fetchGraphQL<AllPartnersResponse>(GET_ALL_PARTNERS);
  return data?.partners?.nodes || [];
}

// -----------------------------------------------------------------------------
// EVENTS UTILITIES
// -----------------------------------------------------------------------------

/**
 * Get upcoming events
 */
export async function getUpcomingEvents(first: number = 5): Promise<WPEvent[]> {
  const data = await fetchGraphQL<AllEventsResponse>(GET_UPCOMING_EVENTS, { first });
  return data?.events?.nodes || [];
}

/**
 * Get a single event by slug
 */
export async function getEventBySlug(slug: string): Promise<WPEvent | null> {
  const data = await fetchGraphQL<{ event: WPEvent | null }>(GET_EVENT_BY_SLUG, { slug });
  return data?.event || null;
}

/**
 * Get all event slugs for static generation
 */
export async function getAllEventSlugs(): Promise<string[]> {
  const data = await fetchGraphQL<{ events: { nodes: { slug: string }[] } }>(GET_ALL_EVENT_SLUGS);
  return data?.events?.nodes?.map((event) => event.slug) || [];
}

// -----------------------------------------------------------------------------
// HOMEPAGE CONTENT (Static text from WordPress)
// -----------------------------------------------------------------------------

/**
 * Get homepage section content from the "Homepage Settings" page
 * This allows all static text (headings, descriptions, button text) to be edited in WordPress
 */
export async function getHomepageContent(): Promise<HomepageContent | null> {
  const data = await fetchGraphQL<HomepageContentResponse>(GET_HOMEPAGE_CONTENT);
  return data?.page?.homepageContent || null;
}

// -----------------------------------------------------------------------------
// COMBINED DATA FETCHING (for pages that need multiple data sources)
// -----------------------------------------------------------------------------

/**
 * Get all data needed for the home page
 * Fetches Programs, Partners, Testimonials, Blog Posts, AND static content via GraphQL
 */
export async function getHomePageData() {
  // Fetch all data in parallel for performance
  const [
    mainMenu,
    programs,
    testimonials,
    partners,
    latestPosts,
    homepageContent,
  ] = await Promise.all([
    getMainMenu(),
    getAllPrograms(),
    getAllTestimonials(),
    getAllPartners(),
    getLatestPosts(5),
    getHomepageContent(),
  ]);

  return {
    mainMenu,
    programs,
    testimonials,
    partners,
    latestPosts: latestPosts.posts,
    homepageContent,
  };
}

// -----------------------------------------------------------------------------
// URL UTILITIES
// -----------------------------------------------------------------------------

/**
 * Convert WordPress URL to relative path
 */
export function getRelativePath(url: string): string {
  if (!url) return '#';
  
  try {
    const urlObj = new URL(url);
    const wpDomains = [
      'backend.workforceinstitute.io',
      'workforceinstitute.io',
      'www.workforceinstitute.io',
    ];
    
    if (wpDomains.includes(urlObj.hostname)) {
      return urlObj.pathname + urlObj.search + urlObj.hash;
    }
    return url;
  } catch {
    // If URL parsing fails, return as-is
    return url;
  }
}

/**
 * Get WordPress media URL (handles both local and CDN URLs)
 */
export function getMediaUrl(url: string | undefined): string {
  if (!url) return '';
  
  // If already a full URL, return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Otherwise, prepend the WordPress URL
  const wpUrl = process.env.NEXT_PUBLIC_WP_URL || 'https://backend.workforceinstitute.io';
  return `${wpUrl}${url.startsWith('/') ? '' : '/'}${url}`;
}

