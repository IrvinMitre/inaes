import { ServicesFunnelGuard } from './../../services/services-funnel.service';
import { ProductPhotoComponent } from '../../components/shared/product-photo/product-photo.component';
import { ProductKeywordComponent } from '../../components/shared/product-keyword/product-keyword.component';
import { ProductPathComponent } from '../../components/services/product-path/product-path.component';
import { ProductCertComponent } from '../../components/shared/product-cert/product-cert.component';
import { SectorsComponent } from './../../components/services/sectors/sectors.component';
import { ServicesComponent } from './services.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductPayComponent } from 'src/app/components/shared/product-pay/product-pay.component';

const routes: Routes = [
  {
    path: '',
    component: ServicesComponent,
    children: [
      {
        path: 'sectores',
        component: SectorsComponent,
        canActivate: [ServicesFunnelGuard]

      },
      {
        path: 'certificado',
        component: ProductCertComponent,
       // canActivate: [ServicesFunnelGuard]
      },
      {
        path: 'path',
        component: ProductPathComponent,
       // canActivate: [ServicesFunnelGuard]
      },
      {
        path: 'palabras-clave',
        component: ProductKeywordComponent,
        canActivate: [ServicesFunnelGuard]
      },
      {
        path: 'fotografia',
        component: ProductPhotoComponent,
      //  canActivate: [ServicesFunnelGuard]
      },
      {
        path: 'pago',
        component: ProductPayComponent,
        canActivate: [ServicesFunnelGuard]
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
