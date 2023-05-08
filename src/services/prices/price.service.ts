import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prices, ResponseHttp } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(private http:HttpClient) { }


  postPrice(price:Prices) : Observable<ResponseHttp> {
    console.log(price);
    return this.http.post<ResponseHttp>("http://localhost:8080/api/prices", price);
  }
}
