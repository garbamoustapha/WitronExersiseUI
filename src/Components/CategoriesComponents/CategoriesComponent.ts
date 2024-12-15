import { Component, computed, inject, signal } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import {MatButtonModule} from '@angular/material/button';

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
      <h1>All categories {{i()}} X {{y()}} = {{z()}}</h1>
      <ag-grid-angular
        style="width: 100%; height: 500px;"
        [rowData]="rowData"
        [columnDefs]="colDefs"
        [pagination]="true"
        [paginationPageSize]="10"
        [paginationPageSizeSelector]="[10, 20]"
        [defaultColDef]="defaultColDef"
        rowSelection="multiple" />
        <button mat-raised-buttom (click)="OpenAddCourseDialog()" class="mat-button"  mat-flat-button>New category</button> 
        <button (click)="count()" class="mat"  mat-flat-button>New</button>
        <button (click)="count2()" class="mat"  mat-flat-button>New</button>
    </div>
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
  i = signal(0);
  y = signal(0);
  z = computed(() => this.i() * this.y());

  count(){
    this.i.update(c => c + 1);
  }

  count2(){
    this.y.update(c => c + 1);
  }


  defaultColDef : ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    editable:true
  }
  // Row Data: The data to be displayed.
  rowData = [
    { Number: 1, Name: "John Doe", "Created at": "2024-12-01" },
    { Number: 2, Name: "Jane Smith", "Created at": "2024-12-02" },
    { Number: 3, Name: "Carlos Lopez", "Created at": "2024-12-03" },
    { Number: 4, Name: "Alice Brown", "Created at": "2024-12-04" },
    { Number: 5, Name: "David Green", "Created at": "2024-12-05" },
    { Number: 6, Name: "Emily Davis", "Created at": "2024-12-06" },
    { Number: 7, Name: "Michael Scott", "Created at": "2024-12-07" },
    { Number: 8, Name: "Sandra Lee", "Created at": "2024-12-08" },
    { Number: 9, Name: "Chris Evans", "Created at": "2024-12-09" },
    { Number: 10, Name: "Anna White", "Created at": "2024-12-10" },
    { Number: 11, Name: "Paul Walker", "Created at": "2024-12-11" },
    { Number: 12, Name: "Sophia Hill", "Created at": "2024-12-12" },
    { Number: 13, Name: "Oliver Stone", "Created at": "2024-12-13" },
    { Number: 14, Name: "Emma Johnson", "Created at": "2024-12-14" },
    { Number: 15, Name: "Liam Brown", "Created at": "2024-12-15" },
  ];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
      { 
        field: "Number" ,
        checkboxSelection: true,      
      },
      { field: "Name" },
      { field: "Description" },
      { field: "Created at"},
  ];

  readonly dialog = inject(MatDialog);

  OpenAddCourseDialog()
  {
    this.dialog.open(CreatCategoryDialogComponent);
  }
}