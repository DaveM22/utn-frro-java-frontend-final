import { Component } from '@angular/core';
import { Validators,FormControl, FormGroup } from '@angular/forms';
import { Credentials } from 'src/models/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  creds: Credentials = {
    email: '',
    clave: ''
  }
  submitted = false;

  constructor(){}

  ngOnInit() {
    this.loginForm = new FormGroup({
        'login': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required)
    });
  }
  onSubmit() { 
    this.submitted = true;
    this.creds.email = this.loginForm.value.login;
    this.creds.clave = this.loginForm.value.password;
  }
}
