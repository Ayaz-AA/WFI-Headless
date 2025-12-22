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
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      details: error.response?.errors || error,
      message: 'GraphQL connection failed. Please check if WPGraphQL is installed and the endpoint is correct.' 
    }, { status: 500 });
  }
}

