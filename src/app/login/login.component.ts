import { Component } from '@angular/core';
import { Validators,FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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

  constructor(private authService:AuthService, private router:Router, private messageService:MessageService ){}

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

    this.authService.login(this.creds).subscribe((res:any) => {
      localStorage.removeItem("token");
      localStorage.setItem("token", res.token);
      this.router.navigate([this.returnUrl]);
      this.messageService.add({ severity: 'success', summary: 'Ingreso', detail: 'Login exitoso', life: 3000 });
    });
    
  }
}
