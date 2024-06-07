import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';
import { Student } from '../../interfaces/student';
import { Course } from '../../interfaces/course';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  studentsByCourse: Student[] = [];
  students: Student[] = [];
  courses: Course[] = [];

  constructor(
    private studentService: StudentService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    this.loadStudents();

    this.courses.forEach((course) => {
      this.loadStudentsByCourse(course.id);
    });

    for (let course of this.courses) {
      this.loadStudentsByCourse(course.id);
    }
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (data) => (this.courses = data),
    });
  }

  loadStudentsByCourse(courseId: number) {
    this.courseService.getStudentByCourse(courseId).subscribe({
      next: (data) => (this.studentsByCourse.push(...data)),
    });
  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (data) => (this.students = data),
    });
  }
}
