import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Location, Province, ResponseHttp } from 'src/models/models';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getLocation(){
    return this.http.get(this.baseUrl + "/api/locations");
  }

  postLocation(loc:Location){
    return this.http.post<ResponseHttp>(this.baseUrl + "/api//locations",loc);
  }

  putLocation(loc:Location) : Observable<ResponseHttp> {
    return this.http.put<ResponseHttp>(this.baseUrl + "/api//locations",loc);
  }

  deleteLocation(codigo:number) : Observable<ResponseHttp> {
    return this.http.delete<ResponseHttp>(this.baseUrl + "/api//locations/"+codigo);
  }
}
