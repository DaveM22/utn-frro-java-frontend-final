import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria, ResponseHttp } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http:HttpClient) { }

  listaCategorias():Observable<ResponseHttp>{
    return this.http.get<ResponseHttp>('http://localhost:8080/api/categorias');
  }

  crearCategoria(cat:Categoria){
    return this.http.post('http://localhost:8080/api/categorias', cat);
  }

  editarCategoria(cat:Categoria){
    return this.http.put('http://localhost:8080/api/categorias', cat);
  }

  borrarCategoria(id:number){
    return this.http.delete('http://localhost:8080/api/categorias/'+id);
  }

}
