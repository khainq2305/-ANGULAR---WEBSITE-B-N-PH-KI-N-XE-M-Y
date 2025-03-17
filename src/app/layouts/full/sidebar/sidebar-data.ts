import { NavItem } from './nav-item/nav-item';
// NavItem là một interface định nghĩa cấu trúc của từng mục menu.
export const navItems: NavItem[] = [
  {
    navCap: 'Trang chủ',
  },
  {
    displayName: 'Thống kê',
    iconName: 'layout-grid-add',
    route: '/dashboard',
  },
  {
    navCap: 'Thành phần giao diện',
  },
  {
    displayName: 'Danh mục',
    iconName: 'list-details',
    route: '/ui-components/category',
    children: [
      {
        displayName: 'Danh sách',
        iconName: 'list',
        route: '/ui-components/category/list',
      },
      {
        displayName: 'Thêm mới',
        iconName: 'plus',
        route: '/ui-components/category/add',
      },
    ],
  },
  {
    displayName: 'Sản phẩm',
    iconName: 'shopping-cart', // Thay đổi icon theo thư viện bạn dùng
    route: '/ui-components/product',
    children: [
      {
        displayName: 'Danh sách',
        iconName: 'list',
        route: '/ui-components/product/product-list',
      },
      {
        displayName: 'Thêm mới',
        iconName: 'plus',
        route: '/ui-components/product/product-create',
      }
    ]
  },

  {
    displayName: 'Người dùng',
    iconName: 'user', 
    route: '/ui-components/user',
    children: [
      {
        displayName: 'Danh sách',
        iconName: 'list', 
        route: '/ui-components/user/user-list',
      },

      {
        displayName: 'Thêm mới',
        iconName: 'plus', 
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
