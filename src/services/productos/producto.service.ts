import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Product, ResponseHttp } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private baseUrl = environment.apiUrl
  constructor(private http:HttpClient) { }


  getProducts() : Observable<ResponseHttp>{
    return this.http.get<ResponseHttp>(this.baseUrl + "/products");
  }

  postProducts(producto:Product) : Observable<ResponseHttp>{
    return this.http.post<ResponseHttp>(this.baseUrl + "/products", producto);
  }

  putProducts(producto:Product) : Observable<ResponseHttp> {
    return this.http.put<ResponseHttp>(this.baseUrl + "/products", producto);
  }

  deleteProduct(idProducto:number): Observable<ResponseHttp>{
    return this.http.delete<ResponseHttp>(this.baseUrl + "/products/" + idProducto);
  }
}
