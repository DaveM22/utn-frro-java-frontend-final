import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Producto, ResponseHttp } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private baseUrl = environment.apiUrl
  constructor(private http:HttpClient) { }


  listaProductos() : Observable<ResponseHttp>{
    return this.http.get<ResponseHttp>(this.baseUrl + "/productos");
  }

  agregarProducto(producto:Producto) : Observable<ResponseHttp>{
    return this.http.post<ResponseHttp>(this.baseUrl + "/productos", producto);
  }

  eliminarProducto(idProducto:number): Observable<ResponseHttp>{
    return this.http.delete<ResponseHttp>(this.baseUrl + "/productos/" + idProducto);
  }
}
