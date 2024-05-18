import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { Course } from '../course';
import { Period } from '../period';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  students: Student[] = [];
  periods = Object.values(Period);

  courseFormGroup: FormGroup;
  isEditing: boolean = false;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService
  ) {
    this.courseFormGroup = formBuilder.group({
      id: [''],
      name: ['', [Validators.minLength(3), Validators.required]],
      workload: ['', [Validators.required]],
      image: [''],
      active: [false],
    });
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (data) => (this.courses = data),
    });
  }

  save() {
    this.submitted = true;

    if (this.courseFormGroup.valid) {
      if (this.isEditing) {
        this.courseService.update(this.courseFormGroup.value).subscribe({
          next: () => {
            this.loadCourses();
            this.courseFormGroup.reset();
            this.isEditing = false;
            this.submitted = false;
          },
        });
      } else {
        this.courseService.save(this.courseFormGroup.value).subscribe({
          next: (data) => {
            this.courses.push(data);
            this.courseFormGroup.reset();
            this.submitted = false;
          },
        });
      }
    }
  }

  delete(course: Course) {
    this.courseService.delete(course).subscribe({
      next: () => this.loadCourses(),
    });
  }

  update(course: Course) {
    this.isEditing = true;
    this.courseFormGroup.setValue(course);
  }

  getCourseName(courseId: number): Course | undefined {
    return this.courses.find((c) => c.id === courseId);
  }

  get name(): any {
    return this.courseFormGroup.get('name');
  }
}
