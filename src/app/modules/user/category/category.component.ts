import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryId!: number;
  subcategories: any[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categorySvc: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadSubcategories();
  }

  loadSubcategories(): void {
    this.loading = true;
    this.categorySvc.getSubCategories(this.categoryId).subscribe({
      next: (data) => {
        this.subcategories = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load subcategories', err);
        this.loading = false;
      }
    });
  }

  goToProducts(subId: number): void {
    this.router.navigate(['/user/category', this.categoryId, 'products'], {
      queryParams: { subcategory: subId }
    });
  }
}
