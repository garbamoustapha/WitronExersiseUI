import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../Model/AllBaseModel";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private apiUrl: string = "https://localhost:7030/api/Category";

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}`)
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/categories/${id}`)
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/categories`, category)
  }

  updateCategory(id: string, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/categories/${id}`, category)
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<any>(`${this.apiUrl}/categories/${id}`)
  }
}