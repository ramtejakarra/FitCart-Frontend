import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent {
  constructor(private router: Router, private auth: AuthService) {}

  navigateToHome(): void {
    this.router.navigate(['/user/home']);
  }

  logout(): void {
    this.auth.logout();
  }
}

