import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Discount, ResponseHttp } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private baseUrl = environment.apiUrl;
  
  constructor(private http:HttpClient) { }

  getDiscountsToday(){
    return this.http.get<ResponseHttp>(this.baseUrl + "/api/discount");
  }

  getAll(){
    return this.http.get<ResponseHttp>(this.baseUrl + "/api/discount/all");
  }

  post(discount:Discount){
    return this.http.post<ResponseHttp>(this.baseUrl + "/api/discount", discount);
  }

  delete(discount:Discount){
    return this.http.delete<ResponseHttp>(this.baseUrl + "/api/discount/" + discount.validityDate + "/" + discount.amountPrice)
  }
}
