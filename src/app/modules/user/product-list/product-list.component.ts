import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  categoryId!: number;
  subCategoryId!: number;
  category: any;
  subCategories: any[] = [];
  products: any[] = [];
  selectedSubId: number | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private productSvc: ProductService,
    private categorySvc: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.subCategoryId = Number(this.route.snapshot.queryParamMap.get('subcategory'));
    this.loadCategory();
    this.loadSubcategories();

    // if subcategory present in query param, load products for it
    if (this.subCategoryId) {
      this.onSubCategorySelect(this.subCategoryId);
    }
  }

  loadCategory() {
    this.categorySvc.getById(this.categoryId).subscribe({
      next: (data) => (this.category = data),
      error: (err) => console.error('Error loading category:', err)
    });
  }

  loadSubcategories() {
    this.categorySvc.getSubCategories(this.categoryId).subscribe({
      next: (data) => (this.subCategories = data),
      error: (err) => console.error('Error loading subcategories:', err)
    });
  }

  onSubCategorySelect(subId: number) {
    this.selectedSubId = subId;
    this.loading = true;
    this.productSvc.getBySubCategory(subId).subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.loading = false;
      }
    });
  }
}
