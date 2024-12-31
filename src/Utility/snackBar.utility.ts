import {MatSnackBar} from '@angular/material/snack-bar';
import {inject, Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SnackBarUtility {
  private _snackBar = inject(MatSnackBar);

  openSnackBar(title : string, buttomName : string) {
    this._snackBar.open(title, buttomName, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
    });
  }
}
