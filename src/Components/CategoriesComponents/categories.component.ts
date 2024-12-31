import { Component, computed, inject, signal, ChangeDetectionStrategy } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import type {ColDef } from 'ag-grid-community';
import { 
  AllCommunityModule, 
  ModuleRegistry ,
  GetRowIdParams,
  GetRowIdFunc,
} from 'ag-grid-community'; 
import {MatButtonModule, } from '@angular/material/button';
import { CategoryStore } from "../../Stores/Category.store";

//Dialog import
import {
  MatDialog,
 
} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

import { CreatCategoryDialogComponent } from './createCategoryDialog.component';
import { Category } from "../../Model/AllBaseModel";

import {SnackBarUtility} from '../../Utility/snackBar.utility';

ModuleRegistry.registerModules([AllCommunityModule]);


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'app-categories',
  imports: [
    AgGridAngular, 
    MatButtonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div>
      <div class="header">
      <h1>All categories</h1>
        <button mat-fab class="delete-button" [disabled]="!hasSelectedRows" (click)="deleteCourses()" >
          <mat-icon>delete</mat-icon>
        </button>
      </div>
      <ag-grid-angular
        style="width: 100%; height: 500px;"
        [rowData]="categoryStrore.categories()"
        [columnDefs]="colDefs"
        [pagination]="true"
        [paginationPageSize]="10"
        [paginationPageSizeSelector]="[10, 20]"
        [defaultColDef]="defaultColDef"
        [getRowId]="getRowId"
        [readOnlyEdit]="true"
        rowSelection="multiple"
        (gridReady)="onGridReady($event)"
        (selectionChanged)="onSelectionChanged($event)"
        (cellEditRequest)="OnUpdateCategory($event)"/>
      <button class="mat-button" mat-raised-buttom (click)="OpenAddCourseDialog()"  mat-flat-button>New category</button>
    </div>        
  `,
  styles: [
    `
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
        field: "Id" ,
        valueGetter : (params) => params.data.id,
        checkboxSelection: true,             
      },
      { field: "name" },
      { field: "description" , flex: 2},
      { 
        field: "createdDate",
        valueFormatter: (params) => params.value ? new Date(params.value).toLocaleDateString() : "",
        editable: false
      },
  ];

  public getRowId : GetRowIdFunc = (params: GetRowIdParams<Category>) =>
    params.data.id ?? "";

  hasSelectedRows = false;
  gridApi: any;

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  readonly dialog = inject(MatDialog);
  categoryStrore = inject(CategoryStore);

  private snackBar = inject(SnackBarUtility);

 
  ngOnInit() {
    this.categoryStrore.loadAll();
  }

  OpenAddCourseDialog()
  {
    this.dialog.open(CreatCategoryDialogComponent);
  }

  onSelectionChanged(event: any) {
    this.hasSelectedRows = event.api.getSelectedRows().length > 0;
  }

  OnUpdateCategory(event: any) { 
    const category = {...event.data, [event.colDef.field]: event.value};
    this.categoryStrore.updateCategory(category);
    this.snackBar.openSnackBar("Category updated", "close");
  }

  deleteCourses() {
    const selectedNodes = this.gridApi?.getSelectedNodes();
    if (selectedNodes && confirm(`Are you sure you want to delete ${selectedNodes.length} categories?`)) {
      selectedNodes.forEach((node : any) => {
        this.categoryStrore.deleteCategory(node.data.id);
      });
      this.snackBar.openSnackBar("Categories deleted", "close");
    }
  }
}