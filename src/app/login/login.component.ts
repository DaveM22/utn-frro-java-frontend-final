import { Component, OnDestroy } from '@angular/core';
import { Validators,FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import jwtDecode from 'jwt-decode';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Credentials } from 'src/models/models';
import { AuthService } from 'src/services/auth/auth.service';
import { LoginAction } from 'src/store/actions/login.action';
import { LoginState } from 'src/store/states/login.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  @Select(LoginState.isLogged) isLogged!:Observable<boolean>;
  loginForm!: FormGroup;
  returnUrl!:any;
  creds: Credentials = {
    email: '',
    password: ''
  }

  constructor(private store:Store, private router:Router ){}


  ngOnInit() {
    if(this.store.selectSnapshot(LoginState.isLogged)){
      this.router.navigateByUrl("/")
    }
    this.returnUrl = history.state.returnUrl || '/';
    this.loginForm = new FormGroup({
        'email': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required)
    });
  }

  onSubmit() { 

    let obj = this.loginForm.getRawValue();
    this.store.dispatch(new LoginAction(obj.email, obj.password));
    }
  
}
