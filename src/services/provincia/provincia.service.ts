import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enviroment';
import { Observable } from 'rxjs';
import { Provincia, ResponseHttp } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  private baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }


  getProvincias() : Observable<ResponseHttp>{
    return this.http.get<ResponseHttp>(this.baseUrl + "/provincias");
  }

  borrarProvincia(codProvincia:number): Observable<ResponseHttp>{
    return this.http.get<ResponseHttp>(this.baseUrl + "/provincias/"+codProvincia);
  }
}
