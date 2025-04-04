import { enviroment } from "../../environments/environment";

export const API_BASE_URL = enviroment.apiUrl;

export const API_ENDPOINT = {
  category: {
    base: API_BASE_URL + '/' + 'categories',
    list: '/list',
    add: '/add',
  }
  
};
