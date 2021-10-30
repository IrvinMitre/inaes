import { Component, OnInit } from '@angular/core';
import { ServiceInterface } from './../../models/service.model';
import { ProductService } from './../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DirectoryService } from './../../services/directory.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.scss'],
})
export class ServiceEditComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private router1: ActivatedRoute,
    private productServ: ProductService,
    private dirServ: DirectoryService
  ) {}

  baseUrl: string = environment.ipUrl 

  catalog: any[];
  categories: any[];
  serviceId = this.router1.snapshot.params.id;
  serviceData: ServiceInterface;
  url = '../../../assets/background-upload-image.jpg';
  url2 = '../../../assets/background-upload-image.jpg';
  url3 = '../../../assets/background-upload-image.jpg';
  url4 = '../../../assets/background-upload-image.jpg';
  url5 = '../../../assets/background-upload-image.jpg';
  trueUpload = false;
  trueUpload2 = false;
  textImage1 = false;
  textImage2 = false;
  textImage3 = false;
  textImage4 = false;
  textImage5 = false;


  postForm = this.fb.group({
    ecoturismo: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    recomen: ['', [Validators.required]],
    rent: [false],
    rest: [false],
    wifi: [false],
    tv: [false],
    air: [false],
    cale: [false],
    renta: [false],
    camp: [false],
    tours: [false],
    cert1: [false],
    cert2: [false],
    pclave1: ['', [Validators.required]],
    textoAlternativo: [''],
    textoAlternativo2: [''],
    textoAlternativo3: [''],
    efectivo: [false],
    transferencia: [false],
    tarjeta: [false],
    codi: [false],
    paypal: [false],
    mercado: [false],
    pago: [false],
  });
  ngOnInit(): void {
    // console.log(this.serviceId);
    //console.log(this.auth.getUserKey());
    this.getService();

    this.getCategoriesCatalog();
  }

  getService() {
    this.dirServ
      .getOnlyService(this.serviceId, this.auth.getUserKey())
      .subscribe(
        (res) => {
          this.serviceData = res as ServiceInterface;

          console.log(this.serviceData);
          this.postForm.setValue({
            ecoturismo: this.serviceData.categories[0].catService,
            nombre: this.serviceData.whatIsIt,
            direccion: this.serviceData.whereItIs,
            descripcion: this.serviceData.haveFun,
            recomen: this.serviceData.additionalAttractions,
            rent: false,
            rest: false,
            wifi: false,
            tv: false,
            air: false,
            cale: false,
            renta: false,
            camp: false,
            tours: false,
            cert1: false,
            cert2: false,
            pclave1: this.serviceData.tags[0].tag,
            textoAlternativo: this.serviceData.pictures[0].description,
            textoAlternativo2: this.serviceData.pictures[1].description,
            textoAlternativo3: this.serviceData.pictures[2].description,
            efectivo: false,
            transferencia: false,
            tarjeta: false,
            codi: false,
            paypal: false,
            mercado: false,
            pago: false,
          });
          for (
            let i = 0;
            i < Object.keys(this.serviceData.features).length;
            i++
          ) {
            // console.log(this.productData.features[i].type);
            switch (this.serviceData.features[i].type) {
              case 'Marca registrada': {
                this.postForm.controls.cert1.setValue(true);
                break;
              }
              case 'Denominación de origen': {
                this.postForm.controls.cert2.setValue(true);
                break;
              }
            }
          }
          for (
            let i = 0;
            i < Object.keys(this.serviceData.features).length;
            i++
          ) {
            switch (this.serviceData.features[i].pictureRoute) {
              case this.serviceData.features[0].pictureRoute: {
                if (this.serviceData.features[0].pictureRoute == '')
                  this.url = '../../../assets/background-upload-image.jpg';
                else {
                  this.url = this.serviceData.features[0].pictureRoute;
                }
                break;
              }
              case this.serviceData.features[1].pictureRoute: {
                if (this.serviceData.features[1].pictureRoute == '')
                  this.url2 = '../../../assets/background-upload-image.jpg';
                else {
                  this.url2 = this.serviceData.features[1].pictureRoute;
                }
                break;
              }

              default:
            }
          }
          for (
            let i = 0;
            i < Object.keys(this.serviceData.pictures).length;
            i++
          ) {
            //console.log(this.productData.pictures[i]);
            switch (this.serviceData.pictures[i].route) {
              case this.serviceData.pictures[0].route: {
                if (this.serviceData.pictures[0].route == '')
                  this.url3 = '../../../assets/background-upload-image.jpg';
                else {
                  this.url3 = this.serviceData.pictures[0].route;
                }
                break;
              }
              case this.serviceData.pictures[1].route: {
                if (this.serviceData.pictures[1].route == '')
                  this.url4 = '../../../assets/background-upload-image.jpg';
                else {
                  this.url4 = this.serviceData.pictures[1].route;
                }
                break;
              }
              case this.serviceData.pictures[2].route: {
                if (this.serviceData.pictures[2].route == '')
                  this.url5 = '../../../assets/background-upload-image.jpg';
                else {
                  this.url5 = this.serviceData.pictures[2].route;
                }
                break;
              }
              default:
            }
          }
          for (
            let i = 0;
            i < Object.keys(this.serviceData.paymentMethods).length;
            i++
          ) {
            switch (this.serviceData.paymentMethods[i].catPayment) {
              case 'Mercado Pago': {
                this.postForm.controls.mercado.setValue(true);
                break;
              }
              case 'Efectivo': {
                this.postForm.controls.efectivo.setValue(true);
                break;
              }
              case 'Transferencia': {
                this.postForm.controls.transferencia.setValue(true);
                break;
              }
              case 'Tarjeta': {
                this.postForm.controls.tarjeta.setValue(true);
                break;
              }
              case 'Codi': {
                this.postForm.controls.codi.setValue(true);
                break;
              }
              case 'Paypal': {
                this.postForm.controls.paypal.setValue(true);
                break;
              }
              case 'Pago contra entrega': {
                this.postForm.controls.pago.setValue(true);
                break;
              }
            }
          }
          for (
            let i = 0;
            i < Object.keys(this.serviceData.especificServices).length;
            i++
          ) {
            //console.log(this.productData.pictures[i]);
            switch (this.serviceData.especificServices[i].catEspecificService) {
              case 'Renta de Habitaciones': {
                this.postForm.controls.rent.setValue(true);
                break;
              }
              case 'Restaurante': {
                this.postForm.controls.rest.setValue(true);
                break;
              }
              case 'Wifi': {
                this.postForm.controls.wifi.setValue(true);
                break;
              }
              case 'TV': {
                this.postForm.controls.tv.setValue(true);
                break;
              }
              case 'Aire Acondicionado': {
                this.postForm.controls.air.setValue(true);
                break;
              }
              case 'Calefaccion': {
                this.postForm.controls.cale.setValue(true);
                break;
              }
              case 'Renta de Equipo': {
                this.postForm.controls.renta.setValue(true);
                break;
              }
              case 'Camping': {
                this.postForm.controls.camp.setValue(true);
                break;
              }
              case 'Tour Personalizado': {
                this.postForm.controls.tours.setValue(true);
                break;
              }
            }
          }

          this.url3 = this.serviceData.pictures[0].route;
          this.url4 = this.serviceData.pictures[1].route;
          this.url5 = this.serviceData.pictures[2].route;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  //Sectors
  getCategoriesCatalog() {
    this.productServ.getCategoriesCatalog().subscribe(
      (res) => {
        //   console.log(res);
        this.catalog = (res as any).filter(
          (catalog) => catalog.catalogId === 'catService'
        );
        //     console.log(this.catalog);
        this.catalog[0].services.map((service) => service.service);
        this.categories = this.catalog[0].services.map(
          (service) => service.service
        );
        //     console.log(this.catalog[0].services.map(service => service.service));
      },
      (err) => {
        // console.log(err);
      }
    );
  }

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
      formData.append('subDirectory', 'producto-certificacion');

      this.dirServ.imageUpload(formData).subscribe(
        (res) => {
          let imge = (res as any).message;
          let imarl = imge.slice(1, -1);
           this.url2 = `${this.baseUrl}/${imarl}`;
           console.log(this.url);
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
      formData.append('subDirectory', 'producto-fotografia');

      this.dirServ.imageUpload(formData).subscribe(
        res => {
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
  onSelectFile4(event) {
    console.log('sel2');
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
      formData.append('subDirectory', 'producto-fotografia');

      this.dirServ.imageUpload(formData).subscribe(
        res => {
          let imge = (res as any).message;
          let imarl = imge.slice(1, -1);
           this.url4 = `${this.baseUrl}/${imarl}`;
           console.log(this.url4);
        },
        (err) => {
          console.log(err);
        }
      );
      }
      else{

        this.textImage4 = true;
    }
    }
  }
  onSelectFile5(event) {
    console.log('sel3');
    if (event.target.files && event.target.files[0]) {
      if(event.target.files[0].size < 200000){
        this.textImage5 = false;
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
           this.url5 = `${this.baseUrl}/${imarl}`;
           console.log(this.url5);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    else{

      this.textImage5 = true;
  }
    }
  }

  submit() {
    //Categoria
    const dispatchData = [
      {
        catService: this.postForm.value.ecoturismo,
      },
    ];
    this.serviceData.categories = dispatchData;
    //Palabra clave
    const clave = [
      {
        tag: this.postForm.value.pclave1,
      },
    ];
    this.serviceData.tags = clave;
    //fotografia
    const fotografia = [
      {
        route: this.url3,
        description: this.postForm.value.textoAlternativo,
      },
      {
        route: this.url4,
        description: this.postForm.value.textoAlternativo2,
      },
      {
        route: this.url5,
        description: this.postForm.value.textoAlternativo3,
      },
    ];
    this.serviceData.pictures = fotografia;
    //descripcion
    this.serviceData.whatIsIt = this.postForm.value.nombre;
    this.serviceData.whereItIs = this.postForm.value.direccion;
    this.serviceData.haveFun = this.postForm.value.descripcion;
    this.serviceData.additionalAttractions = this.postForm.value.additionalAttractions;
    //Certificados

    const features = [];

    if (this.postForm.value.cert1)
      features.push({
        type: 'Marca registrada',
        pictureRoute: this.url,
      });

    if (this.postForm.value.cert2)
      features.push({
        type: 'Denominación de origen',
        pictureRoute: this.url2,
      });
    this.serviceData.features = features;
    let pagoo = [
      {
        catPayment: this.postForm.value.efectivo ? 'Efectivo' : null,
      },
      {
        catPayment: this.postForm.value.transferencia ? 'Transferencia' : null,
      },
      {
        catPayment: this.postForm.value.tarjeta ? 'Tarjeta' : null,
      },
      {
        catPayment: this.postForm.value.codi ? 'Codi' : null,
      },
      {
        catPayment: this.postForm.value.paypal ? 'Paypal' : null,
      },
      {
        catPayment: this.postForm.value.mercado ? 'Mercado Pago' : null,
      },
      {
        catPayment: this.postForm.value.pago ? 'Pago contra entrega' : null,
      },
    ];
    this.serviceData.paymentMethods = pagoo;
    let espe = [
      {
        catEspecificService: this.postForm.value.rent
          ? 'Renta de Habitaciones'
          : null,
      },
      {
        catEspecificService: this.postForm.value.rest ? 'Restaurante' : null,
      },
      {
        catEspecificService: this.postForm.value.wifi ? 'Wifi' : null,
      },
      {
        catEspecificService: this.postForm.value.tv ? 'TV' : null,
      },
      {
        catEspecificService: this.postForm.value.air
          ? 'Aire Acondicionado'
          : null,
      },
      {
        catEspecificService: this.postForm.value.cale ? 'Calefaccion' : null,
      },
      {
        catEspecificService: this.postForm.value.renta
          ? 'Renta de Equipo'
          : null,
      },
      {
        catEspecificService: this.postForm.value.camp ? 'Camping' : null,
      },
      {
        catEspecificService: this.postForm.value.tours
          ? 'Tour Personalizado'
          : null,
      },
    ];
    this.serviceData.especificServices = espe;
    console.log(this.serviceData);
    this.productServ
      .pathService(
        this.serviceData,
        this.serviceData.socialEnterpriseKey,
        this.serviceId
      )
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
      this.router.navigateByUrl('/dashboard/servicios');
  }
}
