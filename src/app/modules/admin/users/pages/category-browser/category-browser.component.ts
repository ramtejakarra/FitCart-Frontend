import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../../services/category.service';
import { ProductService } from '../../../../../services/product.service';

@Component({
  selector: 'app-category-browser',
  templateUrl: './category-browser.component.html',
  styleUrls: ['./category-browser.component.scss']
})
export class CategoryBrowserComponent implements OnInit {
  categories: any[] = [];
  subCategories: any[] = [];
  products: any[] = [];

  selectedCategory: any = null;
  selectedSubCategory: any = null;
  loading = false;

  constructor(
    private categorySvc: CategoryService,
    private productSvc: ProductService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categorySvc.getAll().subscribe(data => this.categories = data);
  }

  selectCategory(category: any) {
    this.selectedCategory = category;
    this.selectedSubCategory = null;
    this.products = [];
    this.categorySvc.getSubCategories(category.id).subscribe(data => this.subCategories = data);
  }

  selectSubCategory(sub: any) {
    this.selectedSubCategory = sub;
    this.loading = true;
    this.productSvc.getBySubCategory(sub.id).subscribe({
      next: data => {
        this.products = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
