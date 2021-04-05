import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class ActivateGuard implements CanActivate {
  constructor(
    private router: Router, private authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.authService.loggedInUser) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

