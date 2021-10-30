import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { RegisterAdminComponent } from './pages/register-admin/register-admin.component';
import { EditPasswordComponent } from './pages/edit-password/edit-password.component';
import { ServiceEditComponent } from './pages/service-edit/service-edit.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { AuthGuard } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { BusinessComponent } from './pages/business/business.component';
import { TourismComponent } from './pages/tourism/tourism.component';
import { TourismCategoryComponent } from './pages/tourism-category/tourism-category.component';
import { DestinationComponent } from './pages/destination/destination.component';
import { ProductComponent } from './pages/product/product.component';
// LOGIN PAGES
import { RegistryComponent } from './pages/registry/registry.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { GoodsAndServicesComponent } from './pages/goods-and-services/goods-and-services.component';
import { InformationComponent } from './pages/information/information.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductCategoryComponent } from './pages/product-category/product-category.component';
// Test navbar
import { NavbarComponent } from './components/shared/navbar/navbar.component';

import { ProductServiceComponent } from './components/product-service/product-service.component';
// Testing login
import { LoginComponent } from './login/login.component';



//Blog
import { PostComponent } from './blog/post/post.component';
import { PostImagenDestacadaComponent } from './blog/post-imagen-destacada/post-imagen-destacada.component';
import { PostVideoComponent } from './blog/post-video/post-video.component';
import { PostGaleriaComponent } from './blog/post-galeria/post-galeria.component';
import { BlogIndexComponent } from './blog/admin/blog-index/blog-index.component';
import { BlogContainerEditComponent } from './blog/admin/blog-container-edit/blog-container-edit.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { RegistrationFunnelGuard } from './services/registration-funnel.service';


const routes: Routes = [
  {
    path: 'politica-de-privacidad',
    component: PrivacyPolicyComponent
  },
  {
    path: 'post-edit',
    component: BlogContainerEditComponent
  },
  {
    path: 'blog-index',
    component: BlogIndexComponent
  },
  {
    path: 'post-galeria',
    component: PostGaleriaComponent
  },
  {
    path: 'post-video',
    component: PostVideoComponent
  },
  {
    path: 'post-destacada',
    component: PostImagenDestacadaComponent
  },
  {
    path: 'post',
    component: PostComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'menu',
    component: NavbarComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'empresas/:id',
    component: BusinessComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'producto-categoria/:id',
    component: ProductCategoryComponent,
 //   canActivate: [AuthGuard]

  },
  {
    path: 'producto-servicio',
    component: ProductServiceComponent,
  //  canActivate: [AuthGuard]
  },
  {
    path: 'productos/:id/:sk',
    component: ProductComponent,
   // canActivate: [AuthGuard]
  },
  {
    path: 'editar-producto/:id',
    component: ProductEditComponent,
     canActivate: [AuthGuard]
  },
  {
    path: 'editar-servicio/:id',
    component: ServiceEditComponent,
     canActivate: [AuthGuard]
  },
  {
    path: 'editar-password/:id',
    component: EditPasswordComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'nueva-contraseña',
    component: NewPasswordComponent,
    canActivate: [AuthGuard]

  },

  {
    path: 'turismo',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: TourismComponent,
      },
      {
        path: 'categoria/:cat',
        component: TourismCategoryComponent,
      }
    ]
  },
  {
    path: 'servicio/:id/:sk',
    component: DestinationComponent,

  },
  {
    path: 'register/admin',
    component: RegisterAdminComponent,

  },
  {
    path: 'registro',
    children: [
      {
        path: '',
        component: RegistryComponent,
      },
      {
        path: 'bienvenida',
        component: WelcomeComponent,
        canActivate: [RegistrationFunnelGuard]
      },
      {
        path: 'bienes-y-servicios',
        component: GoodsAndServicesComponent,
        canActivate: [RegistrationFunnelGuard]
      },
      {
        path: 'informacion-adicional',
        component: InformationComponent,
        canActivate: [RegistrationFunnelGuard]
      },
      {
        path: 'perfil',
        component: ProfileComponent,
        canActivate: [RegistrationFunnelGuard]

      }
    ]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'producto',
    loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule),
    //canActivate: [AuthGuard]

  },
  {
    path: 'servicios',
    loadChildren: () => import('./pages/services/services.module').then(m => m.ServicesModule),
    //canActivate: [AuthGuard]

  },
  {
    path: 'admin/:id',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)

  },
  {
    path: '**',
    redirectTo: 'home'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
