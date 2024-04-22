import { Component, OnInit } from '@angular/core';
import { Courses } from '../courses';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from '../course.service';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit {
  courses: Courses[] = [];
  courseFormGroup: FormGroup;
  isEditing: boolean = false;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: CoursesService
  ) {
    this.courseFormGroup = formBuilder.group({
      id: [''],
      curso: [''],
    });
  }

  loadCourses() {
    this.service.getCourses().subscribe({
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
        this.service.update(this.courseFormGroup.value).subscribe({
          next: () => {
            this.loadCourses();
            this.courseFormGroup.reset();
            this.isEditing = false;
            this.submitted = false;
          },
        });
      } else {
        this.service.save(this.courseFormGroup.value).subscribe({
          next: (data) => {
            this.courses.push(data);
            this.courseFormGroup.reset();
            this.submitted = false;
          },
        });
      }
    }
  }

  delete(course: Courses) {
    this.service.delete(course).subscribe({
      next: () => this.loadCourses(),
    });
  }

  update(course: Courses) {
    this.isEditing = true;
    this.courseFormGroup.setValue(course);
  }
}
