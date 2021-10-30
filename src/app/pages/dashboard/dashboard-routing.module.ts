import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { ProductsDashboardComponent } from './products-dashboard/products-dashboard.component';
import { ServicesDashboardComponent } from './services-dashboard/services-dashboard.component';
import { ProfileDashboardComponent } from './profile-dashboard/profile-dashboard.component';
import {EditPasswordComponent} from './edit-password/edit-password.component';
import { AddressComponent } from './address/address.component';
import { StoresComponent } from './stores/stores.component';

const routes: Routes = [
  {
    path: '',
    component: HomeDashboardComponent,
    children: [
      {
        path: 'productos',
        component: ProductsDashboardComponent
      },
      {
        path: 'servicios',
        component: ServicesDashboardComponent
      },
      {
        path: 'perfil',
        component: ProfileDashboardComponent
      },
      {
        path: 'contacto',
        component: ContactComponent
      },
      {
        path: 'direccion',
        component: AddressComponent
      },
      {
        path: 'punto-de-venta',
        component: StoresComponent
      },
      {
        path: 'edit-contrasena',
        component: EditPasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
