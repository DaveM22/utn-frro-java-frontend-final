import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Provincia, ResponseHttp } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  private baseUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }


  getProvincias() : Observable<ResponseHttp>{
    return this.http.get<ResponseHttp>(this.baseUrl + "/provincias");
  }

  borrarProvincia(codProvincia:number): Observable<ResponseHttp>{
    return this.http.get<ResponseHttp>(this.baseUrl + "/provincies/"+codProvincia);
  }

  postProvince(province:Provincia):Observable<ResponseHttp> {
    return this.http.post<ResponseHttp>(this.baseUrl + "/provincies", province);
  }
}
