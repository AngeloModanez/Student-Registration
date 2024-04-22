import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Courses } from './courses';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  url = 'http://localhost:3000/course';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Courses[]> {
    return this.http.get<Courses[]>(this.url);
  }

  save(course: Courses): Observable<Courses> {
    return this.http.post<Courses>(this.url, course);
  }

  delete(course: Courses): Observable<void> {
    return this.http.delete<void>(`${this.url}/${course.id}`);
  }

  update(course: Courses): Observable<Courses> {
    return this.http.put<Courses>(`${this.url}/${course.id}`, course);
  }
}
