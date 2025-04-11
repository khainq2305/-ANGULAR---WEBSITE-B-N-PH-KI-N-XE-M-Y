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
  
  user: {
    base: API_BASE_URL + '/' + 'users', 
    list: '/list',
    add: '/add',
    update: '/update',
    delete: '/delete',
    getById: '/getById',
    register: '/register',
    login: '/login'
  },
  order: {
    base: API_BASE_URL + '/admin/orders',
    list: '/list'
  },
  cart: {
    base: API_BASE_URL + '/cart',
    add: '/add' ,
    getByUser: '/user', // ✅ thêm dòng này 
  }
  
};
