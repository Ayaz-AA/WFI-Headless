// =============================================================================
// LEGACY GRAPHQL EXPORTS - Re-exports from new modular structure
// =============================================================================
// This file is maintained for backward compatibility.
// New code should import from '@/lib/wordpress' or '@/lib/graphql' directly.

// Re-export everything from the new modular structure
export { graphqlClient, fetchGraphQL } from './graphql/client';
export type { MenuItem, WPMenuItem } from './graphql/types';
export { getMainMenu as getMenu } from './wordpress';

