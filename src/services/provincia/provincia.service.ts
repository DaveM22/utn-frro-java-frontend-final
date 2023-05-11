import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Province, ResponseHttp } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  private baseUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }


  getProvincias() : Observable<ResponseHttp>{
    return this.http.get<ResponseHttp>(this.baseUrl + "/provinces");
  }

  deleteProvincia(codProvince:number): Observable<ResponseHttp>{
    return this.http.delete<ResponseHttp>(this.baseUrl + "/provinces/"+codProvince);
  }

  postProvince(province:Province):Observable<ResponseHttp> {
    return this.http.post<ResponseHttp>(this.baseUrl + "/provinces", province);
  }

  putProvince(province:Province):Observable<ResponseHttp> {
    return this.http.put<ResponseHttp>(this.baseUrl + "/provinces", province);
  }
}
