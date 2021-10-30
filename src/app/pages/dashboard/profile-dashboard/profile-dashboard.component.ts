import { AuthService } from 'src/app/services/auth.service';
import { DirectoryService } from './../../../services/directory.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { State, Store } from '@ngrx/store';
import {
  EnterpriseInterface,
  EnterpriseModel,
} from '../../../models/productRequest.model';
@Component({
  selector: 'ess-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss'],
})
export class ProfileDashboardComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dirServ: DirectoryService,
    private auth: AuthService
  ) {}
  hide = true;
  info: any;
  enterpriseData: EnterpriseInterface;
  contrasena: any;
  postForm = this.fb.group({
    name: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    correo: ['', [Validators.required]],
    movil: ['', [Validators.required]],
  });
  ngOnInit() {
    this.getContact();
  }
  openDialog() {
    const dialogRef = this.dialog.open(ModalDialog4);
  }

  async getContact() {
    await this.dirServ.getEnterprise(this.auth.getUserKey()).subscribe(
      (res) => {
        this.enterpriseData = res as EnterpriseInterface;
        this.postForm.setValue({
          name: this.enterpriseData.admin.firstname,
          apellido: this.enterpriseData.admin.lastname,
          correo: this.enterpriseData.admin.email,
          movil: this.enterpriseData.admin.movil,
        });
        console.log(this.enterpriseData);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  submit() {
    if (!this.postForm.valid) {
      return;
    }
    console.log(this.enterpriseData);

    this.enterpriseData.admin = {
      firstname: this.postForm.value.name,
      lastname: this.postForm.value.apellido,
      email: this.postForm.value.correo,
      movil: this.postForm.value.movil,
      password: this.contrasena,
    };

    this.dirServ.updateProfileData(this.enterpriseData, this.enterpriseData.socialEnterpriseKey).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'modal.html',
})
export class ModalDialog4 {}
