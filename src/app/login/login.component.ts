import { Component, OnDestroy } from '@angular/core';
import { Validators,FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import jwtDecode from 'jwt-decode';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Credentials } from 'src/models/models';
import { AuthService } from 'src/services/auth/auth.service';
import { LoginAction } from 'src/store/actions/login.action';
import { LoginState } from 'src/store/states/login.state';
import MapErrors from '../util/errorFormReactive';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  @Select(LoginState.isLogged) isLogged!:Observable<boolean>;
  @Select(LoginState.Errors) errors$!:Observable<object>;
  loginForm = this.fb.group({
    email:['', Validators.required],
    password:['',Validators.required]
  });
  returnUrl!:any;
  creds: Credentials = {
    email: '',
    password: ''
  }
  errors:any;

  constructor(private store:Store, private router:Router, private fb:FormBuilder ){}


  ngOnInit() {

    if(this.store.selectSnapshot(LoginState.isLogged)){
      this.router.navigateByUrl("/")
    }
    this.returnUrl = history.state.returnUrl || '/';


    this.errors$.subscribe(x => {
      this.errors = x;
      MapErrors(this.loginForm, this.errors);
     
    })

  }

  onSubmit() { 

    let obj = this.loginForm.getRawValue();
    try{
      this.store.dispatch(new LoginAction(obj.email!, obj.password!))
    }
    catch(e){
      console.log(e)
    }

  }  
  
}
