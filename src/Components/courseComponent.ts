import { Component, inject } from "@angular/core";
// Angular Data Grid Component
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 

import {MatButtonModule} from '@angular/material/button';

import { CreateCourseDialogComponent } from './CreateCourseDialogComponent';

import { courseStore } from "../Stores/course.store";
import { HttpClientModule } from '@angular/common/http';




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
import { Course } from "../Model/AllBaseModel";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'courseComponent',
  imports: [
    MatButtonModule,
    AgGridAngular,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template:`
  <h1>All courses</h1>
    <ag-grid-angular
        style="width: 100%; height: 500px;"
        [rowData]="store.courses()"
        [columnDefs]="colDefs"
        [pagination]="true"
        [paginationPageSize]="10"
        [paginationPageSizeSelector]="[10,20]"
        [defaultColDef]="defaultColDef"
        rowSelection="multiple" />
        <button mat-raised-buttom (click)="OpenAddCourseDialog()" class="mat-button"  mat-flat-button>New course</button>
      `,
  styles: [`
    h1{
      text-align: left;
      font-weight: bold;
      margin:20px 50px ;
    }
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

  // Row Data: The data to be displayed.
  rowData : Course [] = [];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
      { 
        field: "title" ,
        checkboxSelection: true,      
      },
      { field: "description" },
      { field: "instructorName" },
      { field: "date-related information"}  
  ];

  readonly dialog = inject(MatDialog);

  constructor() { }

  ngOnInit() { 
    this.store.loadAll();
    console.log(this.store.courses());
  }

  OpenAddCourseDialog() : void
  {
    this.dialog.open(CreateCourseDialogComponent);
  }
} 


