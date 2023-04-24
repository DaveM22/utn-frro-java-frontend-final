import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  constructor(private http:HttpClient) { }


  login(creds:any){
    this.http.post("http://localhost:8080/api/auth/authenticate", creds)
    .subscribe((res:any) => {
      localStorage.setItem("token", res.token);
    })
  }

  getToken(){
    return localStorage.getItem("token");
  }
  
}
