import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    @Inject('auth') private auth,
    public router: Router
  ) { }

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/problems']);
      return false;
    }
  }

  isAdmin(): boolean {
    // if (this.auth.isAuthenticated() && this.auth.getProfile().roles.includes('Admin')) {
    //   return true;
    // } else {
    //   return false;
    // }
    return true;
  }
}
