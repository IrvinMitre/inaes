import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

import { } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
//Variable environment
import { environment } from '../../../environments/environment';
//Mailchimp
import { NewAdminService } from '../..//services/mailchimp/new-admin.service';

@Component({
	selector: 'app-register-admin',
	templateUrl: './register-admin.component.html',
	styleUrls: ['./register-admin.component.scss']
})
export class RegisterAdminComponent implements OnInit {


	constructor(
		private router: Router,
		public dialog: MatDialog,
		private fb: FormBuilder,
		public aut: AuthService,
		private httpClient: HttpClient,
		private NewAdminService: NewAdminService,
	) { }

	hide = true;
	acount = false;
	postForm: FormGroup;
	postForm1: FormGroup;
	error: String = "";
  correo: string;
	emailValidator: string = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$';
	passwordValidator: string = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,12}';



	ngOnInit(): void {



		this.postForm1 = this.fb.group(
			{
				correo1: ['',
					[
						Validators.required,
						Validators.pattern(this.emailValidator)
					]
				],
				contrasena1: ['',
					[
						Validators.required
					]
				],
			}
		);
    }

	//Registro de nuevo Admin


	//admin
	submit1() {
		this.aut.loginWithEmail(
		this.postForm1.value.correo1,
		this.postForm1.value.contrasena1).subscribe(
			res => {
				if ((res as any).role === "super_admin") {

					this.correo = this.postForm1.value.correo1;
					this.router.navigateByUrl("/admin/" + this.correo)
				}
				else{
					this.router.navigateByUrl("/home/")
				}
			},
			err => {
				this.error = "Correo o contraseña incorrectos."
			}
		);
	}

    regist(){
    	this.acount = !this.acount;
    }

}

