import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { Course } from '../Model/AllBaseModel';
import { inject, signal } from '@angular/core';
import { CourseService } from '../Services/course.service';


export type CourseState = {
  courses: Course[];
  isLoading: boolean;
  error: string | null;
};

const initialState: CourseState = {
  courses :  [],
  isLoading: false,
  error: null,
};

export const courseStore = signalStore(
  {providedIn:'root'},
  withState(initialState),
  withMethods ((store, courseServ: CourseService = inject(CourseService)) => (
    {
      loadAll() : void {
      courseServ.getAllCourses().subscribe({
        next: (courses) => {
          console.log(courses);
          patchState(store, { courses });
        },
        error: (error) => {
          console.error(error);
          error = error.message;
        }
      });
      },
      AddCourse(course: Course) : void {
        courseServ.createCourse(course).subscribe({
          next: (crs) => {
            patchState(store, (state) => ({ courses: [...state.courses, crs] }))
          },
          error: (error) => {
            console.error(error);
            error = error.message;
          }
        });
      }
       
    }
  )),
  withHooks({
    onInit: (store) => {
    }
  })
)
