import { inject } from "@angular/core";
import { ActivatedRoute, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "src/services/auth/auth.service";
import jwtDecode, * as jwt_decode from 'jwt-decode';
import { state } from "@angular/animations";
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
    const router = inject(Router);
    const service = inject(AuthService);
      if (!service.isLoggedIn()) {


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