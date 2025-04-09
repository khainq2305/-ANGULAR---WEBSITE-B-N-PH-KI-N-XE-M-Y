import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { IUser } from 'src/app/interface/user.interface';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {
  
  constructor(
    protected _http: HttpClient,
  ) { 
    super(_http);
  }
  getAllUsers(): Observable<IUser[]> {
    return this.get<IUser[]>(API_ENDPOINT.user.base + API_ENDPOINT.user.list);
  }
}
