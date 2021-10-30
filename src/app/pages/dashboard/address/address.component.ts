import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DirectoryService } from '../../../services/directory.service';
@Component({
  selector: 'ess-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  constructor(private auth: AuthService, private fb: FormBuilder, private dirServ: DirectoryService,) { }
  postForm: FormGroup;
  public imagePath;
  imgURL: any;
  public message: string;
  lat = 0;
  lng = 0;
  zoom = 8;
  center = { lat: 0, lng: 0 }
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
  ngOnInit() {
    this.postForm = this.fb.group({
      empresa: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      referencia: ['', [Validators.required]],
      img1: [null],
      img2: [null],
      img3: [null],
    });
    //this.getDatosOrganismoPlataforma("815", 12);
    this.getidOrganismo();
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }
  onSelectFile2(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url2 = event.target.result;
      }
    }
  }
  onSelectFile3(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url3 = event.target.result;
      }
    }
  }
  getidOrganismo(){
    this.dirServ.getClaveActualizacion( this.auth.getUserKey() )
  .subscribe(res => {
    const  idOrganismo  = (res as any).data.datosConsulta.idOrganismo;
    const  idTipoOrganismo  = (res as any).data.idTipoOrganismo;
    // console.log(idOrganismo);
    // console.log(idTipoOrganismo);
      this.dirServ.getDatosOrganismoPlataforma(idOrganismo, idTipoOrganismo).subscribe(
        res => {
          this.empresas = (res as any);
          this.nombreEmpresa = (res as any).organismo.denominacion;
          this.tipo = (res as any).tipoOrganismo.nombre;
          this.direccion = (res as any).organismo.domicilio.direccion;
          // this.referencia = (res as any).data.organismo.domicilio.referencia;
          // this.latitud = (res as any).data.organismo.domicilio.latitud;
          // this.longitud = (res as any).data.organismo.domicilio.longitud;
          // console.log(res);
          this.center = { lat: this.latitud, lng: this.longitud }
          this.postForm = this.fb.group({
            empresa: [this.nombreEmpresa],
            tipo: [this.tipo],
            direccion: [this.direccion],
            referencia: [''],
          });
        },
        err => {
          // console.log(err);
        }
      );
  },
    err => {
      // console.log(err)
    });
  }
  create() {
    window.open("http://sistemas.inaes.gob.mx/directorioEESS/", "_blank"); // set endpoint for creation
  }
  submit() {
    if (!this.postForm) {
      return;
    }
    //// console.log(this.postForm.value);
  }
}
