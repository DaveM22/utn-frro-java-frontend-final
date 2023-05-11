import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot, createUrlTreeFromSnapshot } from "@angular/router";
import { map } from "rxjs";
import { AuthService } from "src/services/auth/auth.service";
import jwtDecode, * as jwt_decode from 'jwt-decode';
export const permissionGuard = () => {
    const router = inject(Router);
    const service = inject(AuthService);
  
   
      if (!service.isLoggedIn()) {
        router.navigate(['/login'], { state: { returnUrl: router.url } });
        return false;
      } else {
        return true;
      }
    
  };


  export const adminGuard = () => {

    const router = inject(Router);
    const service = inject(AuthService);
      if (!service.isLoggedIn()) {


          router.navigate(['/login'], { state: { returnUrl: router.url } });
          return false;
        

      } else {
        const token = localStorage.getItem('token');
        let decodedToken = jwtDecode(token!) as any;
        const roles = decodedToken.roles;
        if(roles.includes("ADMIN")){
          return true;
        }
        else{
          router.navigate(['/login'], { state: { returnUrl: router.url } });
          return false;
        }

      }

  }