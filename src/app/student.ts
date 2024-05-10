import { Course } from "./course";

export interface Student {
  id: number;
  name: string;
  course: Course;
  period: string;
  active: boolean;
}
