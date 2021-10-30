import { ProductsComponent } from './products.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductRoutingModule } from './products-routing.module';

import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';

import { SteperComponent } from './../../components/steper/steper.component';
import { ProductsCategoryComponent } from '../../components/products/products-category/products-category.component';
import { ProductDescriptionComponent } from './../../components/product-description/product-description.component';
import { ProductEntregaComponent } from '../../components/products/product-entrega/product-entrega.component';
import { ProductAdicionalComponent } from '../../components/products/product-adicional/product-adicional.component';
import { ProductServiceComponent } from './../../components/product-service/product-service.component';

@NgModule({
  declarations: [
    // ProductCertComponent,
    ProductDescriptionComponent,
    ProductsCategoryComponent,
    SteperComponent,
    ProductsComponent,
    ProductEntregaComponent,
    ProductAdicionalComponent,
    ProductServiceComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatSliderModule,
    ProductRoutingModule,
    MatChipsModule,
    MatCheckboxModule,
    MatCardModule,
    MatRadioModule,

  ]
})
export class ProductsModule { }
