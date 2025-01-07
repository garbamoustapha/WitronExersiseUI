import {ChangeDetectionStrategy, Component, inject, model} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { Category } from '../../Model/AllBaseModel';
import { CategoryStore } from '../../Stores/Category.store';
import { SnackBarUtility } from '../../Utility/snackBar.utility';

@Component({
  standalone : true,
  changeDetection : ChangeDetectionStrategy.OnPush,
  selector: 'app-creat-category-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  template: `<h2 mat-dialog-title>{{data ? "Edit Category" : "Create Category"}}</h2>
  <mat-dialog-content>
    <mat-form-field style="padding-top:10px;">
      <mat-label>Name</mat-label>
      <input matInput [(ngModel)] = "categoryModel().name" name="name" required/>
    </mat-form-field>
    <mat-form-field>
      <mat-label>Description</mat-label>
      <textarea matInput [(ngModel)] = "categoryModel().description" required> </textarea>
    </mat-form-field>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button (click)="CloseDialog()" >Close</button>
    <button mat-button [disabled]="!isFormValid()" (click)="createOrEditCategory()">{{data ? "Edit" : "Create"}}</button>
  </mat-dialog-actions>`,
  styles: [`
    h2{
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
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
    `]
})
export class CreatCategoryDialogComponent {

  readonly dialogRef = inject(MatDialogRef);
  readonly categoryStore = inject(CategoryStore);
  snakbar = inject(SnackBarUtility);
  data = inject<Category>(MAT_DIALOG_DATA);  
  initCat : Category = {
    id: "",
    name: "",
    description: "",
    createdDate: new Date(),
  }

  categoryModel = model(this.data ? {...this.data} : this.initCat);

  isFormValid(): boolean {
    return !!this.categoryModel().name && !!this.categoryModel().description;
  } 
  CloseDialog()
  {
    this.dialogRef.close();
  }

  createOrEditCategory() : void {
    if(this.data)
      this.updateCategory();
    else
      this.newCategory();
  }
   newCategory()
  {
    this.categoryModel().createdDate = new Date();
    this.categoryModel().id = null;

    this.categoryStore.addCategory(this.categoryModel())
    .then((r : boolean) => {
      this.CloseDialog();
      this.snakbar.openSnackBar("Category created", "Close");
    })
    .catch((error) => {
      console.error("Erreur :", error);
      this.snakbar.openSnackBar("Category can't be created", "Close");
    })     
  }

  updateCategory()
  {
    this.categoryStore.updateCategory(this.categoryModel()).then(() => {
      this.CloseDialog();
       this.snakbar.openSnackBar("Catery updated", "Close");
    }).catch((error) => {
      console.error("Erreur :", error);
      this.snakbar.openSnackBar("Category can't be updated", "Close");
    });
  }

}