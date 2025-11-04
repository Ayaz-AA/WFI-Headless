import { testGraphQLConnection, getPageBySlug } from '@/lib/graphql';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test GraphQL connection
    const connectionTest = await testGraphQLConnection();
    
    if (!connectionTest) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'GraphQL endpoint is not accessible',
          error: 'Connection test failed'
        },
        { status: 500 }
      );
    }

    // Try to fetch the test-page
    const page = await getPageBySlug('test-page');

    return NextResponse.json({
      success: true,
      connectionTest: connectionTest,
      page: page ? {
        id: page.id,
        title: page.title,
        slug: page.slug,
        hasContent: !!page.content,
        contentLength: page.content?.length || 0,
      } : null,
      message: page 
        ? 'Successfully connected and fetched test-page'
        : 'Connected but test-page not found',
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        success: false,
        message: 'Error testing GraphQL connection',
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

