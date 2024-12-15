import { Routes } from '@angular/router';
import { CourseComponent } from '../Components/courseComponent';
import { CategoriesComponent } from '../Components/CategoriesComponents/CategoriesComponent';

export const routes: Routes = [
  {path: '', component: CourseComponent},
  {path: 'Courses', component: CourseComponent},
  {path: 'Categories', component: CategoriesComponent},
];
