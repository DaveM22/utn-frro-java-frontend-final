import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, createUrlTreeFromSnapshot } from "@angular/router";
import { map } from "rxjs";
import { AuthService } from "src/services/auth/auth.service";

export const authGuard = (next: ActivatedRouteSnapshot) => {

};