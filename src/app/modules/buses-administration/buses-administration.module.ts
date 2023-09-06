import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusesAdministrationRoutingModule } from './buses-administration-routing.module';
import { BusesListComponent } from './buses-list/buses-list.component';
import { BusesDetailComponent } from './buses-detail/buses-detail.component';
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  declarations: [
    BusesListComponent,
    BusesDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BusesAdministrationRoutingModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class BusesAdministrationModule { }
