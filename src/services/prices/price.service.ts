import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enviroment';
import { Observable } from 'rxjs';
import { Prices, ResponseHttp } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private baseUrl = environment.baseUrl;


  constructor(private http:HttpClient) { }


  postPrice(price:Prices) : Observable<ResponseHttp> {
    return this.http.post<ResponseHttp>(this.baseUrl + "/prices", price);
  }
}
