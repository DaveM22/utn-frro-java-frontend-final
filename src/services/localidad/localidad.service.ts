import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { Localidad, Provincia } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {

  private baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  getLocalidades(){
    return this.http.get(this.baseUrl + "/localidades");
  }

  saveLocalidad(loc:Localidad, provincia:Provincia){
    return this.http.post<Localidad>(this.baseUrl + "/localidades/nuevo",{ciudad:loc.ciudad, provincia: provincia});
  }

  editLocalidad(loc:Localidad, provincia:Provincia){
    return this.http.put<Localidad>(this.baseUrl + "/localidades",{codigo:loc.codigo,ciudad:loc.ciudad, provincia: provincia});
  }

  borrarLocalidad(codigo:number){
    return this.http.delete<string>(this.baseUrl + "/localidades/"+codigo);
  }
}
