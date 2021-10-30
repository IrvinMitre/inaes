import { SetProductFeatures } from './../../../actions/produc.actions';
import { DirectoryService } from './../../../services/directory.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { FormsStepsModel } from '../../../models/formsStep.model';
import * as FormActions from '../../../actions/formsSteps.actions';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../../actions/produc.actions';
import { ProductModel } from 'src/app/models/product.model';
import * as ServicesActionTypes from '../../../actions/service.actions';
import { environment } from '../../../../environments/environment';

/**
 * @ignore
 */
@Component({
  selector: 'app-product-cert',
  templateUrl: './product-cert.component.html',
  styleUrls: ['./product-cert.component.scss'],
})
export class ProductCertComponent implements OnInit {
  constructor(
    private router: Router,
    private dirServ: DirectoryService,
    private formStore: Store<{ form: FormsStepsModel }>,
    private auth: AuthService,
    private store: Store<{ product: ProductModel }>
  ) { }
	baseUrl: string = environment.ipUrl 
  
  url = '../../../assets/background-upload-image.jpg';
  url2 = '../../../assets/background-upload-image.jpg';
  url3 = '../../../assets/background-upload-image.jpg';
  url4 = '../../../assets/background-upload-image.jpg';

  trueUpload = false;
  trueUpload2 = false;
  trueUpload3 = false;
  trueUpload4 = false;
  textImage1 = false;
  textImage2 = false;
  textImage3 = false;
  textImage4 = false;
  flowType: string;
  title: string;
  flowType1 = this.router.url.split('/')[1]

  ngOnInit(): void {
    this.flowType = this.router.url.split('/')[1]
     console.log(this.flowType1);

    switch (this.flowType) {
      case 'producto':
        this.title = '¿Tu producto tiene alguna certificación?';
        break;
      case 'servicios':
        this.title = '¿Tu servicio tiene alguna certificación?';
        break;
    }
  }
  /**
   * guardan la informacion en base 64 de la imagen 1
   * @param event evento de boton de select file
   */
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      if(event.target.files[0].size < 200000){
        this.textImage1 = false;

      const formData = new FormData();
      // {
      //  type: string,
      //  pictureRoute: string
      //  }
      formData.append('files', event.target.files[0]);
      formData.append('directory', this.auth.getUserKey());
      formData.append('subDirectory', 'producto-certificacion');

      this.dirServ.imageUpload(formData).subscribe(
        res => {
          let imge = (res as any).message;
         let imarl = imge.slice(1, -1);
          this.url = `${this.baseUrl}/${imarl}`;
          console.log(this.url);

        }, err => {
          console.log(err);
        }
      )
    }
    else{
      this.textImage1 = true;
    }
  }

  }
  /**
   * guardan la informacion en base 64 de la imagen 1
   * @param event evento de boton de select file
   */
  onSelectFile2(event) {
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
      formData.append('subDirectory', 'producto-certificacion');

      this.dirServ.imageUpload(formData).subscribe(
        res => {
          let imge = (res as any).message;
          let imarl = imge.slice(1, -1);
           this.url2 = `${this.baseUrl}/${imarl}`;
           console.log(res);
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
  /**
   * guardan la informacion en base 64 de la imagen 2
   * @param event evento de boton de select file
   */
  onSelectFile3(event) {
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
      formData.append('subDirectory', 'producto-certificacion');

      this.dirServ.imageUpload(formData).subscribe(
        res => {
          let imge = (res as any).message;
         let imarl = imge.slice(1, -1);
          this.url3 = `${this.baseUrl}/${imarl}`;
          console.log(this.url);
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
  /**
   * guardan la informacion en base 64 de la imagen 3
   * @param event evento de boton de select file
   */
  onSelectFile4(event) {
    if (event.target.files && event.target.files[0]) {
      if(event.target.files[0].size < 200000){
        this.textImage4 = false;
      const formData = new FormData();
      // {
      //  type: string,
      //  pictureRoute: string
      //  }
      formData.append('files', event.target.files[0]);
      formData.append('directory', this.auth.getUserKey());
      formData.append('subDirectory', 'producto-certificacion');

      this.dirServ.imageUpload(formData).subscribe(
        res => {
          let imge = (res as any).message;
         let imarl = imge.slice(1, -1);
          this.url4 = `${this.baseUrl}/${imarl}`;
          console.log(this.url);
        }, err => {
          console.log(err);
        }
      )
    }
    else{
      this.textImage4 = true;
    }
    }
  }
  /**
   * valida si form es valida para avanzar y
   * navega a la siguiente vista
   */
  submit() {

    const dispatchData = [];

    if (this.trueUpload)
      dispatchData.push({
        type: 'Marca registrada',
        pictureRoute: this.url
      })

    if (this.trueUpload2)
      dispatchData.push({
        type: 'Denominación de origen',
        pictureRoute: this.url2
      })

    if (this.trueUpload3)
      dispatchData.push({
        type: 'Sello de comercio justo',
        pictureRoute: this.url3
      })

    if (this.trueUpload4)
      dispatchData.push({
        type: 'Producto orgánico',
        pictureRoute: this.url4
      })

      this.flowType = this.router.url.split('/')[1]
      // console.log(this.flowType);

      switch (this.flowType) {
        case 'producto':
          this.store.dispatch(
            ProductActions.SetProductFeatures({
              features: dispatchData,
            })
          );

          console.log(dispatchData);
          this.formStore.dispatch(FormActions.SetProductStep({ step: 'StepFour' }))
          break;
        case 'servicios':
          this.store.dispatch(ServicesActionTypes.SetProductFeatures({ features: dispatchData }));

          this.formStore.dispatch(FormActions.SetServiceStep({step: 'StepTree'}));
          break;
      }



    this.flowType === 'producto' ? this.router.navigateByUrl('producto/descripcion') : this.router.navigateByUrl('/servicios/path')
  }

}
