import { HttpClient, HttpResponse } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  private baseUrl = "http://localhost:8080/api";
    redirectUrl: any;
  constructor(private http:HttpClient, private jwtHelper: JwtHelperService, private router: Router) { }


  login(creds:any){
    return this.http.post(this.baseUrl + "/auth/authenticate", creds);
  }

  getToken(){
    return localStorage.getItem("token");
  }

  isLoggedIn(){
    const user =  localStorage.getItem("token");
    if(user !== null && user !== undefined){
      return !this.isExpirate(user);
    }
    return false;
  }
  
  isExpirate(token:string) {
    return this.jwtHelper.isTokenExpired(token);
  }   

}
