import { EnterpriseModel } from './../../models/productRequest.model';
import * as ProductActions from './../../actions/product.actions';
import { FormsStepsModel } from './../../models/formsStep.model';
import * as FormActions from './../../actions/formsSteps.actions';
import { Store, State } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DirectoryService } from './../../services/directory.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ess-goods-and-services',
  templateUrl: './goods-and-services.component.html',
  styleUrls: ['./goods-and-services.component.scss'],
})
export class GoodsAndServicesComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private store: Store<{ product: EnterpriseModel }>,
    private state: State<EnterpriseModel>,
    private formStore: Store<{ form: FormsStepsModel }>,
    private fb: FormBuilder,
    private router: Router,
    private dirServ: DirectoryService
  ) {}

  baseUrl: string = environment.ipUrl

  postForm: FormGroup;
  url = '../../../assets/background-upload-image.jpg';
  url2 = '../../../assets/background-upload-image.jpg';
  nombreEmpresa: any[];
  textImage1 = false;
  textImage2 = false;

  ngOnInit() {
    this.postForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.maxLength(300)]],
    });
    this.getidOrganismo();
    this.store.dispatch(ProductActions.LoadProduct());
    console.log(this.state.getValue().enterprise)
  }

  async onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size < 200000) {
        this.textImage1 = false;
        const formData = new FormData();
        // {
        //  type: string,
        //  pictureRoute: string
        //  }
        formData.append('files', event.target.files[0]);
        formData.append('directory', this.auth.getUserKey());
        formData.append('subDirectory', 'empresa-perfil');

         await this.dirServ.imageUpload(formData).subscribe(
          (res) => {
            let imge = (res as any).message;
            let imarl = imge.slice(1, -1);
            this.url = `${this.baseUrl}/${imarl}`;
            console.log(this.url);
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        this.textImage1 = true;
      }
    }
  }
  async onSelectFile2(event) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size < 200000) {
        this.textImage2 = false;
        const formData = new FormData();
        // {
        //  type: string,
        //  pictureRoute: string
        //  }
        formData.append('files', event.target.files[0]);
        formData.append('directory', this.auth.getUserKey());
        formData.append('subDirectory', 'empresa-perfil');

        await this.dirServ.imageUpload(formData).subscribe(
          (res) => {
            let imge = (res as any).message;
            let imarl = imge.slice(1, -1);
            this.url2 = `${this.baseUrl}/${imarl}`;
            console.log(this.url2);
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        this.textImage2 = true;
      }
    }
  }
   async getidOrganismo() {
     await this.dirServ.getClaveActualizacion(this.auth.getUserKey()).subscribe(
      (res) => {
        const idOrganismo = (res as any).data.datosConsulta.idOrganismo;
        const idTipoOrganismo = (res as any).data.idTipoOrganismo;
        // console.log(idOrganismo);
        // console.log(idTipoOrganismo);


         this.dirServ
          .getDatosOrganismoPlataforma(idOrganismo, idTipoOrganismo)
          .subscribe(
            (res) => {
              this.nombreEmpresa = (res as any).organismo.denominacion;
              this.postForm = this.fb.group({
                nombre: [this.nombreEmpresa, [Validators.required]],
                descripcion: ['', [Validators.required, Validators.maxLength(300)]],
              });
            },
            (err) => {
              // console.log(err);
            }
          );
      },
      (err) => {
        // console.log(err)
      }
    );
  }

  submit() {
    if (!this.postForm) {
      return;
    }
    let imageData = [
      {
        route: this.url,
        type: 'logo',
      },
      {
        route: this.url2,
        type: 'logo2',
      },
    ];

    this.store.dispatch(
      ProductActions.SetSocialPicture({ identityPictures: imageData })
    );
    this.store.dispatch(
      ProductActions.SetShortDescriptions({
        short: this.postForm.value.descripcion,
      })
    );

    this.formStore.dispatch(
      FormActions.SetRegistrationStep({ step: 'StepFour' })
    );
    this.router.navigateByUrl('/registro/informacion-adicional');
    // console.log(this.postForm.value);
  }
}
