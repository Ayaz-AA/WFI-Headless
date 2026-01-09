import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * On-Demand ISR Revalidation Endpoint
 * 
 * This endpoint is called by WordPress (via webhook) when content is updated.
 * It triggers Next.js to regenerate the affected pages.
 * 
 * Usage from WordPress:
 * POST https://yourdomain.com/api/revalidate
 * Headers: { Authorization: Bearer YOUR_SECRET }
 * Body: { path: "/programs", type: "path" }
 * 
 * Or for tag-based revalidation:
 * Body: { tag: "programs", type: "tag" }
 */

interface RevalidateRequest {
  path?: string;
  paths?: string[];
  tag?: string;
  tags?: string[];
  type?: 'path' | 'tag';
  secret?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Get the secret from Authorization header or body
    const authHeader = request.headers.get('Authorization');
    const bearerToken = authHeader?.replace('Bearer ', '');
    
    const body: RevalidateRequest = await request.json().catch(() => ({}));
    const secret = bearerToken || body.secret;

    // Verify the secret
    const expectedSecret = process.env.REVALIDATION_SECRET;
    if (!expectedSecret || secret !== expectedSecret) {
      return NextResponse.json(
        { success: false, message: 'Invalid revalidation secret' },
        { status: 401 }
      );
    }

    const revalidated: string[] = [];
    const errors: string[] = [];

    // Handle tag-based revalidation
    if (body.type === 'tag' || body.tag || body.tags) {
      const tags = body.tags || (body.tag ? [body.tag] : []);
      
      for (const tag of tags) {
        try {
          revalidateTag(tag);
          revalidated.push(`tag:${tag}`);
        } catch (error) {
          errors.push(`Failed to revalidate tag: ${tag} - ${error}`);
        }
      }
    }

    // Handle path-based revalidation
    if (body.type === 'path' || body.path || body.paths) {
      const paths = body.paths || (body.path ? [body.path] : []);
      
      for (const path of paths) {
        try {
          // Ensure path starts with /
          const normalizedPath = path.startsWith('/') ? path : `/${path}`;
          revalidatePath(normalizedPath);
          revalidated.push(`path:${normalizedPath}`);
        } catch (error) {
          errors.push(`Failed to revalidate path: ${path} - ${error}`);
        }
      }
    }

    // Default: revalidate home page if no specific path/tag provided
    if (revalidated.length === 0 && errors.length === 0) {
      revalidatePath('/');
      revalidated.push('path:/');
    }

    return NextResponse.json({
      success: true,
      revalidated,
      errors: errors.length > 0 ? errors : undefined,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error processing revalidation request',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Also support GET for simple testing (with secret in query param)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const path = searchParams.get('path') || '/';

  const expectedSecret = process.env.REVALIDATION_SECRET;
  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json(
      { success: false, message: 'Invalid revalidation secret' },
      { status: 401 }
    );
  }

  try {
    revalidatePath(path);
    return NextResponse.json({
      success: true,
      revalidated: [`path:${path}`],
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error revalidating path',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}


