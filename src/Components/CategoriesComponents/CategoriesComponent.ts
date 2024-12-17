import { Component, computed, inject, signal } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import {MatButtonModule} from '@angular/material/button';
import { CategoryStore } from "../../Stores/Category.store";

//Dialog import
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

import { CreatCategoryDialogComponent } from './CreatCategoryDialogComponent';

ModuleRegistry.registerModules([AllCommunityModule]);


@Component({
  standalone: true,
  selector: 'app-categories',
  imports: [
    AgGridAngular, 
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <div>
      <h1>All categories</h1>
      <ag-grid-angular
        style="width: 100%; height: 500px;"
        [rowData]="categoryStrore.categories()"
        [columnDefs]="colDefs"
        [pagination]="true"
        [paginationPageSize]="10"
        [paginationPageSizeSelector]="[10, 20]"
        [defaultColDef]="defaultColDef"
        rowSelection="multiple" />
        <button mat-raised-buttom (click)="OpenAddCourseDialog()" class="mat-button"  mat-flat-button>New category</button>        
  `,
  styles: [
    `
      h1{
        margin: 20px;
      }
      .mat-button{
        position: absolute;
        bottom:0;right:0;
        margin: 20px;
      }
    `
  ]
})
export class CategoriesComponent {
 
  defaultColDef : ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    editable:true
  }
  // Row Data: The data to be displayed.
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
      { 
        field: "Number" ,
        valueGetter : (params) => params.node?.rowIndex != null ? params.node.rowIndex + 1 : "null",
        checkboxSelection: true,             
      },
      { field: "name" },
      { field: "description" , flex: 2},
      { field: "createdDate"},
  ];

  readonly dialog = inject(MatDialog);
  categoryStrore = inject(CategoryStore);

  ngOnInit() {
    this.categoryStrore.loadAll();
  }

  OpenAddCourseDialog()
  {
    this.dialog.open(CreatCategoryDialogComponent);
  }
}