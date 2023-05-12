import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseHttp } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private baseUrl = environment.apiUrl;
  
  constructor(private http:HttpClient) { }

  getDiscountsToday(){
    return this.http.get<ResponseHttp>(this.baseUrl + "/api/discount");
  }
}
