import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  constructor(private http:HttpClient) { }


  getProvincias(){
    return this.http.get("http://localhost:8080/api/provincias");
  }
}
