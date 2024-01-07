import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';

import {MatMenuModule} from '@angular/material/menu';



const mat=[
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatSnackBarModule,
  MatCardModule,
  MatToolbarModule,
  MatListModule,
  MatTableModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatDialogModule,
  MatCheckboxModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatMenuModule,

]


@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    mat
  ],exports:[
    mat
  ]
})
export class MaterialsModule { }
