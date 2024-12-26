import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../Model/AllBaseModel";

@Injectable({
    providedIn: 'root'
})
export class CourseService {
  
  private  apiUrl : string = 'https://localhost:7030/api/Course';
  #http: HttpClient = inject(HttpClient);

  getAllCourses() : Observable<Course[]> {
    return this.#http.get<Course[]>(`${this.apiUrl}`)
  }

  getCourseById(id: string): Observable<Course> {
    return this.#http.get<Course>(`${this.apiUrl}/courses/${id}`);
  }

  createCourse(course: Course): Observable<Course> {
    return this.#http.post<Course>(`${this.apiUrl}`, course);
  }

  updateCourse(course: Course): Observable<Course> {
    return this.#http.put<Course>(`${this.apiUrl}/courses/${course.id}`, course);
  }

  deleteCourse(id: string): Observable<void> {
    return this.#http.delete<void>(`${this.apiUrl}/courses/${id}`);
  }

}