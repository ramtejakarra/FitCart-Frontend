import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiUrl}/User`;

  constructor(private http: HttpClient, private router: Router) {}

  register(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, payload);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  setToken(token: string): void {
    localStorage.setItem('fitcart_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('fitcart_token');
  }

  logout(): void {
    localStorage.removeItem('fitcart_token');
    this.router.navigate(['/auth/login']);
  }

  getUserRole(): string | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    // Extract role from any possible claim key
    const roleKeys = [
      'role',
      'Role',
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    ];

    for (const key of roleKeys) {
      if (payload[key]) {
        return payload[key];
      }
    }

    return null;
  } catch (err) {
    console.error('Error decoding JWT:', err);
    return null;
  }
}

}
