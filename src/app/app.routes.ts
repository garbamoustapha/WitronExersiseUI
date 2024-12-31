import { Routes } from '@angular/router';
import { CourseComponent } from '../Components/CoursesComponents/course.component';
import { CategoriesComponent } from '../Components/CategoriesComponents/categories.component';

export const routes: Routes = [
  {path: '', component: CourseComponent},
  {path: 'Courses', component: CourseComponent},
  {path: 'Categories', component: CategoriesComponent},
];
