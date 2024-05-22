import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { CourseService } from '../course.service';
import { Student } from '../student';
import { Course } from '../course';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  students: Student[] = [];
  courses: Course[] = [];

  homeFormGroup: FormGroup;
  isEditing: boolean = false;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private courseService: CourseService
  ) {
    this.homeFormGroup = formBuilder.group({
      courseId: [],
      studentId: [''],
    })
  }

  ngOnInit(): void {
    this.loadCourses();
    this.loadStudents();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (data) => (this.courses = data),
    });
  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (data) => (this.students = data),
    });
  }

  getCourse(courseId: number): Course | undefined {
    return this.courses.find((c) => c.id === courseId);
  }

  getStudent(studentId: number): Student | undefined {
    return this.students.find((s) => s.id === studentId);
  }

  getCourseName(courseId: number): Course | undefined {
    return this.courses.find(c => c.id === courseId);
  }

  get course(): any {
    return this.homeFormGroup.get('courseId');
  }

  get student(): any {
    return this.homeFormGroup.get('studentId');
  }
}
