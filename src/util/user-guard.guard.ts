import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot, createUrlTreeFromSnapshot } from "@angular/router";
import { map } from "rxjs";
import { AuthService } from "src/services/auth/auth.service";

export const permissionGuard = () => {
    const router = inject(Router);
    const service = inject(AuthService)
    return !service.isLoggedIn() ? router.navigate(['/login']) : true
}