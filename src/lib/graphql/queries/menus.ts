// =============================================================================
// MENU QUERIES
// =============================================================================

export const GET_MAIN_MENU = `
  query GetMainMenu {
    menuItems(where: { location: MAIN_MENU }, first: 100) {
      nodes {
        id
        label
        url
        path
        parentId
        order
        target
        cssClasses
      }
    }
  }
`;

export const GET_FOOTER_MENU = `
  query GetFooterMenu {
    menuItems(where: { location: FOOTER_MENU }, first: 100) {
      nodes {
        id
        label
        url
        path
        parentId
        order
        target
      }
    }
  }
`;

export const GET_ALL_MENUS = `
  query GetAllMenus {
    mainMenu: menuItems(where: { location: MAIN_MENU }, first: 100) {
      nodes {
        id
        label
        url
        path
        parentId
        order
        target
        cssClasses
      }
    }
    footerMenu: menuItems(where: { location: FOOTER_MENU }, first: 100) {
      nodes {
        id
        label
        url
        path
        parentId
        order
        target
      }
    }
  }
`;

