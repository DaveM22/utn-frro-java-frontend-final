import { HttpClient, HttpResponse } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwtDecode from 'jwt-decode';

import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  private baseUrl = environment.apiUrl;
    redirectUrl: any;
  constructor(private http:HttpClient, private jwtHelper: JwtHelperService, private router: Router, private messageService:MessageService) { 

  }


  login(creds:any) : Observable<any>{

    return this.http.post(this.baseUrl + "/auth/authenticate", creds);
  }

  logout(){
    localStorage.removeItem('token');
  }

  getRoles(): string {
    let token = localStorage.getItem('token');
    let decodedToken = jwtDecode(token!) as any;
    const roles = decodedToken.roles;
    return roles;
  }



  getToken(){
    return localStorage.getItem("token");
  }

  isAdmin(){
    const token = localStorage.getItem('token');
    let decodedToken = jwtDecode(token!) as any;
    const roles = decodedToken.roles;
    if(roles.includes("ADMIN")){
      return true;
    }
    return false;
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
