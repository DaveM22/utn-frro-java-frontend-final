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
        roles:'',
        errors:{}
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
    static Errors(state: LoginStateModel){
        return state.errors;
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
                ctx.patchState({
                    isLogged:true,
                    roles: decodedToken.roles,
                    errors:[]
                })
                this.router.navigate([history.state.returnUrl || '/']);
                ctx.dispatch(new Success("Login", "Login existoso, bienvenido/a"));

            }),
            catchError(errors => {
                if(errors.status === 422){
                    ctx.patchState({errors:errors.error})
                    return of();
                }
                else{
                    return of(ctx.dispatch(new ErrorApi("Error al procesar login", errors.error.errorMessage)))
                }


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
                ctx.patchState({
                    isLogged:false,
                    roles: ''
                })
            }
            else{
                ctx.patchState({
                    isLogged:true,
                    roles: decodedToken.roles
                })
            }
        }
        else{
            ctx.patchState({
                isLogged:false,
                roles: ''
            })
        }
    }

    @Action(LogoutAction)
    logout(ctx:StateContext<LoginStateModel>, action:LogoutAction){
        localStorage.removeItem("token");
        ctx.patchState({
            isLogged:false,
            roles: ''
        })
    }
}