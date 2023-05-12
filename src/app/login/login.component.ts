import { Component, OnDestroy } from '@angular/core';
import { Validators,FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { MessageService } from 'primeng/api';
import { Credentials } from 'src/models/models';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  loginForm!: FormGroup;
  returnUrl!:any;
  creds: Credentials = {
    email: '',
    password: ''
  }

  constructor(private authService:AuthService ){}


  ngOnInit() {
    this.returnUrl = history.state.returnUrl || '/';
    this.loginForm = new FormGroup({
        'login': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required)
    });
  }

  onSubmit() { 

    this.authService.login(this.creds);
    }
  
}
