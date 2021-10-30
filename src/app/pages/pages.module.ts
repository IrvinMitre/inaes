import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './../components/shared/common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule } from '@angular/router';

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
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {MatChipsModule} from '@angular/material/chips';





// COMPONENTS
import { HomeComponent } from './home/home.component';
import { BusinessComponent } from './business/business.component';
import { TourismComponent } from './tourism/tourism.component';
import { TourismCategoryComponent } from './tourism-category/tourism-category.component';
import { DestinationComponent,  ModalDialog8} from './destination/destination.component';
import { RegistryComponent, ModalDialog } from './registry/registry.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { GoodsAndServicesComponent } from './goods-and-services/goods-and-services.component';
import { InformationComponent, ModalDialog4} from './information/information.component';
import { ProfileComponent, ModalDialog2, ModalDialog3 } from './profile/profile.component';
import { GoogleMapsModule } from '@angular/google-maps';


// MODULES
import { DashboardModule } from './dashboard/dashboard.module';
import { ProductsModule } from './products/products.module';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductComponent } from './product/product.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { NewPasswordComponent, ModalDialog12, ModalDialog13 } from './new-password/new-password.component';

@NgModule({
  declarations: [
    HomeComponent,
    BusinessComponent,
    TourismComponent,
    TourismCategoryComponent,
    DestinationComponent,
    RegistryComponent,
    WelcomeComponent,
    GoodsAndServicesComponent,
    InformationComponent,
    ProfileComponent,
    ModalDialog,
    ModalDialog2,
    ModalDialog3,
    ModalDialog4,
    ModalDialog8,
    ModalDialog12,
    ModalDialog13,
    ProductCategoryComponent,
    ProductComponent,
    ProductEditComponent,
    ServiceEditComponent,
    EditPasswordComponent,
    RegisterAdminComponent,
    PrivacyPolicyComponent,
    NewPasswordComponent,
  ],
  exports: [
    HomeComponent,
    BusinessComponent,
    TourismComponent,
    TourismCategoryComponent,
    DestinationComponent,
    RegistryComponent,
    WelcomeComponent,
    GoodsAndServicesComponent,
    InformationComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    GoogleMapsModule,
    ProductsModule,
    MatCardModule,
    MatTabsModule,
    MatCheckboxModule,
    MatExpansionModule,
    RouterModule,
    SharedModule,
    MatRadioModule,
    MatChipsModule
  ]
})
export class PagesModule { }
