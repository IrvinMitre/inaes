import { SharedModule } from './../../components/shared/common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// ANGULAR MATERIAL
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
import {MatDividerModule} from '@angular/material/divider';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatChipsModule } from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';



import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProductsDashboardComponent } from './products-dashboard/products-dashboard.component';
import { ProfileDashboardComponent, ModalDialog4 } from './profile-dashboard/profile-dashboard.component';
import { ServicesDashboardComponent } from './services-dashboard/services-dashboard.component';
import { AddressComponent } from './address/address.component';
import { StoresComponent } from './stores/stores.component';
import { EditPasswordComponent, ModalDialog2, ModalDialog1 } from './edit-password/edit-password.component';



@NgModule({
  declarations: [
    HomeDashboardComponent,
    ContactComponent,
    ProductsDashboardComponent,
    ProfileDashboardComponent,
    ServicesDashboardComponent,
    AddressComponent,
    StoresComponent,
    ModalDialog4,
    ModalDialog2,
    ModalDialog1,
    EditPasswordComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    GoogleMapsModule,
    MatChipsModule,
    MatCheckboxModule,
    SharedModule

  ]
})
export class DashboardModule { }
