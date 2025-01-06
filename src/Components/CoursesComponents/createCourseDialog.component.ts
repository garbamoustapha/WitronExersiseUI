import {ChangeDetectionStrategy, Component, inject, model, signal, Signal} from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Course } from '../../Model/AllBaseModel';
import { CategoryStore } from '../../Stores/Category.store';
import { courseStore } from '../../Stores/course.store';
import { SnackBarUtility } from '../../Utility/snackBar.utility';
import { Title } from '@angular/platform-browser';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-create-course-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatSelectModule
    ],
  template: `<h2 mat-dialog-title>{{data ? "Edit Course" : "Create Course"}}</h2>
  <mat-dialog-content>
    <mat-form-field>
      <mat-label>Title</mat-label>
      <input matInput [(ngModel)]= "courseModel().title" name="title" required/>
    </mat-form-field>
    <mat-form-field>
      <mat-label>Description</mat-label>
      <textarea matInput  [(ngModel)]= "courseModel().description" name="description" required> </textarea>
    </mat-form-field>
    <mat-form-field>
      <mat-label>Instructor name</mat-label>
      <input matInput  [(ngModel)]= "courseModel().instructorName" name="instructorName" required />
    </mat-form-field>
    <mat-form-field>
      <mat-label>Category</mat-label>
      <mat-select  [(ngModel)]= "courseModel().categoryId" name="categoryId" required>
        @for ( cat of categoryStore.categories(); track cat.id) {
          <mat-option value="{{cat.id}}">{{cat.name}}</mat-option>
        }    
      </mat-select>
    </mat-form-field>
  </mat-dialog-content>
  
  <mat-dialog-actions>
    <button mat-button (click)="CloseDialog()" >Close</button>
    <button mat-button  cdkFocusInitial (click)="createOrEditCourse()">{{data ? "Update" : "Create"}}</button>
  </mat-dialog-actions>`,
  styles: [`
    h2{
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
    mat-dialog-content{
      display:flex;
      flex-direction: column;
      gap: 20px;
      width: 500px;
    }
    mat-form-field {
      background-color: #fff;
    }
    `],
})
export class CreateCourseDialogComponent {
  
  readonly dialogRef = inject(MatDialogRef<CreateCourseDialogComponent>);
  readonly categoryStore = inject(CategoryStore);
  readonly courseStore = inject(courseStore);
  readonly data = inject<Course>(MAT_DIALOG_DATA);
  snakbar = inject(SnackBarUtility);

  initCourse : Course = {
    id: null,
    title: "",
    description: "",
    createdDate: new Date(),
    instructorName: "",
    categoryId: "",
    category: null
  }


  courseModel = model(this.data ? {...this.data} : this.initCourse);

  
  ngOnInit(): void {

    this.categoryStore.loadAll();
  }

  createOrEditCourse() {
    if(this.courseModel().id){
      this.updateCourse();
    }
    else{
      this.createCourse();
    }
  }

  createCourse() { 
    this.courseStore.AddCourse(this.courseModel()).then(() =>{
      this.snakbar.openSnackBar("Course created", "Close");
      this.CloseDialog()
    }).catch(() => {
      this.snakbar.openSnackBar("Course can't be created", "Close");
    }); 
  }

  updateCourse() {
    this.courseStore.UpdateCourse(this.courseModel()).then(() =>{
      this.snakbar.openSnackBar("Course updated", "Close");   
      this.CloseDialog();
    }).catch(() =>{
      this.snakbar.openSnackBar("Course can't be updated", "Close");
    });
   
  }

  CloseDialog()
  {
    this.dialogRef.close();
  }
}