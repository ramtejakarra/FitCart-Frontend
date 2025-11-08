import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'https://localhost:7055/api/Category'; // 👈 backend endpoint

  constructor(private http: HttpClient) {}

  // ✅ Fetch all categories
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // ✅ Get category by ID
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // ✅ Get all subcategories under a category
  getSubCategories(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${categoryId}/subcategories`);
  }

}
