import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Price, ResponseHttp } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private baseUrl = environment.apiUrl;


  constructor(private http:HttpClient) { }

  getPrices(productId:number, supplierId:number){
    return this.http.get<ResponseHttp>(this.baseUrl + "/api/prices/"+productId+"/"+supplierId);
  }

  postPrice(price:Price) : Observable<ResponseHttp> {
    return this.http.post<ResponseHttp>(this.baseUrl + "/api/prices", price);
  }

  deletePrice(price:Price): Observable<ResponseHttp> {
    return this.http.delete<ResponseHttp>(this.baseUrl + "/api/prices/"+price.personaId + "/"+ price.productId + "/" + price.dateFrom);
  }
}
