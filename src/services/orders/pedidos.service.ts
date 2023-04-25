import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseHttp } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http:HttpClient) { }


  getOrders() : Observable<ResponseHttp>{
    return this.http.get<ResponseHttp>("http://localhost:8080/api/orders");
  }

}
