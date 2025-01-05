import { Component, computed, inject, effect, signal } from "@angular/core";
// Angular Data Grid Component
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';
import { 
  AllCommunityModule, 
  ModuleRegistry, 
  GridApi, 
  GetRowIdFunc, 
  GetRowIdParams,
} from 'ag-grid-community'; 

import {MatButtonModule} from '@angular/material/button';

import { CreateCourseDialogComponent } from './createCourseDialog.component';
import { courseStore } from "../../Stores/course.store";
import { CategoryStore } from "../../Stores/Category.store";
import {MatIconModule} from '@angular/material/icon';

//Dialog import
import {
  MatDialog,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Category, Course } from "../../Model/AllBaseModel";

import { SnackBarUtility } from "../../Utility/snackBar.utility";
import { AgGridActionsComponent } from "../../Utility/aggridActions.component";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'courseComponent',
  imports: [
    MatButtonModule,
    AgGridAngular,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  template:`
    <div class="header">
      <h1 >All courses</h1>
      <button mat-fab class="delete-button" [disabled]="!hasSelectedRows" (click)="deleteCourses()" >
        <mat-icon>delete</mat-icon>
      </button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 500px;"
      [rowData]="store.courses()"
      [columnDefs]="colDefs"
      [pagination]="true"
      [paginationPageSize]="10"
      [paginationPageSizeSelector]="[10,20]"
      [defaultColDef]="defaultColDef"
      [rowSelection]="'multiple'"
      [readOnlyEdit]="true"
      [getRowId]="getRowId"
      (gridReady)="onGridReady($event)"
      (selectionChanged)="onSelectionChanged()"
      (cellEditRequest)="onCellValueChanged($event)"/>
    <button mat-raised-buttom (click)="OpenAddCourseDialog()" class="mat-button"  mat-flat-button>New course</button>
      `,
  styles: [`

    .mat-button{
      position: absolute;
      bottom:0;right:0;
      margin: 20px;
    }
  `
  ]
})
export class CourseComponent {   
  paginationPageSizeSelector = [10,20]; // Pagination Page Size Selector
  defaultColDef : ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    editable:true
  }

  store = inject(courseStore);
  categoryStore = inject(CategoryStore);
  readonly dialog = inject(MatDialog);
  snakbar = inject(SnackBarUtility);

  colDefs: ColDef[] = [];
  gridApi: GridApi | undefined;
  hasSelectedRows = false;
 

  public getRowId : GetRowIdFunc = (params: GetRowIdParams<Course>) =>
     params.data.id ?? "";

  AgGridActionsComponent = AgGridActionsComponent; // Ag Grid Actions Component

  constructor() {
    this.categoryStore.loadAll();
    effect(() => {
      console.log(this.categoryStore.categories());
      if (this.categoryStore.categories().length > 0) {
        this.initColDefs();
      }
    })
   }

  initColDefs() { 
    this.colDefs =  [
      { 
        field: "title" ,
        checkboxSelection: true,
        editable: true     
      },
      { 
        field: "description", 
        editable: true 
      },
      { 
        field: "instructorName", 
        editable: true
      },
      { 
        field: "category" , 
        valueGetter: (params) => params.data.category.name,        
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: this.categoryStore.categories().map((cat) => `${cat.name} ${cat.id}`),
          valueListMaxWidth: 450
        }
      },  
      { 
        field: "createdDate", 
        editable: false
      }, 
        { 
        field: "Actions", 
        editable: false,
        cellRenderer: AgGridActionsComponent,
        filter: false,
        cellRendererParams: {
          deleteBtnClick: (rowData: Course) => {
            if(rowData.id)
              this.deleteCourse(rowData.id);
          },
          updateBtnClick: (rowData: Course) => {
            if(rowData)
              this.OpenAddCourseDialog(rowData);        
          }
        }      
      }, 
       
    ];
  }

  onActionBtnClick(): void {
    console.log('Action button clicked!');
    // Add your functionality here
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }
  
  onSelectionChanged(): void {
    this.hasSelectedRows = this.gridApi?.getSelectedRows().length == undefined ? false :
                           this.gridApi?.getSelectedRows().length > 0 ? true : false;
  }

  onCellValueChanged(param: any): void {
    var updatedRow : Course;
    if(param.colDef.field === "category") {
      const categoryid = param.newValue.split(" ").pop();
      if(categoryid === param.data.categoryId) {
        return;        
      }
      updatedRow = { ...param.data, categoryId: categoryid };
    }
    else {
      updatedRow = { ...param.data, [param.colDef.field]: param.newValue };
    }
    this.store.UpdateCourse(updatedRow);
    this.snakbar.openSnackBar("Course updated", "Close");
  }

  ngOnInit() { 
    this.store.loadAll();
    console.log(this.store.courses());
  }

  OpenAddCourseDialog(course : Course | undefined = undefined) : void
  {
    this.dialog.open(CreateCourseDialogComponent, { data:course});
  }
  
  deleteCourses(): void {
    if(!this.hasSelectedRows) return;
    if(!confirm("Are you sure you want to delete the selected courses?")) return;

    const selectedNodes = this.gridApi?.getSelectedNodes();
    if (selectedNodes) {
      selectedNodes.forEach(node => {
        this.store.DeleteCourse(node.data.id);
      });
    }
    this.snakbar.openSnackBar("Course(s) deleted", "Close");
  }

  deleteCourse(CourseId: string): void {
    if(!confirm("Are you sure you want to delete the selected courses?")) return;
    this.store.DeleteCourse(CourseId);
    this.snakbar.openSnackBar("Course(s) deleted", "Close");
  }
} 
