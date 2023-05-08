import { HttpClient, HttpResponse } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'enviroment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  private baseUrl = environment.baseUrl;
  constructor(private http:HttpClient, private jwtHelper: JwtHelperService) { }


  login(creds:any){
    this.http.post(this.baseUrl + "/auth/authenticate", creds)
    .subscribe((res:any) => {
      localStorage.removeItem("token");
      localStorage.setItem("token", res.token);
    })
  }

  getToken(){
    return localStorage.getItem("token");
  }

  isLoggedIn(){
    const user =  localStorage.getItem("token");
    if(user){
      return !this.isExpirate(user);
    }
    return false;
  }
  
  isExpirate(token:string) {
    console.log(this.jwtHelper.isTokenExpired(token));
    return this.jwtHelper.isTokenExpired(token);
  }   
}
