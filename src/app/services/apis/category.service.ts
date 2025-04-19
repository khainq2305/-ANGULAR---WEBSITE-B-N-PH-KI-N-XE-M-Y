import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { Observable } from 'rxjs';
import { ICategory } from '../../interface/category.interface';
import { API_ENDPOINT } from '../../config/api-endpoint.config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiService {
  [x: string]: any;

  constructor(
    private _http: HttpClient,
  ) 

  {
    super(_http);
   }
   // Update your getCategoryList method to match the full API response structure
   getCategoryList(params?: { [key: string]: any }): Observable<{ 
    status: number; 
    message: string; 
    data: ICategory[]; 
    totalPages: number;
    totalItems: number;
    currentPage: number;
  }> {
    let queryString = '';
    if (params) {
      queryString = '?' + Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    }
    return this.get<{ 
      status: number; 
      message: string; 
      data: ICategory[]; 
      totalPages: number;
      totalItems: number;
      currentPage: number;
    }>(
      `${API_ENDPOINT.category.base}${API_ENDPOINT.category.list}${queryString}`
    );
  }  
  
   getCategoryListDelete() : Observable<ICategory[]>{
    return this.get<ICategory[]>(API_ENDPOINT.category.base + API_ENDPOINT.category.softDelete)
 }
   addCategory(formData: FormData): Observable<ICategory> {
    return this._http.post<ICategory>(API_ENDPOINT.category.base + API_ENDPOINT.category.add, formData);
  }
  
   updateCategory(formData: ICategory): Observable<ICategory> {
    return this.put<ICategory>(API_ENDPOINT.category.base + API_ENDPOINT.category.update + formData.id, formData)
  }
  updateCategoryFormData(id: number | string, data: FormData): Observable<any> {
    return this._http.put(`${API_ENDPOINT.category.base + API_ENDPOINT.category.update}${id}`, data);
  }
  
  
    deleteCategory(id: number): Observable<ICategory[]> {
      return this.delete(API_ENDPOINT.category.base + API_ENDPOINT.category.delete + id) as Observable<ICategory[]>;
    }
    getCategoryById(id: number): Observable<ICategory> {
      return this.get<ICategory>(API_ENDPOINT.category.base + API_ENDPOINT.category.getById + id)
    }
    softDeleteCategory(formData: ICategory): Observable<ICategory> {
      return this.put<ICategory>(API_ENDPOINT.category.base + API_ENDPOINT.category.softDeleteById+ formData.id, formData);
    }
    restoreCategory(formData: ICategory): Observable<ICategory> {
      return this.put<ICategory>(API_ENDPOINT.category.base + API_ENDPOINT.category.restore + formData.id, formData) ;
    }

    getActiveCategories(): Observable<{ success: boolean; data: ICategory[] }> {
      return this._http.get<{ success: boolean; data: ICategory[] }>(
        API_ENDPOINT.category.base + API_ENDPOINT.category.active,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token') || '',
          }),
        }
      );
    }
    
    
    
    
} 
