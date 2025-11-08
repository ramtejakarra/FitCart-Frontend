import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Store } from '@ngrx/store';
import { selectCartCount } from '../cart/cart.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent {
  cartCount$: Observable<number> = this.store.select(selectCartCount);

  constructor(private router: Router, private auth: AuthService, private store: Store) {}

  navigateToHome(): void {
    this.router.navigate(['/user/home']);
  }

  logout(): void {
    this.auth.logout();
  }
}
