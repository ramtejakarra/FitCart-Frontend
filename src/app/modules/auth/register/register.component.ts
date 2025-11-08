import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

 onRegister(): void {
  if (this.registerForm.invalid) return;

  const payload = {
    fullName: this.registerForm.value.fullName,
    email: this.registerForm.value.email,
    password: this.registerForm.value.password, // ✅ CORRECT FIELD NAME
    role: 'User'
  };

  this.authService.register(payload).subscribe({
    next: () => {
      this.snackBar.open('Registration successful ✅', 'Close', { duration: 2000 });
      this.router.navigate(['/auth/login']);
    },
    error: (err) => {
      console.error(err);
      this.snackBar.open('Registration failed ❌', 'Close', { duration: 2000 });
    }
  });
}

}
