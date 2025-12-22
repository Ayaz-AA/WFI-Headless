import { NextResponse } from 'next/server';
import { getMenu } from '@/lib/graphql';

export async function GET() {
  try {
    const menuItems = await getMenu();
    return NextResponse.json({ 
      success: true, 
      menuItems,
      count: menuItems.length,
      message: 'GraphQL connection successful! Main menu loaded.' 
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorDetails = error && typeof error === 'object' && 'response' in error 
      ? (error as { response?: { errors?: unknown } }).response?.errors || error
      : error;
    
    return NextResponse.json({ 
      success: false, 
      error: errorMessage,
      details: errorDetails,
      message: 'GraphQL connection failed. Please check if WPGraphQL is installed and the endpoint is correct.' 
    }, { status: 500 });
  }
}

