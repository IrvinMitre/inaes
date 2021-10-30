import { DirectoryService } from './../../../services/directory.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnterpriseInterface } from '../../../models/productRequest.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ess-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss'],
})

export class HomeDashboardComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private direcServ: DirectoryService,
    private fb: FormBuilder
  ) {}

	baseUrl: string = environment.ipUrl

  name: any;
  texto: String;
  urlLogo: string;
  urlCover: string;
  key: string;
  isShow = false;
  isShow1 = true;
  eIsShow = false;
  eIsShow1 = true;
  postForm: FormGroup;
  postForm1: FormGroup;
  enterpriseData: EnterpriseInterface;

  ngOnInit() {
    this.getEnterPrise(this.auth.getUserKey());
    this.getName();
    //console.log(this.auth.getUserKey());
    this.postForm = this.fb.group({});

  }

    getEnterPrise(x) {
      this.direcServ.getEnterprise(x).subscribe(
        (res) => {
          this.enterpriseData = res as EnterpriseInterface;
          this.urlLogo = this.enterpriseData.identityPictures[0].route;
          this.urlCover = this.enterpriseData.identityPictures[1].route;
          console.log(this.enterpriseData.identityPictures[1].route);
          this.postForm1 = this.fb.group({
            descrip: [this.enterpriseData.shortDescription, [Validators.required]],
          });
        },
        (err) => {
           console.log(err);
        }
      );

  }

  async onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const formData = new FormData();
      formData.append('files', event.target.files[0]);
      formData.append('directory', this.auth.getUserKey());
      formData.append('subDirectory', 'empresa-perfil');
      await this.direcServ.imageUpload(formData).subscribe(
        (res) => {
          let imge = (res as any).message;
          let imarl = imge.slice(1, -1);
          console.log(imarl);
          this.enterpriseData.identityPictures[1].route = `${this.baseUrl}/${imarl}`;
          this.urlCover =`${this.baseUrl}/${imarl}`;
           console.log(this.urlCover);

         // console.log(this.enterpriseData);
          //this.urlCover = this.enterpriseData.identityPictures[1].route;
          this.direcServ.updateProfileData(this.enterpriseData, this.enterpriseData.socialEnterpriseKey).subscribe(
            (res) => {
              // console.log(res);
            },
            (err) => {
              console.log(err);
            }
          );
        },
        (err) => {
          // console.log(err);
        }
      );
      await this.getEnterPrise(this.auth.getUserKey());
    }
  }

  async onSelectFile2(event) {
    if (event.target.files && event.target.files[0]) {
      const formData = new FormData();
      formData.append('files', event.target.files[0]);
      formData.append('directory', this.auth.getUserKey());
      formData.append('subDirectory', 'empresa-perfil');
      console.log(formData);
      await this.direcServ.imageUpload(formData).subscribe(
        (res) => {
          let imge = (res as any).message;
          let imarl = imge.slice(1, -1);
          console.log(imarl);
          this.enterpriseData.identityPictures[0].route = `${this.baseUrl}/${imarl}`;
          this.urlLogo =`${this.baseUrl}/${imarl}`;
          this.direcServ.updateProfileData(this.enterpriseData, this.enterpriseData.socialEnterpriseKey).subscribe(
            (res) => {
              console.log(res);
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
      await this.getEnterPrise(this.auth.getUserKey());
    }
  }

  toggleDisplay1() {
    this.isShow = !this.isShow;
    this.isShow1 = !this.isShow1;
  }
  toggleDisplay() {
    this.eIsShow = !this.eIsShow;
    this.eIsShow1 = !this.eIsShow1;
  }
  submit() {
    this.toggleDisplay();
  }

  submit1() {
    this.enterpriseData.shortDescription = this.postForm1.value.descrip;
    this.toggleDisplay1();
    this.direcServ.updateProfileData(this.enterpriseData, this.enterpriseData.socialEnterpriseKey).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  submit2() {

  }

  getName() {
    this.direcServ.getClaveActualizacion(this.auth.getUserKey()).subscribe(
      (res) => {
        const idOrganismo = (res as any).data.datosConsulta.idOrganismo;
        const idTipoOrganismo = (res as any).data.idTipoOrganismo;
        this.direcServ
          .getDatosOrganismoPlataforma(idOrganismo, idTipoOrganismo)
          .subscribe(
            (res) => {
              this.name = (res as any).organismo.denominacion;
               console.log(res);
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
  }
}
