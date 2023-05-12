import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, ResponseHttp } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  listaCategorias():Observable<ResponseHttp>{
    return this.http.get<ResponseHttp>(this.baseUrl +'/api/categories');
  }

  postCategory(cat:Category){
    return this.http.post<ResponseHttp>(this.baseUrl +"/api/categories'", cat);
  }

  putCategory(cat:Category){
    return this.http.put<ResponseHttp>(this.baseUrl + '/api/categories', cat);
  }

  borrarCategoria(id:number){
    return this.http.delete<ResponseHttp>(this.baseUrl +'/api/categories/'+id);
  }

}
