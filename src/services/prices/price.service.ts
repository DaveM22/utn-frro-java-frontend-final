import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Prices, ResponseHttp } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private baseUrl = environment.apiUrl;


  constructor(private http:HttpClient) { }


  postPrice(price:Prices) : Observable<ResponseHttp> {
    return this.http.post<ResponseHttp>(this.baseUrl + "/prices", price);
  }
}
