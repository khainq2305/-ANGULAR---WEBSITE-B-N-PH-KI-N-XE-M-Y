
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { API_ENDPOINT } from '../../config/api-endpoint.config';

import { ApiService } from '../common/api.service';


@Injectable({
  providedIn: 'root'
})
export class ClientUserService {
  
  constructor(private api: ApiService) {}

  register(data: any): Observable<any> {
    
    return this.api.post(
      `${API_ENDPOINT.auth.base}${API_ENDPOINT.auth.register}`, 
      data
    );
  }



  login(data: any): Observable<any> {

    return this.api.post(
      `${API_ENDPOINT.auth.base}${API_ENDPOINT.auth.login}`, 
      data
    );
  }

 
  getUserId(): number | null {
   
    const user = JSON.parse(localStorage.getItem('user')!); 
 
    return user?.id || null;
  }
}
