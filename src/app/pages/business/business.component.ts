import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { DirectoryService } from './../../services/directory.service';
import { Component, OnInit } from '@angular/core';

export interface Contact {
  email: string,
  facebook: string,
  instagram: string,
  localphone: string,
  website: string,
  whatsapp: string
}
@Component({
  selector: 'ess-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

  constructor(private auth: AuthService, private direcServ: DirectoryService, private producServ: ProductService, private route: ActivatedRoute) { }

  idEmpresa = this.route.snapshot.params.id;
  enterpriseData: any;
  socialData: any;
  productData: any[];
  name: any;
  idOrganismo: any;
  idTipoOrganismo: any;
  urlLogo: string;
  urlCover: string;
  filtros = true;
  like = false;
  shortDescription: string;

  changeLike(){
    this.like = !this.like;
      }

  ngOnInit() {
    console.log(this.idEmpresa);
    this.direcServ.getEnterprise(this.idEmpresa).subscribe(
      res => {

        this.urlLogo = (res as any).identityPictures[1].route;
        this.urlCover = (res as any).identityPictures[0].route;
        this.shortDescription = (res as any).shortDescription;
         console.log(this.shortDescription);
      },
      err => {
        // console.log(err);
      }
    );
    this.getName();

    this.direcServ.getProducts().subscribe(
      res =>{
        this.productData = (res as any);
        // console.log(this.productData);
      },
      err =>{
        // console.log(err);
      }
    )
    this.producServ.getProduct(this.auth.getUserKey()).subscribe(
      res => {
        this.productData = (res as any);
        console.log(this.productData);
        console.log(this.productData[0].features.pictureRoute);
      },
      err => {
        // console.log(err);
      }
    )

  }
  getName(){
    this.direcServ.getClaveActualizacion(this.idEmpresa).subscribe(
      res => {
        const  idOrganismo  = (res as any).data.datosConsulta.idOrganismo;
        const  idTipoOrganismo  = (res as any).data.idTipoOrganismo;

      this.direcServ.getDatosOrganismoPlataforma(idOrganismo,idTipoOrganismo).subscribe(
        res => {
          this.enterpriseData = (res as any).organismo;
          this.name = (res as any).organismo.denominacion;
          // console.log(this.name);
          console.log(res);
          },
      err => {
        // console.log(err);
      }
    );
      },
      err => {
        // console.log(err);
      }
    );
        this.direcServ.getEnterprise(this.idEmpresa).subscribe(
        res=> {
          this.socialData = (res as any).contact;

        console.log(this.socialData);
        },
        err => {

        }
      )
  }

  getEnterPrise(){

  }
  getProduct(){

  }
  goToLink(url){
    window.open(url, "_blank");
}
}
