import { Component, inject } from "@angular/core";
// Angular Data Grid Component
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 

import {MatButtonModule} from '@angular/material/button';

import { CreateCourseDialogComponent } from './CreateCourseDialogComponent';

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
        [rowData]="rowData"
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
  // Row Data: The data to be displayed.
  rowData = [
    { Title: "Angular Basics", Description: "Introduction to Angular", Instructor: "John Doe", "date-related information": "2024-12-01" },
    { Title: "React Essentials", Description: "Getting started with React", Instructor: "Jane Smith", "date-related information": "2024-12-05" },
    { Title: "Vue Mastery", Description: "Learn Vue.js", Instructor: "Carlos Lopez", "date-related information": "2024-12-10" },
    { Title: "Node.js Fundamentals", Description: "Backend development with Node.js", Instructor: "Alice Brown", "date-related information": "2024-12-15" },
    { Title: "Python for Data Science", Description: "Data analysis with Python", Instructor: "David Green", "date-related information": "2024-12-20" },
    { Title: "Machine Learning Basics", Description: "Introduction to ML", Instructor: "Emily Davis", "date-related information": "2025-01-01" },
    { Title: "Cybersecurity 101", Description: "Learn the basics of cybersecurity", Instructor: "Michael Scott", "date-related information": "2025-01-05" },
    { Title: "DevOps Essentials", Description: "Understand DevOps practices", Instructor: "Sandra Lee", "date-related information": "2025-01-10" },
    { Title: "Cloud Computing", Description: "AWS and Azure basics", Instructor: "Chris Evans", "date-related information": "2025-01-15" },
    { Title: "Kubernetes Fundamentals", Description: "Container orchestration with Kubernetes", Instructor: "Anna White", "date-related information": "2025-01-20" }, 
    { Title: "Cybersecurity 101", Description: "Learn the basics of cybersecurity", Instructor: "Michael Scott", "date-related information": "2025-01-05" },
    { Title: "DevOps Essentials", Description: "Understand DevOps practices", Instructor: "Sandra Lee", "date-related information": "2025-01-10" },
    { Title: "Cloud Computing", Description: "AWS and Azure basics", Instructor: "Chris Evans", "date-related information": "2025-01-15" },
    { Title: "Kubernetes Fundamentals", Description: "Container orchestration with Kubernetes", Instructor: "Anna White", "date-related information": "2025-01-20" },
  ];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
      { 
        field: "Title" ,
        checkboxSelection: true,      
      },
      { field: "Description" },
      { field: "Instructor"},
      { field: "date-related information"}  
  ];

  readonly dialog = inject(MatDialog);

  constructor() { }

  OpenAddCourseDialog() : void
  {
    this.dialog.open(CreateCourseDialogComponent);
  }
} 


