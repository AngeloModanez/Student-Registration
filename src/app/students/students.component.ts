import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  studentFormGroup: FormGroup;
  isEditing: boolean = false;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: StudentService
  ) {
    this.studentFormGroup = formBuilder.group({
      id: [''],
      name: ['', [Validators.minLength(3), Validators.required]],
      course: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.service.getStudents().subscribe({
      next: (data) => (this.students = data),
    });
  }

  save() {
    this.submitted = true;

    if (this.studentFormGroup.valid) {
      if (this.isEditing) {
        this.service.update(this.studentFormGroup.value).subscribe({
          next: () => {
            this.loadStudents();
            this.isEditing = false;
            this.studentFormGroup.reset();
            this.submitted = false;
          },
        });
      } else {
        this.service.save(this.studentFormGroup.value).subscribe({
          next: (data) => {
            this.students.push(data);
            this.studentFormGroup.reset();
            this.submitted = false;
          },
        });
      }
    }
  }

  delete(student: Student) {
    this.service.delete(student).subscribe({
      next: () => this.loadStudents(),
    });
  }

  update(student: Student) {
    this.isEditing = true;
    this.studentFormGroup.setValue(student);
  }

  get name(): any {
    return this.studentFormGroup.get('name');
  }

  get course(): any {
    return this.studentFormGroup.get('course');
  }
}
