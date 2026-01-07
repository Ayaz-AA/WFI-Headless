import { GraphQLClient } from 'graphql-request';

// WordPress GraphQL endpoint
const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'https://backend.workforceinstitute.io/graphql';

// Create the GraphQL client
export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authenticated client for preview/draft content
export function getAuthenticatedClient(token?: string) {
  return new GraphQLClient(GRAPHQL_ENDPOINT, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
}

// Helper to handle GraphQL errors gracefully
export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: { preview?: boolean }
): Promise<T | null> {
  try {
    const client = options?.preview && process.env.WP_AUTH_TOKEN
      ? getAuthenticatedClient(process.env.WP_AUTH_TOKEN)
      : graphqlClient;
    
    const data = await client.request<T>(query, variables);
    return data;
  } catch (error: unknown) {
    // Check if this is a GraphQL schema error (field doesn't exist)
    // This is expected when ACF Options Pages aren't set up yet
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    if (errorMessage.includes('Cannot query field')) {
      // Silently return null for missing fields - components will use fallbacks
      if (process.env.NODE_ENV === 'development') {
        console.warn('[GraphQL] Schema field not available - using fallback values');
      }
      return null;
    }
    
    // Log other errors for debugging
    console.error('GraphQL fetch error:', errorMessage);
    return null;
  }
}

