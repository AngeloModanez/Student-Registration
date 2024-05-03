import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from './course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  url = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url);
  }

  save(course: Course): Observable<Course> {
    return this.http.post<Course>(this.url, course);
  }

  delete(course: Course): Observable<void> {
    return this.http.delete<void>(`${this.url}/${course.id}`);
  }

  update(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.url}/${course.id}`, course);
  }
}
