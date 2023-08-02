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

  getToken(){
    return localStorage.getItem("token");
  }


}
