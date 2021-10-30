import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from './../../../validators/validators';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { DirectoryService } from './../../services/directory.service';
import {
  EnterpriseInterface,
  EnterpriseModel,
} from '../../models/productRequest.model';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  hide = true;
  hide2 = true;
  enterpriseData: EnterpriseInterface;
  error= false;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private auth: AuthService,
    private dirServ: DirectoryService
  ) {}
  postForm = this.fb.group({
    contrasena: [
      '',
      [
        Validators.required,
        CustomValidator.validatePaswword,
        Validators.maxLength(12),
        Validators.minLength(8),
      ],
    ],
    Nucontrasena: [
      '',
      [
        Validators.required,
        CustomValidator.validatePaswword,
        Validators.maxLength(12),
        Validators.minLength(8),
      ],
    ],
    NuCcontrasena: [
      '',
      [
        Validators.required,
        CustomValidator.validatePaswword,
        Validators.maxLength(12),
        Validators.minLength(8),
      ],
    ],
    term: [false, [Validators.requiredTrue]],
  });
  ngOnInit(): void {
    this.getContact();
  }
  async getContact() {
    await this.dirServ.getEnterprise(this.auth.getUserKey()).subscribe(
      (res) => {
        this.enterpriseData = res as EnterpriseInterface;
        // console.log(this.enterpriseData);

        console.log(this.enterpriseData);
      },
      (err) => {
        // console.log(err);
      }
    );
  }
  openDialog() {
    const dialogRef = this.dialog.open(ModalDialog12);
  }
  recupe() {
    const dialogRef = this.dialog.open(ModalDialog13);
  }

  submit() {
    if (!this.postForm.valid) {
      return;
    }
    if (this.postForm.value.contrasena === this.enterpriseData.admin.password) {
      this.enterpriseData.admin = {
        firstname: this.enterpriseData.admin.firstname,
        lastname: this.enterpriseData.admin.lastname,
        email: this.enterpriseData.admin.email,
        movil: this.enterpriseData.admin.movil,
        password: this.postForm.value.Nucontrasena,
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
    else{
console.log('contraseña incorrecta')
this.error = true;
    }
  }

}

@Component({
  selector: 'dialog-c',
  templateUrl: 'modal.html',
  styleUrls: ['./new-password.component.scss']
})
export class ModalDialog12 {}

@Component({
  selector: 'dialog-password',
  templateUrl: 'modalCorreo.html',
  styleUrls: ['./new-password.component.scss']

})
export class ModalDialog13 {
  constructor( public dialog: MatDialog, private fb1: FormBuilder, public aut: AuthService) { }
  hide = true;
  postForm1: FormGroup;
  hide2 = true;

  ngOnInit(): void {
    this.postForm1 = this.fb1.group({
      correo: ['', [Validators.required, Validators.email]],
  });
}

  closeDialog() {
    const dialogRef = this.dialog.closeAll();

  }

  submit(){
    this.closeDialog();
  }
 }
