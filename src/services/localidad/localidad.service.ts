import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Localidad, Provincia } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {

  constructor(private http:HttpClient) { }

  getLocalidades(){
    return this.http.get("http://localhost:8080/api/localidades");
  }

  saveLocalidad(loc:Localidad, provincia:Provincia){
    return this.http.post<Localidad>("http://localhost:8080/api/localidades/nuevo", {ciudad:loc.ciudad, provincia: provincia});
  }

  editLocalidad(loc:Localidad, provincia:Provincia){
    return this.http.put<Localidad>("http://localhost:8080/api/localidades",{codigo:loc.codigo,ciudad:loc.ciudad, provincia: provincia});
  }

  borrarLocalidad(codigo:number){
    return this.http.delete<string>("http://localhost:8080/api/localidades/"+codigo);
  }
}
