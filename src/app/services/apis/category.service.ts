import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { Observable } from 'rxjs';
import {  ICategory} from '../../interface/category.interface';
import { API_ENDPOINT } from '../../config/api-endpoint.config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiService {

  constructor(
    private _http: HttpClient,
  ) 

  {
    super(_http);
   }
   getCategoryList() : Observable<ICategory[]>{
      return this.get<ICategory[]>(API_ENDPOINT.category.base + API_ENDPOINT.category.list)
   }
   addCategory(data: ICategory): Observable<ICategory> {
      return this.post<ICategory>(API_ENDPOINT.category.base + API_ENDPOINT.category.add, data)
   }
   updateCategory(data: ICategory): Observable<ICategory> {
    return this.put<ICategory>(API_ENDPOINT.category.base + API_ENDPOINT.category.update + data.id, data)
  }
    deleteCategory(id: number): Observable<ICategory[]> {
      return this.delete(API_ENDPOINT.category.base + API_ENDPOINT.category.delete + id) as Observable<ICategory[]>;
    }
    getCategoryById(id: number): Observable<ICategory> {
      return this.get<ICategory>(API_ENDPOINT.category.base + API_ENDPOINT.category.delete + id) as Observable<ICategory>;    
    }

    getClientCategoryList(): Observable<ICategory[]> {
      return this._http.get<ICategory[]>(API_ENDPOINT.categoryClient.base);
    }
    
}
