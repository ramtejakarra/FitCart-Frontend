import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
canActivate(): boolean {
  const token = this.auth.getToken();
  const role = this.auth.getUserRole();

  console.log('%c🔹 [AdminGuard Triggered]', 'color: #4CAF50');
  console.log('Token:', token ? '✅ Exists' : '❌ Missing');
  console.log('Decoded Role:', role);

  if (token && role === 'Admin') {
    console.log('%c✅ Access granted to Admin route', 'color: #00C853');
    return true;
  }

  if (token && role === 'User') {
    console.warn('⚠️ Logged in user is not Admin → redirecting to /user/home');
    this.router.navigate(['/user/home']);
    return false;
  }

  console.error('🚫 No token or invalid role → redirecting to /auth/login');
  this.router.navigate(['/auth/login']);
  return false;
}


}
