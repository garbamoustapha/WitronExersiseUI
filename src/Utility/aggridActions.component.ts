import { Component, output } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, } from 'ag-grid-community';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'ag-grid-actions',
  imports: [MatIcon],
  template: `
  <div class="actions-container">
    <button (click)="onUpdateBtnClick($event)">
      <mat-icon class="example-icon" aria-hidden="false" aria-label="Example edit icon">edit</mat-icon>
    </button>
    <button (click)="onDeleteBtnClick($event)">
      <mat-icon class="example-icon" aria-hidden="false" aria-label="Example delete icon">delete</mat-icon>
    </button>   
  </div>
  `,
  styles: [`
    .actions-container {
      display: flex;
      justify-content: center;
    }
    .actions-container > button {
      decoration: none;
      background: none;
      border: none;
      cursor: pointer;
      margin: 0 5px;
      padding: 0px 10px;
    }
    .example-icon {
      font-size: 24px;
      color:rgb(5, 66, 136);
    }
    
    .example-icon:hover {
      color:rgb(6, 113, 235);
    }
    .exam
    ple-icon {
      padding: 0 14px;
    }
    `]
})
export class AgGridActionsComponent implements ICellRendererAngularComp {
  private params!: any;

  deleteBtnClick = output<any>();

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
    console.log('Params received by AgGridActionsComponent:', params);
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    this.params = params;
    return true;
  }

  onDeleteBtnClick(event: any) {
   if(this.params && this.params.deleteBtnClick){
      this.params.deleteBtnClick(this.params.node.data);
    }
  }

  onUpdateBtnClick(event: any) {
    if(this.params && this.params.updateBtnClick){
      this.params.updateBtnClick(this.params.node.data);
    }
  }
}