import { enviroment } from '../../environments/environment';

export const API_BASE_URL = enviroment.apiUrl;
export const DEFAULT_IMAGE_URL = `${API_BASE_URL}/uploads/default.jpg`;
export const DEFAULT_IMAGE_USER = 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'
export const API_ENDPOINT = {
  category: {
    base: API_BASE_URL + '/admin/' + 'categories',
    list: '/list',
    add: '/add',
    update: '/update/',
    delete: '/delete/',
    uploads: API_BASE_URL + '/uploads',
    getById: '/',
    
    softDelete: '/soft-delete/list',
    softDeleteById: '/soft-delete/',
    restore: '/restore/',
  },
  
  order: {
    base: API_BASE_URL + '/admin/orders',
    list: '/list',
  },
  orderClient: {
    base: API_BASE_URL + '/orders',
    place: '/place',
    getByUser: '/user',
  },
  cart: {
    base: API_BASE_URL + '/cart',
    add: '/add',
    getByUser: '/user',
  },
  product: {
    base: API_BASE_URL + '/admin/products',
    list: '/list',
    add: '/add',
    deleteMultiple: '/delete-multiple',
    restore: '/restore', // PATCH /restore/:id
    restoreMultiple: '/restore-multiple', // PATCH /restore-multiple
    permanentDelete: '/permanent', // DELETE /permanent/:id
    permanentDeleteMultiple: '/permanent-delete-multiple', // DELETE body { ids }
  },

  user: {
    base: API_BASE_URL + '/admin/user',
    list: '/',
    add: '/',

    edit: (id: number | string) => `/${id}`,
    delete: (id: number | string) => `/${id}`,
    toggleStatus: (id: number | string) => `/${id}/status`,
    resetPassword: (id: number | string) => `/${id}/reset-password`,
  },
  auth: {
    base: API_BASE_URL,
    register: '/register',
    login: '/login',
  },
  comment: {
    base: `${API_BASE_URL}/admin/comment`,
    summary: '/summary',
    byProduct: (productId: number, page: number, limit: number) =>
      `${API_BASE_URL}/admin/comment/product/${productId}?page=${page}&limit=${limit}`,
    reply: (commentId: number) =>
      `${API_BASE_URL}/admin/comment/${commentId}/reply`,
    update: (commentId: number) => `${API_BASE_URL}/admin/comment/${commentId}`,
    delete: (commentId: number) => `${API_BASE_URL}/admin/comment/${commentId}`,
    create: `${API_BASE_URL}/admin/comment`,
    getCommentByUser: (userId: number, productId: number,) =>
      `${API_BASE_URL}/comments?userId=${userId}&productId=${productId}`,    
  },

  productClient: {
    base: `${API_BASE_URL}/products`,
    featured: '/featured',
  },
  categoryClient: {
    base: API_BASE_URL + '/categories',
  },
  ghn: {
    base: API_BASE_URL + '/ghn',
    provinces: '/provinces',
    districts: (provinceId: number) => `/districts/${provinceId}`,
    wards: (districtId: number) => `/wards/${districtId}`,
    availableServices: '/available-services',
    fee: '/fee',
  },
  review: {
    base: API_BASE_URL + '/comments',
    create: '/', // ✅ đúng
    getByProduct: (productId: number) => `/product/${productId}`,
  }
  
  
};
