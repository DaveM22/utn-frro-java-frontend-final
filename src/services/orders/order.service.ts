import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, ResponseHttp } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }


  getOrders() : Observable<ResponseHttp>{
    return this.http.get<ResponseHttp>("http://localhost:8080/api/orders");
  }

  postOrder(order:Order){
    return this.http.post<ResponseHttp>("http://localhost:8080/api/orders", order);
  }

}
