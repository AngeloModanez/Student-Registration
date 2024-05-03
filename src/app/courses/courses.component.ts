import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CourseService as CourseService } from '../course.service';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  courseFormGroup: FormGroup;
  isEditing: boolean = false;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
  ) {
    this.courseFormGroup = formBuilder.group({
      id: [''],
      name: [''],
    });
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (data) => (this.courses = data),
    });
  }

  ngOnInit(): void {
    this.loadCourses();
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
}
