import { ModalDialog } from './../registry/registry.component';
import { SharedModule } from './../../components/shared/common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';

import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatRadioModule} from '@angular/material/radio';
import {MatChipsModule} from '@angular/material/chips';


import { DashboardRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import {MatDividerModule} from '@angular/material/divider';
import { NewEnterpriceComponent } from './new-enterprice/new-enterprice.component';
import { ApprovedComponent } from './approved/approved.component';
import { NoApprovedComponent } from './no-approved/no-approved.component';
import { PerfilComponent, ModalDialog12 } from './perfil/perfil.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { UsersComponent } from './users/users.component';




@NgModule({
  declarations: [
    HomeComponent,
    NewEnterpriceComponent,
    ApprovedComponent,
    NoApprovedComponent,
    PerfilComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatDividerModule,
    MatExpansionModule,
    MatTabsModule,
    MatButtonToggleModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    MatTabsModule,
    MatCheckboxModule,
    MatExpansionModule,
    SharedModule,
    MatRadioModule,
    MatChipsModule,
    MatTableModule
  ]
})
export class AdminModule { }
