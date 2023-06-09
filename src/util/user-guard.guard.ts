import { inject } from "@angular/core";
import { ActivatedRoute, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "src/services/auth/auth.service";
import jwtDecode, * as jwt_decode from 'jwt-decode';
import { state } from "@angular/animations";
import { Store } from "@ngxs/store";
import { LoginState } from "src/store/states/login.state";
export const permissionGuard = () => {

  const state = inject(Store)
    const router = inject(Router); 
      if (!state.selectSnapshot(LoginState.isLogged)) {
        router.navigate(['/login'], { state: { returnUrl: router.url } });
        return false;
      } else {
        return true;
      }
    
  };


  export const adminGuard = () => {
    const state = inject(Store)
    const router = inject(Router);

      if (!state.selectSnapshot(LoginState.isLogged)) {


          router.navigate(['/login'], { state: { returnUrl: router.url } });
          return false;
        

      } else {
        const token = localStorage.getItem('token');
        let decodedToken = jwtDecode(token!) as any;
        const roles = decodedToken.roles;
        if(roles.includes("ROLE_ADMIN")){
          return true;
        }
        else{
          router.navigate(['/login'], { state: { returnUrl: router.url } });
          return false;
        }

      }

  }

  export const managerGuard = () => {
    const state = inject(Store)
    const router = inject(Router);
      if (!state.selectSnapshot(LoginState.isLogged)) {


          router.navigate(['/login'], { state: { returnUrl: router.url } });
          return false;
        

      } else {
        const token = localStorage.getItem('token');
        let decodedToken = jwtDecode(token!) as any;
        const roles = decodedToken.roles;
        if(roles.includes("ROLE_ADMIN") || roles.includes("ROLE_ENCARGADO")){
          return true;
        }
        else{
          router.navigate(['/login'], { state: { returnUrl: router.url } });
          return false;
        }

      }
  }