import { SharedModule } from './components/shared/common.module';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EntepriseReducer } from './reducers/enterprise.reducers';
import { ProducReducer } from './reducers/producs.reducer';
import { ServiceReducer } from './reducers/service.reducer';
import { LoginComponent } from './login/login.component';



import { FormsStepReducer } from './reducers/formsSteps.reducer';
import { PostGaleriaComponent } from './blog/post-galeria/post-galeria.component';
import { PostVideoComponent } from './blog/post-video/post-video.component';
import { PostImagenDestacadaComponent } from './blog/post-imagen-destacada/post-imagen-destacada.component';
import { PostRelacionadosComponent } from './blog/post-relacionados/post-relacionados.component';
import { PostComponent } from './blog/post/post.component';
import { BlogIndexComponent } from './blog/admin/blog-index/blog-index.component';
import { BlogEditComponent } from './blog/admin/blog-edit/blog-edit.component';
import { LogoComponent } from './blog/admin/shared/logo/logo.component';
import { AsideComponent } from './blog/admin/shared/aside/aside.component';
import { BlogShowComponent } from './blog/admin/blog-show/blog-show.component';
import { BlogContainerEditComponent } from './blog/admin/blog-container-edit/blog-container-edit.component';
import { BlogAsideOptionsComponent } from './blog/admin/blog-aside-options/blog-aside-options.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxTagsModule } from "ngx-tags-input-box";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PostGaleriaComponent,
    PostVideoComponent,
    PostImagenDestacadaComponent,
    PostRelacionadosComponent,
    PostComponent,
    BlogIndexComponent,
    BlogEditComponent,
    LogoComponent,
    AsideComponent,
    BlogShowComponent,
    BlogContainerEditComponent,
    BlogAsideOptionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularEditorModule,
    HttpClientJsonpModule,
    NgbModule,
    PagesModule,
    SharedModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    FormsModule,
    NgxTagsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forRoot({ enterprise: EntepriseReducer, produc: ProducReducer, service: ServiceReducer, formSteps: FormsStepReducer }),
    //StoreModule.forRoot({ }),
    SocialLoginModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '895360168281-k009ooa4nq8r7050u02ff2qiss3uh8tp.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('211469570564222')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
