import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { LoginStateModel } from "../model/login.modelstate";
import { IsLoginAction, LoginAction, LogoutAction } from "../actions/login.action";
import { AuthService } from "src/services/auth/auth.service";
import { catchError, of, tap } from "rxjs";
import jwtDecode from "jwt-decode";
import { Router } from "@angular/router";
import { ErrorApi, Success } from "../actions/util.actions";
import { JwtHelperService } from "@auth0/angular-jwt";

@State<LoginStateModel>({
    name: "login",
    defaults: {
        isLogged:false,
        roles:''
    },
})
@Injectable()
export class LoginState {


    constructor(private loginService:AuthService, private router:Router, private jwtService: JwtHelperService){}
    @Selector()
    static isLogged(state: LoginStateModel) {
      return state.isLogged;
    }

    @Selector()
    static getRoles(state: LoginStateModel) {
      return state.roles;
    }

    @Action(LoginAction)
    login(ctx: StateContext<LoginStateModel>, action:LoginAction){
        localStorage.removeItem("token");
        let obj = {email:action.userName, password:action.password}
        return this.loginService.login(obj).pipe(
            tap((res:any) => {
                localStorage.setItem("token", res.token);
                let decodedToken = jwtDecode(res.token) as any;
                ctx.setState({
                    isLogged:true,
                    roles: decodedToken.roles
                })
                this.router.navigate([history.state.returnUrl || '/']);
                ctx.dispatch(new Success("Login", "Login existoso, bienvenido/a"));

            }),
            catchError(error => {
                return of(ctx.dispatch(new ErrorApi("Ingresar al sistema", error.error.errorMessage)));
            })
        );
    }

    @Action(IsLoginAction)
    isLogin(ctx:StateContext<LoginStateModel>, action:IsLoginAction){
        if(localStorage.getItem("token")){
            let token = localStorage.getItem("token")
            let decodedToken = jwtDecode(token!) as any;
            if(this.jwtService.isTokenExpired(token)){
                localStorage.removeItem("token");
                ctx.setState({
                    isLogged:false,
                    roles: ''
                })
            }
            else{
                ctx.setState({
                    isLogged:true,
                    roles: decodedToken.roles
                })
            }
        }
        else{
            ctx.setState({
                isLogged:false,
                roles: ''
            })
        }
    }

    @Action(LogoutAction)
    logout(ctx:StateContext<LoginStateModel>, action:LogoutAction){
        localStorage.removeItem("token");
        ctx.setState({
            isLogged:false,
            roles: ''
        })
    }
}