import { enviroment } from "../../environments/environment";

export const API_BASE_URL = enviroment.apiUrl;

export const API_ENDPOINT = {
  category: {
    base: API_BASE_URL + '/' + 'admin/categories',
    list: '/list',
    add: '/add',
    update: '/update/',
    delete: '/delete/',
  },
  
 
  order: {
    base: API_BASE_URL + '/admin/orders',
    list: '/list'
  },
  cart: {
    base: API_BASE_URL + '/cart',
    add: '/add' ,
    getByUser: '/user', 
  },
  product: {
    base: API_BASE_URL + '/admin/products',
    list: '/list',
    add: '/add',
    deleteMultiple: '/delete-multiple',
    restore: '/restore',                      // PATCH /restore/:id
    restoreMultiple: '/restore-multiple',     // PATCH /restore-multiple
    permanentDelete: '/permanent',            // DELETE /permanent/:id
    permanentDeleteMultiple: '/permanent-delete-multiple' // DELETE body { ids }
  },
  
  user: {
    base: API_BASE_URL + '/admin/user',
    list: '/',
    add: '/',
    register: '/register',
    login: '/login',
    edit: (id: number | string) => `/${id}`,
    delete: (id: number | string) => `/${id}`,
    toggleStatus: (id: number | string) => `/${id}/status`,
    resetPassword: (id: number | string) => `/${id}/reset-password`
  },


  comment: {
    base: `${API_BASE_URL}/admin/comment`,
    summary: '/summary',
    byProduct: (productId: number) => `${API_BASE_URL}/admin/comment/product/${productId}`,
    reply: (commentId: number) => `${API_BASE_URL}/admin/comment/${commentId}/reply`,
    update: (commentId: number) => `${API_BASE_URL}/admin/comment/${commentId}`,
    delete: (commentId: number) => `${API_BASE_URL}/admin/comment/${commentId}`,
    create: `${API_BASE_URL}/admin/comment`
  },




  productClient: {
    base: `${API_BASE_URL}/products`
  },
  categoryClient: {
    base: API_BASE_URL + '/categories' 
  }
};


