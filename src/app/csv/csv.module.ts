import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { CSVRoutingModule } from './csv-routing.module';
import { CsvHomeComponent } from './csv-home/csv-home.component';


@NgModule({
  declarations: [CsvHomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    CSVRoutingModule,
    AgGridModule.withComponents([]),
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ]
})
export class CsvModule { }
