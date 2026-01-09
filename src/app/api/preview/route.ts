import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Preview Mode API Route
 * 
 * This enables editors to preview draft content from WordPress
 * before publishing.
 * 
 * Usage:
 * GET /api/preview?secret=YOUR_SECRET&slug=/path-to-preview
 */

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug') || '/';
  const postType = searchParams.get('type') || 'page';

  // Validate the secret
  const expectedSecret = process.env.PREVIEW_SECRET;
  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json(
      { message: 'Invalid preview secret' },
      { status: 401 }
    );
  }

  // Enable Draft Mode
  const draft = await draftMode();
  draft.enable();

  // Build the redirect path based on post type
  let redirectPath = slug;
  
  if (!slug.startsWith('/')) {
    switch (postType) {
      case 'post':
        redirectPath = `/blog/${slug}`;
        break;
      case 'program':
        redirectPath = `/programs/${slug}`;
        break;
      case 'event':
        redirectPath = `/events/${slug}`;
        break;
      default:
        redirectPath = `/${slug}`;
    }
  }

  // Redirect to the preview page
  redirect(redirectPath);
}

/**
 * Disable Preview Mode
 * 
 * GET /api/preview/disable
 */
export async function DELETE() {
  const draft = await draftMode();
  draft.disable();
  
  return NextResponse.json({ 
    success: true, 
    message: 'Preview mode disabled' 
  });
}


