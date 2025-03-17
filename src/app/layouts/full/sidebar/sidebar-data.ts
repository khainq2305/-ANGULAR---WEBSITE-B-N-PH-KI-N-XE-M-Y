import { NavItem } from './nav-item/nav-item';
// NavItem là một interface định nghĩa cấu trúc của từng mục menu.
export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-grid-add',
    route: '/dashboard',
  },
  {
    navCap: 'Ui Components',
  },
  {
    displayName: 'Chips',
    iconName: 'info-circle',
    route: '/ui-components/chips',
  },
  {
    displayName: 'Lists',
    iconName: 'list-details',
    route: '/ui-components/lists',
  },
  {
    displayName: 'Sản phẩm',
    iconName: 'shopping-cart', // Thay đổi icon theo thư viện bạn dùng
    route: '/ui-components/product',
    children: [
      {
        displayName: 'Danh sách sản phẩm',
        iconName: 'list',
        route: '/ui-components/product/product-list',
      },
      {
        displayName: 'Thêm sản phẩm',
        iconName: 'plus',
        route: '/ui-components/product/product-create',
      }
    ]
  },
  {
    displayName: 'Forms',
    iconName: 'clipboard-text',
    route: '/ui-components/forms',
  },
  {
    displayName: 'Tables',
    iconName: 'table',
    route: '/ui-components/tables',
  },

  {
    displayName: 'User',
    iconName: 'user', 
    route: '/ui-components/user',
    children: [
      {
        displayName: 'User-list',
        iconName: 'list', 
        route: '/ui-components/user/user-list',
      },

      {
        displayName: 'User-create',
        iconName: 'clipboard-text', 
        route: '/ui-components/user/user-create',
      },
     
      
    ],
  },
  
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'login',
    route: '/authentication',
    children: [
      {
        displayName: 'Login',
        iconName: 'point',
        route: '/authentication/login',
      },
    ],
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication',
    children: [
      {
        displayName: 'Register',
        iconName: 'point',
        route: '/authentication/register',
      },
    ],
  },
];
