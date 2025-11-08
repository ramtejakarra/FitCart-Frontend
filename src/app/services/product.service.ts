import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private base = `${environment.apiUrl}/Product`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.base);
  }

  getByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/category/${categoryId}`);
  }

  getBySubCategory(subCategoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/subcategory/${subCategoryId}`);
  }

  addProduct(data: any): Observable<any> {
    return this.http.post<any>(this.base, data);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.base}/${id}`);
  }
}
