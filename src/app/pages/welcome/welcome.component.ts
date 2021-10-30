import { FormsStepsModel } from './../../models/formsStep.model';
import { EnterpriseModel } from './../../models/productRequest.model';
import * as FormActions from './../../actions/formsSteps.actions';
import * as ProductActions from './../../actions/product.actions';
import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DirectoryService } from './../../services/directory.service';
import { Store } from '@ngrx/store';
import { _countGroupLabelsBeforeOption } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ess-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private formStore: Store<{ form: FormsStepsModel }>,
    private store: Store<{ product: EnterpriseModel }>,
    private fb: FormBuilder,
    private dirServ: DirectoryService,
    private router: Router,
    private _ngZone: NgZone
  ) {}

  baseUrl: string = environment.ipUrl

  postForm: FormGroup;
  public imagePath;
  imgURL: any;
  public message: string;
  lat = 0;
  lng = 0;
  zoom = 16;
  textImage1 = false;
  textImage2 = false;
  textImage3 = false;

  label: {
    color: 'red';
    text: 'UBICACIÓN';
  };
  options: { animation: google.maps.Animation.BOUNCE };
  center = { lat: 0, lng: 0 };
  position: {
    lat: 0;
    lng: 0;
  };
  url = '../../../assets/background-upload-image.jpg';
  url2 = '../../../assets/background-upload-image.jpg';
  url3 = '../../../assets/background-upload-image.jpg';
  empresas: any[];
  nombreEmpresa: any;
  tipo: any;
  referencia: any;
  direccion: any;
  latitud: any;
  longitud: any;
  sub: any;
  claveActividad: any;

  ngOnInit() {
    this.postForm = this.fb.group({
      empresa: [
        {
          value: this.nombreEmpresa,
          disabled: true,
        },
        [Validators.required],
      ],
      tipo: [
        {
          value: this.tipo,
          disabled: true,
        },
        [Validators.required],
      ],
      claveActividad: [
        {
          value: '',
          disabled: true,
        },
        [Validators.required],
      ],
      direccion: [
        {
          value: '',
          disabled: true,
        },
        [Validators.required],
      ],
      referencia: ['', [Validators.required]],
      img1: [null],
      img2: [null],
      img3: [null],
    });
    //this.getDatosOrganismoPlataforma("815", 12);
    this.getidOrganismo();
    this.store.dispatch(ProductActions.LoadProduct());
  }

  /*{
      catSocialNetwork: string,
      data: string
    }*/
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
      formData.append('subDirectory', 'empresa-geolocalizacion');
      console.log(formData.get('files'));

      this.dirServ.imageUpload(formData).subscribe(
        (res) => {
          //  this.url = `${this.baseUrl}/files/${this.auth.getUserKey()}/geolocalizacion_empresa/${(res as any).message.substring(1, ((res as any).message).length - 1)}`
          console.log((res as any).message);
         let imge = (res as any).message;
         let imarl = imge.slice(1, -1);
          this.url = `${this.baseUrl}/${imarl}`;
          console.log(this.url);



          this.sub = 'geolocalizacion_empresa';
        },
        (err) => {
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
      formData.append('subDirectory', 'empresa-geolocalizacion');
      console.log(formData.get('file'));
      console.log(formData.get('empresaPath'));

      this.dirServ.imageUpload(formData).subscribe(
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
    }
    else{
      this.textImage2 = true;
    }
  }

  }
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
      formData.append('subDirectory', 'empresa-geolocalizacion');
      console.log(formData.get('file'));
      console.log(formData.get('empresaPath'));

      this.dirServ.imageUpload(formData).subscribe(
        (res) => {
          let imge = (res as any).message;
          let imarl = imge.slice(1, -1);
           this.url3 = `${this.baseUrl}/${imarl}`;
           console.log(this.url3);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    else{

      this.textImage3 = true;
  }
  }

  }
  getidOrganismo() {
    this.dirServ.getClaveActualizacion(this.auth.getUserKey()).subscribe(
      (res) => {
        const idOrganismo = (res as any).data.datosConsulta.idOrganismo;
        const idTipoOrganismo = (res as any).data.idTipoOrganismo;
        console.log(res);
        // console.log(idTipoOrganismo);
        this.dirServ
          .getDatosOrganismoPlataforma(idOrganismo, idTipoOrganismo)
          .subscribe(

            (res) => {
              console.log(res);
              // this.claveActividad = (res as any).data.actividad.clave;
              this.empresas = res as any;
              this.nombreEmpresa = (res as any).organismo.denominacion;
              this.tipo = (res as any).tipoOrganismo.nombre;
              this.direccion = (res as any).organismo.domicilio;

              //this.referencia = (res as any).data.organismo.domicilio.referencia;
              //this.latitud = (res as any).data.organismo.domicilio.latitud;
              //this.longitud = (res as any).data.organismo.domicilio.longitud;
              this.claveActividad = (res as any).organismo.claveActividad;



              this.postForm = this.fb.group({
                empresa: [this.nombreEmpresa],
                claveActividad: [this.claveActividad],
                tipo: [this.tipo],
                direccion: [this.direccion],
                referencia: '',
              });

              this.dirServ
              .getLatLong(this.direccion)
              .subscribe(
                (res) => {
                  this.latitud = (res as any).results[0].geometry.location.lat;
                  this.longitud = (res as any).results[0].geometry.location.lng;
                  console.log(this.latitud);
                  console.log(this.longitud);

                  this.center = {
                    lat: this.latitud,
                    lng: this.longitud,
                  };
                  this.position = {
                    lat: this.latitud,
                    lng: this.longitud,
                  };

                },

                (err) => {
                  // console.log(err);
                }
              );
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
  create() {
    window.open('http://sistemas.inaes.gob.mx/directorioEESS/', '_blank'); // set endpoint for creation
  }
  submit() {
    if (!this.postForm) {
      return;
    }

    this.store.dispatch(
      ProductActions.setNameEnterprise({
        nameEnterprise: this.postForm.value.empresa,
      })
    );

    let imageDataW = [
      {
        route: this.url,
      },
      {
        route: this.url2,
      },
      {
        route: this.url3,
      },
    ];
    this.store.dispatch(
      ProductActions.SetAddressPictures({ addressPictures: imageDataW })
    );
    console.log(imageDataW);
    this.store.dispatch(
      ProductActions.SetLatLong({
        lat: this.latitud,
        long: this.longitud,
        reference: this.postForm.value.referencia,
      })
    );
    this.formStore.dispatch(
      FormActions.SetRegistrationStep({ step: 'StepTree' })
    );
    this.router.navigateByUrl('/registro/bienes-y-servicios');
    //// console.log(this.postForm.value);
  }
}
