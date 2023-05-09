import { Component } from '@angular/core';
import { Validators,FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Credentials } from 'src/models/models';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  returnUrl!:any;
  creds: Credentials = {
    email: '',
    password: ''
  }
  submitted = false;

  constructor(private authService:AuthService, private router:Router ){}

  ngOnInit() {
    this.returnUrl = history.state.returnUrl || '/';
    console.log(history);
    this.loginForm = new FormGroup({
        'login': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required)
    });
  }

  onSubmit() { 
    this.submitted = true;
    console.log(this.returnUrl);
    this.authService.login(this.creds).subscribe((res:any) => {
      localStorage.removeItem("token");
      localStorage.setItem("token", res.token);
      this.router.navigate([this.returnUrl]);
    });
    
  }
}
