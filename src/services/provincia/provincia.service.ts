import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provincia, ResponseHttp } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  constructor(private http:HttpClient) { }


  getProvincias() : Observable<ResponseHttp>{
    return this.http.get<ResponseHttp>("http://localhost:8080/api/provincias");
  }

  borrarProvincia(codProvincia:number): Observable<ResponseHttp>{
    return this.http.get<ResponseHttp>("http://localhost:8080/api/provincias/"+codProvincia);
  }
}
