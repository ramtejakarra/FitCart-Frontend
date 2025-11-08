import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.auth.getToken();
    const role = this.auth.getUserRole();

    console.log('%c[AuthGuard Triggered]', 'color: #2196F3');
    console.log('Token:', token ? '✅ Exists' : '❌ Missing');
    console.log('Role:', role);

    if (token && (role === 'User' || role === 'Admin')) {
      console.log('%c✅ Access granted for logged-in user', 'color: #00C853');
      return true;
    }

    console.error('🚫 Not logged in → redirecting to /auth/login');
    this.router.navigate(['/auth/login']);
    return false;
  }
}
