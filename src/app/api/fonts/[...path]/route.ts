import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy route for WordPress fonts to avoid CORS issues
 * Usage: /api/fonts/wp-content/themes/Divi/core/admin/fonts/modules/all/modules.woff
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    // Await params in Next.js 15+
    const { path } = await params;
    // Reconstruct the path from the array
    const fontPath = path.join('/');
    
    // Construct the WordPress backend URL (always use HTTPS)
    // Handle both HTTP and HTTPS font paths
    let backendUrl = fontPath.startsWith('http') 
      ? fontPath.replace('http://', 'https://')
      : `https://backend.workforceinstitute.io/${fontPath}`;
    
    // Ensure we're using HTTPS
    if (backendUrl.startsWith('http://')) {
      backendUrl = backendUrl.replace('http://', 'https://');
    }
    
    // Fetch the font file from WordPress backend
    const fontResponse = await fetch(backendUrl, {
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!fontResponse.ok) {
      return new NextResponse('Font not found', { status: 404 });
    }

    // Get the font data as an array buffer
    const fontData = await fontResponse.arrayBuffer();

    // Determine content type based on file extension
    const extension = fontPath.split('.').pop()?.toLowerCase();
    let contentType = 'application/octet-stream';
    
    switch (extension) {
      case 'woff':
        contentType = 'font/woff';
        break;
      case 'woff2':
        contentType = 'font/woff2';
        break;
      case 'ttf':
        contentType = 'font/ttf';
        break;
      case 'otf':
        contentType = 'font/otf';
        break;
      case 'eot':
        contentType = 'application/vnd.ms-fontobject';
        break;
      default:
        contentType = 'application/octet-stream';
    }

    // Return the font with proper headers
    return new NextResponse(fontData, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'public, max-age=31536000, immutable', // Cache fonts for 1 year
      },
    });
  } catch (error) {
    console.error('Error proxying font:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

