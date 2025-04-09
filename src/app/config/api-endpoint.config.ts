import { enviroment } from "../../environments/environment";

export const API_BASE_URL = enviroment.apiUrl;

export const API_ENDPOINT = {
  category: {
    base: API_BASE_URL + '/' + 'admin/categories',
    list: '/list',
    add: '/add',
  }
  ,
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
  
  order: {
    base: API_BASE_URL + '/admin/orders',
    list: '/list'
  }
  
};
