import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { Observable } from 'rxjs';
import {  ICategoryResponse} from '../../interface/category.interface';
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
   getCategoryList(): Observable<ICategoryResponse> {
    return this.get<ICategoryResponse>(API_ENDPOINT.category.base + API_ENDPOINT.category.list);
  }
   
}
