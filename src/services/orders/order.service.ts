import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enviroment';
import { Observable } from 'rxjs';
import { Order, ResponseHttp } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }


  getOrders() : Observable<ResponseHttp>{
    return this.http.get<ResponseHttp>(this.baseUrl + "/orders");
  }

  postOrder(order:Order){
    return this.http.post<ResponseHttp>(this.baseUrl + "/orders", order);
  }

}
