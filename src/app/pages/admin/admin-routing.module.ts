import { UsersComponent } from './users/users.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NoApprovedComponent } from './no-approved/no-approved.component';
import { ApprovedComponent } from './approved/approved.component';
import { NewEnterpriceComponent } from './new-enterprice/new-enterprice.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'nuevas-empresas',
        component: NewEnterpriceComponent
      },
      {
        path: 'aprobadas',
        component: ApprovedComponent
      },
      {
        path: 'no-aprobadas',
        component: NoApprovedComponent
      },
      {
        path: 'perfil',
        component: PerfilComponent
      },
      {
        path: 'usuarios',
        component: UsersComponent
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
