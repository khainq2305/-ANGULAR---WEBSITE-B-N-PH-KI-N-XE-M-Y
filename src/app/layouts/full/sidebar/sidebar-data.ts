import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Trang chủ',
  },
  {
    displayName: 'Thống kê',
    iconName: 'layout-grid-add',
    route: '/admin/dashboard',
  },
  {
    navCap: 'Thành phần giao diện',
  },
  {
    displayName: 'Danh mục',
    iconName: 'list-details',
    route: '/admin/ui-components/category',
    children: [
      {
        displayName: 'Danh sách',
        iconName: 'list',
        route: '/admin/ui-components/category/list',
      },
      {
        displayName: 'Thêm mới',
        iconName: 'plus',
        route: '/admin/ui-components/category/add',
      },
    ],
  },
  {
    displayName: 'Sản phẩm',
    iconName: 'shopping-cart',
    route: '/admin/ui-components/product',
    children: [
      {
        displayName: 'Danh sách',
        iconName: 'list',
        route: '/admin/ui-components/product/product-list',
      },
      {
        displayName: 'Thêm mới',
        iconName: 'plus',
        route: '/admin/ui-components/product/product-create',
      }
    ]
  },
  {
    displayName: 'Người dùng',
    iconName: 'user',
    route: '/admin/ui-components/user',
    children: [
      {
        displayName: 'Danh sách',
        iconName: 'list',
        route: '/admin/ui-components/user/user-list',
      },
      {
        displayName: 'Thêm mới',
        iconName: 'plus',
        route: '/admin/ui-components/user/user-create',
      },
    ],
  },
  {
    displayName: 'Đơn hàng',
    iconName: 'shopping-bag',
    route: '/admin/ui-components/order',
    children: [
      {
        displayName: 'Danh sách đơn hàng',
        iconName: 'list',
        route: '/admin/ui-components/order/order-list',
      },
    ],
  },
  {
    displayName: 'Bình luận',
    iconName: 'message-circle',
    route: '/admin/ui-components/comment',
    children: [
      {
        displayName: 'Danh sách bình luận',
        iconName: 'list',
        route: '/admin/ui-components/comment/comment-list',
      }
    ],
  },
  {
    displayName: 'Liên hệ',
    iconName: 'phone',
    route: '/admin/ui-components/contact',
    children: [
      {
        displayName: 'Danh sách liên hệ',
        iconName: 'list',
        route: '/admin/ui-components/contact/contact-list',
      }
    ],
  }
];
