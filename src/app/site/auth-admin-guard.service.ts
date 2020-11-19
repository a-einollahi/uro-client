import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';
import { RouterService } from './../shared/services/router.service';

import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: RouterService) {}
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let access: boolean;
    this.auth.authState.subscribe((data: User) => {
      access = data.id && ['super_admin', 'admin'].includes(data.role) ? true : false;
    });

    if (!access) {
      this.router.navigate('/login')
    }
    return access;
  }
  
}
