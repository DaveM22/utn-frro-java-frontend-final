import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ProductSupplier, ResponseHttp } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class ProductoProveedorService {

  private baseUrl = environment.apiUrl;
  
  constructor(private http:HttpClient) { }

  getAll(productoId:number):Observable<ResponseHttp>{
    return this.http.get<ResponseHttp>(this.baseUrl + "/api/productos-proveedores/" + productoId);
  }

  getProductsSupplier() : Observable<ResponseHttp> {
    return this.http.get<ResponseHttp>(this.baseUrl + "/api/productos-proveedores");
  }

  postProductSupplier(productSupplier:ProductSupplier){
    return this.http.post<ResponseHttp>(this.baseUrl + "/api/product-supplier/"+productSupplier.personaId+"/new", productSupplier);
  }

  putProductSupplier(productSupplier: ProductSupplier){
    return this.http.put<ResponseHttp>(this.baseUrl + "/api/product-supplier/"+productSupplier.personaId+"/edit", productSupplier);
  }
}
