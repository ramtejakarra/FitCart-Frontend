import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (res: any) => {
        if (res.token) {
          this.authService.setToken(res.token);

          const decoded = this.decodeJwt(res.token);
          const role = decoded?.role;

          if (role === 'Admin') {
            this.snackBar.open('Welcome Admin 🏋️‍♂️', 'Close', { duration: 2000 });
            setTimeout(() => this.router.navigate(['/admin/dashboard']), 500);
          } 
          else if (role === 'User') {
            this.snackBar.open('Welcome User 🛍️', 'Close', { duration: 2000 });
            setTimeout(() => this.router.navigate(['/user/home']), 500); // ✅ Correct path
          } 
          else {
            this.snackBar.open('Unknown role ❌', 'Close', { duration: 2000 });
          }
        } else {
          this.snackBar.open('Invalid login response ❌', 'Close', { duration: 2000 });
        }
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.snackBar.open('Invalid credentials ❌', 'Close', { duration: 2000 });
        this.loading = false;
      }
    });
  }

  private decodeJwt(token: string): any {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      const role =
        decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
        decoded['role'] ||
        decoded['Role'];
      return { ...decoded, role };
    } catch {
      return null;
    }
  }
}
