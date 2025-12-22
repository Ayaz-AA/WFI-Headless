import { GraphQLClient } from 'graphql-request';

// GraphQL endpoint
const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'https://backend.workforceinstitute.io/graphql';

export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  headers: {
    'Content-Type': 'application/json',
  },
});

// Menu item type
export interface MenuItem {
  id: string;
  label: string;
  url: string;
  path: string;
  parentId?: string | null;
  order?: number;
  children?: MenuItem[];
}

// GraphQL query to fetch menu
const GET_MENU_QUERY = `
  query GetMainMenu {
    menuItems(where: { location: MAIN_MENU }) {
      nodes {
        id
        label
        url
        path
        parentId
        order
      }
    }
  }
`;

// Function to fetch menu
export async function getMenu(): Promise<MenuItem[]> {
  try {
    const data = await graphqlClient.request(GET_MENU_QUERY);
    if (data?.menuItems?.nodes) {
      return transformMenuItems(data.menuItems.nodes);
    }
    return [];
  } catch (error) {
    console.error('Error fetching menu:', error);
    return [];
  }
}

// Raw menu item node from GraphQL response
interface RawMenuItemNode {
  id: string;
  label: string;
  url: string;
  path: string;
  parentId: string | null;
  order?: number;
}

// Transform menu items to our format
function transformMenuItems(nodes: RawMenuItemNode[]): MenuItem[] {
  const items: MenuItem[] = [];
  const itemMap = new Map<string, MenuItem>();

  // Sort by order if available
  const sortedNodes = [...nodes].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    return 0;
  });

  // First pass: create all items
  sortedNodes.forEach((node) => {
    const item: MenuItem = {
      id: node.id,
      label: node.label,
      url: node.url || node.path || '#',
      path: node.path || node.url || '#',
      parentId: node.parentId || null,
      order: node.order,
    };
    itemMap.set(node.id, item);
  });

  // Second pass: build hierarchy and collect root items
  sortedNodes.forEach((node) => {
    const item = itemMap.get(node.id)!;
    
    // Find children by checking parentId
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
    
    // Root items have no parentId
    if (!node.parentId) {
      items.push(item);
    }
  });

  return items;
}

