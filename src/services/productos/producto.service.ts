import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto, ResponseHttp } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }


  listaProductos() : Observable<ResponseHttp>{
    return this.http.get<ResponseHttp>("http://localhost:8080/api/productos");
  }

  agregarProducto(producto:Producto) : Observable<ResponseHttp>{
    return this.http.post<ResponseHttp>("http://localhost:8080/api/productos", producto);
  }

  eliminarProducto(idProducto:number): Observable<ResponseHttp>{
    return this.http.delete<ResponseHttp>("http://localhost:8080/api/productos/" + idProducto);
  }
}
