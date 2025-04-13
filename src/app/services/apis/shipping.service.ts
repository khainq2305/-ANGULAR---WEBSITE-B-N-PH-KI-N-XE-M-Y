// src/app/services/apis/shipping.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from 'src/app/config/api-endpoint.config';
import { ApiService } from '../common/api.service'; // thêm
@Injectable({ providedIn: 'root' })
export class ShippingService {
  constructor(private http: HttpClient, private api: ApiService ) {}

  getProvinces(): Observable<any> {
    return this.http.get(API_ENDPOINT.ghn.base + API_ENDPOINT.ghn.provinces);
  }

  getDistricts(provinceId: number): Observable<any> {
    return this.http.get(API_ENDPOINT.ghn.base + API_ENDPOINT.ghn.districts(provinceId));
  }

  getWards(districtId: number): Observable<any> {
    return this.http.get(API_ENDPOINT.ghn.base + API_ENDPOINT.ghn.wards(districtId));
  }

  getAvailableServices(toDistrict: number): Observable<any> {
    return this.http.post(`${API_ENDPOINT.ghn.base}/available-services`, {
      to_district: toDistrict
    });
  }
  

  // ✅ Đây là đoạn bạn hỏi — đặt trong file này luôn
  calculateFee(payload: {
    toDistrictId: number,
    serviceId: number,
    weight: number,
    wardCode: string
  }): Observable<any> {
    return this.http.post(`${API_ENDPOINT.ghn.base}/fee`, payload);
  }
  placeOrder(payload: any): Observable<any> {
    return this.api.post(`${API_ENDPOINT.orderClient.base}${API_ENDPOINT.orderClient.place}`, payload);
  }
  
  
  
  
}
