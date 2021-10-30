import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from './../../../../validators/validators';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { DirectoryService } from './../../../services/directory.service';
import {
  EnterpriseInterface,
  EnterpriseModel,
} from '../../../models/productRequest.model';

interface users  {
  _id: string,
  email: string,
  email_verified_at: string,
  enterpriseKey: string,
  password: string,
  provider: string,
  role: string,
  timestamps: string,
  user_img: string
}


@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss'],
})
export class EditPasswordComponent implements OnInit {
  hide = true;
  hide2 = true;
  enterpriseData: EnterpriseInterface;
  error= false;
  user: users;

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

     //   console.log(this.enterpriseData);
      },
      (err) => {
        // console.log(err);
      }
    );
  }
  openDialog() {
    const dialogRef = this.dialog.open(ModalDialog2);
  }
  recupe() {
    const dialogRef = this.dialog.open(ModalDialog1);
  }
  submit() {
    if (!this.postForm.valid) {
      return;
    }
    this.auth.getUser(this.enterpriseData.admin.email).subscribe(
      (res) => {
        this.user = res as users;

        if(this.postForm.value.contrasena === this.user.password){
          this.user.password = this.postForm.value.Nucontrasena;
        //  console.log(this.user);
          this.auth.patchUser(this.enterpriseData.admin.email, this.user).subscribe(
            (res) => {
             // console.log(res);
            },
            (err) => {
        //      console.log(err);
            }
          )


        }
        else{
          console.log('contraseña incorrecta')
          this.error = true;
              }
      },
      (err) => {
        console.log(err);
      }

    )

   /* if (this.postForm.value.contrasena === this.enterpriseData.admin.password) {
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
   */
  }
}

@Component({
  selector: 'dialog-c',
  templateUrl: 'modal.html',
})
export class ModalDialog2 {}

@Component({
  selector: 'dialog-password',
  templateUrl: 'modalOlvido.html',

})
export class ModalDialog1 {
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
