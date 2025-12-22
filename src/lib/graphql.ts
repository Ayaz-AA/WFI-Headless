import { GraphQLClient } from 'graphql-request';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'https://backend.workforceinstitute.io/graphql';

export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  path: string;
  parentId?: string | null;
  order?: number;
  children?: MenuItem[];
}

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

interface RawMenuItemNode {
  id: string;
  label: string;
  url: string;
  path: string;
  parentId: string | null;
  order?: number;
}

function transformMenuItems(nodes: RawMenuItemNode[]): MenuItem[] {
  const items: MenuItem[] = [];
  const itemMap = new Map<string, MenuItem>();

  const sortedNodes = [...nodes].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    return 0;
  });

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
    
    if (!node.parentId) {
      items.push(item);
    }
  });

  return items;
}

