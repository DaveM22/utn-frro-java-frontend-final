import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, ResponseHttp } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http:HttpClient) { }

  listaCategorias():Observable<ResponseHttp>{
    return this.http.get<ResponseHttp>('http://localhost:8080/api/categories');
  }

  postCategory(cat:Category){
    return this.http.post<ResponseHttp>('http://localhost:8080/api/categories', cat);
  }

  putCategory(cat:Category){
    return this.http.put<ResponseHttp>('http://localhost:8080/api/categories', cat);
  }

  borrarCategoria(id:number){
    return this.http.delete<ResponseHttp>('http://localhost:8080/api/categories/'+id);
  }

}
