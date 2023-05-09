import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { ProductSupplier, ResponseHttp } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class ProductoProveedorService {

  private baseUrl = environment.baseUrl;
  
  constructor(private http:HttpClient) { }

  listaProductoProveedores(productoId:number):Observable<ResponseHttp>{
    return this.http.get<ResponseHttp>(this.baseUrl + "/productos-proveedores/" + productoId);
  }

  getProductsSupplier() : Observable<ResponseHttp> {
    return this.http.get<ResponseHttp>(this.baseUrl + "/productos-proveedores");
  }

  postProductSupplier(productSupplier:ProductSupplier){
    return this.http.post<ResponseHttp>(this.baseUrl + "/product-supplier/"+productSupplier.personaId+"/new", productSupplier);
  }
}
