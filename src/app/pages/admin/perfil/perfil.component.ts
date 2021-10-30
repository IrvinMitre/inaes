import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

import {} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  NgForm,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
//Variable environment
import { environment } from '../../../../environments/environment';
//Mailchimp
import { NewAdminService } from '../../..//services/mailchimp/new-admin.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    public aut: AuthService,
    private httpClient: HttpClient,
    private NewAdminService: NewAdminService
  ) {}

  hide = true;
  acount = false;
  postForm: FormGroup;
  rol: string;
  tem: any;
  rool: string;

  error: String = '';
  correo: string;
  emailValidator: string =
    '^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$';
  passwordValidator: string =
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,12}';

  ngOnInit(): void {
    this.postForm = this.fb.group({
      categoria: [' ', Validators.required],

      correo: [
        '',
        [Validators.required, Validators.pattern(this.emailValidator)],
      ],
      contrasena: [
        '',
        [Validators.required, Validators.pattern(this.passwordValidator)],
      ],
      confcontrasena: [
        '',
        [Validators.required, Validators.pattern(this.passwordValidator)],
      ],
    });
  }

  check(e) {
    this.tem = e;
    console.log(this.tem);
  }
  openDialog() {
    const dialogRef = this.dialog.open(ModalDialog12, {
      height: 'auto',
      maxHeight: '80vh',
      width: '630px',
    });
  }

  submit() {


    this.aut
      .loginWithEmailadmins(
        this.postForm.value.correo,
        this.postForm.value.contrasena, this.postForm.value.categoria
      )
      .subscribe(
        (res) => {

          this.registerMailChimpAdmin(this.postForm.value.correo);
        //  this.openDialog();
        this.router.navigate(['/usuarios'])
        },
        (err) => {
          this.error = 'Tu correo ya forma parte de nuestra plataforma.';
        }
      );
  }

  registerMailChimpAdmin(correo) {
    this.NewAdminService.subscribeToList(correo).subscribe(
      (res) => {},
      (err) => {}
    );
  }
}

@Component({
  selector: 'dialog-pedido',
  templateUrl: 'modal.html',
  styleUrls: ['./perfil.component.scss'],
})
export class ModalDialog12 {
  constructor(public dialog: MatDialog) {}

  closeDialog() {
    const dialogRef = this.dialog.closeAll();
  }
}
