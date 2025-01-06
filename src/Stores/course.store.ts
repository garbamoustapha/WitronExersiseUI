import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { Course } from '../Model/AllBaseModel';
import { inject, signal } from '@angular/core';
import { CourseService } from '../Services/course.service';
import { lastValueFrom } from 'rxjs';


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
    async loadAll() :  Promise<void> {
      try 
      {
        let courses = await lastValueFrom(courseServ.getAllCourses());
        patchState(store, (state) => ({ courses }));
      } 
      catch (error : any) 
      {
        console.error(error);
        patchState(store, (state) => ({ courses: state.courses ,error: error.message }));
      }
    },
    async AddCourse(course: Course) : Promise<void> {
      try{
        let crs = await lastValueFrom(courseServ.createCourse(course));
        patchState(store, (state) => ({ courses: [...state.courses, crs] }))
      }
      catch(error : any){
        console.error(error);
        patchState(store, (state) => ({ courses: state.courses ,error: error.message }));
      }      
    },
    async UpdateCourse(course: Course) : Promise<void> {
      try{
        let crs = await lastValueFrom(courseServ.updateCourse(course));
        patchState(store, (state) => ({ courses: state.courses.map(c => c.id === crs.id ? crs : c) }))
      }
      catch(error : any){
        console.error(error);
        patchState(store, (state) => ({ courses: state.courses ,error: error.message }));
      }
    },
    async DeleteCourse(id: string) : Promise<void> {
     try{
      await lastValueFrom(courseServ.deleteCourse(id));
      patchState(store, (state) => ({ courses: state.courses.filter(c => c.id !== id) }))      
     }
     catch(error : any){
      console.error(error);
      patchState(store, (state) => ({ courses: state.courses ,error: error.message }));
    }       
    }
  })),
  withHooks({
    onInit: (store) => {
    }
  })
)
