import { ProductFunnelGuard } from './../../services/product-funnel.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductsCategoryComponent } from '../../components/products/products-category/products-category.component';
import { ProductKeywordComponent } from '../../components/shared/product-keyword/product-keyword.component';
import { ProductDescriptionComponent } from './../../components/product-description/product-description.component';
import { ProductCertComponent } from '../../components/shared/product-cert/product-cert.component';
import { ProductEntregaComponent } from '../../components/products/product-entrega/product-entrega.component';
import { ProductAdicionalComponent } from '../../components/products/product-adicional/product-adicional.component';
import { ProductPayComponent } from '../../components/shared/product-pay/product-pay.component';
import { ProductServiceComponent } from './../../components/product-service/product-service.component';
import { ProductPhotoComponent } from './../../components/shared/product-photo/product-photo.component';


const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: 'categoria',
        component: ProductsCategoryComponent,
      //  canActivate: [ProductFunnelGuard],

      },
      {
        path: 'certificado',
        component: ProductCertComponent,
       // canActivate: [ProductFunnelGuard],


      },
      {
        path: 'descripcion',
        component: ProductDescriptionComponent,
        canActivate: [ProductFunnelGuard],
      },
      {
        path: 'palabras-clave',
        component: ProductKeywordComponent,
        // canActivate: [ProductFunnelGuard],
      },
      {
        path: 'entrega',
        component: ProductEntregaComponent,
       // canActivate: [ProductFunnelGuard],
      },
      {
        path: 'adicional',
        component: ProductAdicionalComponent,
        // canActivate: [ProductFunnelGuard],
      },
      {
        path: 'producto-servicio',
        component: ProductServiceComponent,
        canActivate: [ProductFunnelGuard],
      },
      {
        path: 'fotografia',
        component: ProductPhotoComponent,
        // canActivate: [ProductFunnelGuard],
      },
      {
        path: 'pago',
        component: ProductPayComponent,
       // canActivate: [ProductFunnelGuard],
      },



    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
