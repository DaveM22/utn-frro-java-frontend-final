import { HttpClient, HttpResponse } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwtDecode from 'jwt-decode';

import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private userRoles = new BehaviorSubject<string>('');

  private baseUrl = environment.apiUrl;
    redirectUrl: any;
  constructor(private http:HttpClient, private jwtHelper: JwtHelperService, private router: Router, private messageService:MessageService) { 

    this.isAuthenticated.next(this.isLoggedIn());
    if(this.isLoggedIn()){
      this.userRoles.next(this.getRoles());
    }
  }


  login(creds:any){
    localStorage.removeItem("token");
    return this.http.post(this.baseUrl + "/auth/authenticate", creds).subscribe(
      {
        next:(res:any) => {
         
          localStorage.setItem("token", res.token);
          this.messageService.add({ severity: 'success', summary: 'Ingreso', detail: 'Login exitoso', life: 3000 });
          this.isAuthenticated.next(true);
          let decodedToken = jwtDecode(res.token) as any;
          console.log(decodedToken.roles);
          this.userRoles.next(decodedToken.roles);
          console.log(history.state);
          this.router.navigate([history.state.returnUrl || '/']);
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Ingreso', detail: "Los datos de nombre de usuario y/o contraseña son incorrectos", life: 3000 });
        }
      });
  ;
  }

  logout(){
    localStorage.removeItem('token');

    // Actualizar el estado de autenticación y los roles
    this.isAuthenticated.next(false);
    this.userRoles.next('');
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

  getIsAuthenticated(): BehaviorSubject<boolean> {
    return this.isAuthenticated;
  }

  getUserRoles(): BehaviorSubject<string> {
    return this.userRoles;
  }

}
