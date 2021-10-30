import { DirectoryService } from './../../../services/directory.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as ProductActions from '../../../actions/produc.actions';
import { Store } from '@ngrx/store';
import { ServiceModel } from '../../../models/service.model';
import * as ServicesActionTypes from '../../../actions/service.actions';
import { FormsStepsModel } from '../../../models/formsStep.model';
import * as FormActions from '../../../actions/formsSteps.actions';
import { ProductModel } from 'src/app/models/product.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-product-photo',
  templateUrl: './product-photo.component.html',
  styleUrls: ['./product-photo.component.scss']
})
export class ProductPhotoComponent implements OnInit {

  constructor(
    private storeSer: Store<{ product: ServiceModel }>,
    private fb: FormBuilder,
    private router: Router,
    private formStore: Store<{ form: FormsStepsModel }>,
    private auth: AuthService,
    private dirServ: DirectoryService,
    private store: Store<{ product: ProductModel }>,
  ) { }

	baseUrl: string = environment.ipUrl 

  postForm: FormGroup;
  url = '../../../assets/background-upload-image.jpg';
  url2 = '../../../assets/background-upload-image.jpg';
  url3 = '../../../assets/background-upload-image.jpg';
  flowType: string;
  title: string;
  subtitle: string;
  progress: number;
  textImage1 = false;
  textImage2 = false;
  textImage3 = false;

  ngOnInit(): void {
    this.postForm = this.fb.group({
      textoAlternativo: ['', [Validators.required]],
      textoAlternativo2: ['', [Validators.required]],
      textoAlternativo3: ['', [Validators.required]],
    });
    this.flowType = this.router.url.split('/')[1]
    // console.log(this.flowType);

    switch (this.flowType) {
      case 'producto':
        this.title = 'Ilustra tus productos';
        this.subtitle = 'Anexa minímo 1 fotografía de tu producto que cumplan las especificaciones técnicas.';
        this.progress = 75;
        break;
      case 'servicios':
        this.title = 'Ilustra tu servicio';
        this.subtitle = 'Ingresa 3 fotografias de tu servicio que cumplan las especificaciones técnicas.';
        this.progress = 80;
        break;
    }
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      if(event.target.files[0].size < 200000){
        this.textImage1 = false;
      const formData = new FormData();
      // {
      //  type: string,
      //  pictureRoute: string
      //  } producto-fotografia
      formData.append('files', event.target.files[0]);
      formData.append('directory', this.auth.getUserKey());
      formData.append('subDirectory', 'producto-fotografia');

      this.dirServ.imageUpload(formData).subscribe(
        res => {
          let imge = (res as any).message;
          let imarl = imge.slice(1, -1);
           this.url = `${this.baseUrl}/${imarl}`;
           console.log(this.url);
        }, err => {
          console.log(err);
        }
      );
    }
    else{
      this.textImage1 = true;
    }
    }
  }
  onSelectFile2(event) {
    console.log('sel2');
    if (event.target.files && event.target.files[0]) {
      if(event.target.files[0].size < 200000){
        this.textImage2 = false;
      const formData = new FormData();
      // {
      //  type: string,
      //  pictureRoute: string
      //  }
      formData.append('files', event.target.files[0]);
      formData.append('directory', this.auth.getUserKey());
      formData.append('subDirectory', 'producto-fotografia');

      this.dirServ.imageUpload(formData).subscribe(
        res => {
          let imge = (res as any).message;
          let imarl = imge.slice(1, -1);
           this.url2 = `${this.baseUrl}/${imarl}`;
          console.log(this.url2);
        }, err => {
          console.log(err);
        }
      )
    }
    else{
      this.textImage2 = true;
    }
    }
  }
  onSelectFile3(event) {
    console.log('sel3');
    if (event.target.files && event.target.files[0]) {
      if(event.target.files[0].size < 200000){
        this.textImage3 = false;
      const formData = new FormData();
      // {
      //  type: string,
      //  pictureRoute: string
      //  }
      formData.append('files', event.target.files[0]);
      formData.append('directory', this.auth.getUserKey());
      formData.append('subDirectory', 'producto-fotografia');

      this.dirServ.imageUpload(formData).subscribe(
        res => {
          let imge = (res as any).message;
          let imarl = imge.slice(1, -1);
           this.url3 = `${this.baseUrl}/${imarl}`;
          console.log(this.url3);
        }, err => {
          console.log(err);
        }
      )
    }
    else{

      this.textImage3 = true;
  }
    }
  }
  submit() {

    const dispatchData = [
      {
        route: this.url,
        description: this.postForm.value.textoAlternativo
      },
      {
        route: this.url2,
        description: this.postForm.value.textoAlternativo2
      },
      {
        route: this.url3,
        description: this.postForm.value.textoAlternativo3
      }
    ];

    this.flowType = this.router.url.split('/')[1]
    // console.log(this.flowType);

    switch (this.flowType) {
      case 'producto':
        this.store.dispatch(ProductActions.SetProducPictures({ pictures: dispatchData }));
        this.formStore.dispatch(FormActions.SetProductStep({ step: 'StepSeven' }));
        this.router.navigateByUrl('/producto/entrega')
        break;
      case 'servicios':
        this.storeSer.dispatch(ServicesActionTypes.SetServicePictures({ pictures: dispatchData }));
        this.formStore.dispatch(FormActions.SetServiceStep({ step: 'StepSix' }));
        this.router.navigateByUrl('/servicios/pago')
        break;
    }

  }


}
