import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from './student';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  url = 'http://localhost:3000/students';

  constructor(private http:HttpClient) { }

  getStudents(): Observable<Student[]>{
      return this.http.get<Student[]>(this.url);
  }

  save(student: Student): Observable<Student>{
     return this.http.post<Student>(this.url, student);
  }

  delete(student: Student) : Observable<void>{
      return this.http.delete<void>(`${this.url}/${student.id}`);
  }

  update(student: Student) : Observable<Student>{
      return this.http.put<Student>(`${this.url}/${student.id}`,student);
  }
}
