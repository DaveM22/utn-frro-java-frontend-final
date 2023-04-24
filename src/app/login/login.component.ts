import { Component } from '@angular/core';
import { Validators,FormControl, FormGroup } from '@angular/forms';
import { Credentials } from 'src/models/models';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  creds: Credentials = {
    email: '',
    password: ''
  }
  submitted = false;

  constructor(private authService:AuthService){}

  ngOnInit() {
    this.loginForm = new FormGroup({
        'login': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required)
    });
  }

  onSubmit() { 
    this.submitted = true;
    this.authService.login(this.creds);
  }
}
