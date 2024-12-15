import {ChangeDetectionStrategy, Component, inject, model, signal} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-create-course-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
   // MatDialogClose,
  ],
  template: `<h2 mat-dialog-title>Create new course</h2>
  <mat-dialog-content>
    <mat-form-field>
      <mat-label>Title</mat-label>
      <input matInput />
    </mat-form-field>
    <mat-form-field>
      <mat-label>Description</mat-label>
      <textarea matInput > </textarea>
    </mat-form-field>
    <mat-form-field>
      <mat-label>Instructor name</mat-label>
      <input matInput />
    </mat-form-field>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button (click)="CloseDialog()" >Close</button>
    <button mat-button  cdkFocusInitial>Create</button>
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCourseDialogComponent {
  
  readonly dialogRef = inject(MatDialogRef<CreateCourseDialogComponent>);

  CloseDialog()
  {
    this.dialogRef.close();
  }
}