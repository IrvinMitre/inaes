
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DirectoryService } from './../../../services/directory.service';
import {EnterpriseInterface, EnterpriseModel } from '../../../models/productRequest.model';
@Component({
  selector: 'ess-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  constructor(private fb: FormBuilder, private auth: AuthService, private dirServ: DirectoryService) { }

  hide = true;
  info: any;
  enterpriseData: EnterpriseInterface;
  postForm = this.fb.group({
    correo: ['', [Validators.required]],
    facebook: [''],
    insta: [''],
    red: [''],
    telefono: ['', [Validators.required]],
    telefonoW: [''],

  });

  ngOnInit() {

   this.getContact();


  }

  async getContact() {
    await  this.dirServ.getEnterprise(this.auth.getUserKey()).subscribe(
      res => {
        this.enterpriseData = (res as EnterpriseInterface);
        // console.log(this.enterpriseData);

        this.postForm.setValue({
          correo: this.enterpriseData.contact.email,
          facebook: this.enterpriseData.contact.facebook,
          insta: this.enterpriseData.contact.instagram,
          red: this.enterpriseData.contact.website,
          telefono: this.enterpriseData.contact.localphone,
          telefonoW: this.enterpriseData.contact.whatsapp,
        });
        console.log(this.enterpriseData);
      },
      err => {
        // console.log(err);
      }
    );
  }



  submit() {
    if (!this.postForm.valid) {
      return;
    }
    console.log(this.enterpriseData)
    this.enterpriseData.contact = {
      "website": this.postForm.value.red,
      "email": this.postForm.value.correo,
      "facebook": this.postForm.value.facebook,
      "instagram": this.postForm.value.insta,
      "localphone": this.postForm.value.telefono,
      "whatsapp": this.postForm.value.telefonoW,
    }

    this.dirServ.updateProfileData(this.enterpriseData, this.enterpriseData.socialEnterpriseKey)
    .subscribe(res => {
      console.log(res);
    },
      err => {
        console.log(err);
      })

}

}





