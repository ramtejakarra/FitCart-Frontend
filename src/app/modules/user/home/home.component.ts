import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: any[] = [];

  constructor(private categorySvc: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categorySvc.getAll().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Failed to load categories', err)
    });
  }

  goToCategory(id: number) {
    this.router.navigate(['/user/category', id]);
  }
}
