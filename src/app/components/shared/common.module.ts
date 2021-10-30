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
import { ProductPhotoComponent } from '../../components/shared/product-photo/product-photo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductKeywordComponent } from '../../components/shared/product-keyword/product-keyword.component';
import { SearchComponent } from './search/search.component';
import { ProductCertComponent } from './product-cert/product-cert.component';
import { ProductPayComponent, ModalDialog } from '../../components/shared/product-pay/product-pay.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent, ModalDialog1, ModalDialog7, ModalDialog6, ModalDialog9, ModalDialog10 } from './nav/nav.component';
import { NewsletterFormComponent } from './newsletter-form/newsletter-form.component';
import { RouterModule } from '@angular/router';
import { PoliticasPrivacidadComponent } from './newsletter-form/politicas-privacidad/politicas-privacidad.component';


@NgModule({
  declarations: [
    SearchComponent,
    ProductCertComponent,
    NavbarComponent,
    ProductKeywordComponent,
    ProductPhotoComponent,
    FooterComponent,
    ProductPayComponent,
    ModalDialog,
    ModalDialog7,
    ModalDialog6,
    ModalDialog9,
    ModalDialog1,
    NavComponent,
    NewsletterFormComponent,
    PoliticasPrivacidadComponent
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
    MatChipsModule,
    MatCheckboxModule,
    MatCardModule,
    RouterModule
  ],
  exports: [
    SearchComponent,
    ProductCertComponent,
    NavbarComponent,
    FooterComponent,
    ProductPayComponent,
    NavComponent,
    ModalDialog,
    ModalDialog7,
    ModalDialog6,
    NewsletterFormComponent
  ]
})
export class SharedModule { }
