import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog.service';
import { } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { CustomValidator } from './../../../../validators/validators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
//Import para mailChimp
import { NewUserService } from '../../../services/mailchimp/new-user.service';
import { NewsletterService } from '../../../services/mailchimp/newsletter.service';
//Imports para el login y logout con FB y Gmail
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { environment } from '../../../../environments/environment';
import { DirectoryService } from '../../../services/directory.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss'],
})

export class NavComponent implements OnInit {

	constructor(
		private router: Router,
		private catalogs: CatalogService,
		private dialog: MatDialog
	) { }

	catalogos: any;
	products: any;
	services: any;
	enterprise: any;
	info: any;
	id: any;
	search: any;


	ngOnInit(): void {
		this.getCatalogs();
	}

	autoSearch($event) {
		this.search = $event.target.value;
		this.catalogs.search($event.target.value).subscribe(
			(res) => {
				console.log(res);
				if ($event.target.value === '') {
					this.products = null;
					this.services = null;
					this.enterprise = null;
				} else {
					this.products = (res as any).products;
					this.services = (res as any).services;
					this.enterprise = (res as any).enterprises;
				}
			},
			(err) => {
				console.log(err);
			}
		);
	}

	getCatalogs() {
		this.catalogs.getCatalogs().subscribe((res: any) => {
			this.catalogos = res;
		});
	}

	openDialog() {
		const dialogRef = this.dialog.open(ModalDialog7, {
			height: 'auto',
			maxHeight: '80vh',
			width: '630px',
		});
	}

	openDialog2() {
		const dialogRef = this.dialog.open(ModalDialog6, {
			height: 'auto',
			maxHeight: '80vh',
			width: '630px',
		});
	}

	openDialog3() {
		const dialogRef = this.dialog.open(ModalDialog9, {
			height: 'auto',
			maxHeight: '80vh',
			width: '630px',
		});
	}

	openDialog4() {
		const dialogRef = this.dialog.open(ModalDialog10, {
			height: 'auto',
			maxHeight: '80vh',
			width: '630px',
		});
	}
}





@Component({
	selector: 'dialog-content',
	templateUrl: 'modalRegis.html',
	styleUrls: ['nav.component.scss'],
})

export class ModalDialog7 {
	constructor(
		private router: Router,
		public dialog: MatDialog,
		private fb: FormBuilder,
		public aut: AuthService,
		private NewUserService: NewUserService,
		private NewsletterService: NewsletterService,
		private authService: SocialAuthService,
		private httpClient: HttpClient
	) { }

	hide = true;
	postForm: FormGroup;
	subscribeData: any = <any>{};
	error: String = "";
	//Inician variables para Login, Register de FB, Gmail
	user: SocialUser;
	loggedIn: boolean;
	GoogleLoginProvider = GoogleLoginProvider;
	email: string;
	password: string;
	loginPassword: string;
	loginEmail: string;
	userLogedInWithEmail: string;
	baseUrl: string = environment.ipUrl
	//Terminan variables para Login, Register de FB, Gmail

	emailValidator: string = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$';
	passwordValidator: string = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,12}';
	
	ngOnInit(): void {

		this.postForm = this.fb.group({
			correo: ['', [Validators.required, Validators.pattern(this.emailValidator)]],
			contrasena: ['', [Validators.required, Validators.pattern(this.passwordValidator)]],
			confcontrasena: ['', [Validators.required, Validators.pattern(this.passwordValidator)]],
			term: [false, [Validators.requiredTrue]],
			term1: [false, [Validators.requiredTrue]]
		});

		this.authService.authState.subscribe((user) => {
			this.user = user;
			this.loggedIn = (user != null);
			this.userLogedInWithEmail = localStorage.getItem('loginEmail')
		});
	}

	closeDialog() {
		const dialogRef = this.dialog.closeAll()
	}



	submit() {
		this.aut.signInWithEmail(
		this.postForm.value.correo,
		this.postForm.value.contrasena).subscribe(
			res => {
				//Cuando el usuario se registra exitosamente manda a MailChimp el usuario.
				this.registerMailChimpNewUser();
				//Cuando el usuario se registra exitosamente manda a MailChimp el usuario para el newsletter.
				this.registerMailChimpNewsletter();
				//Se cierra el modal de registro
				this.closeDialog();
				//Abrir el modal de Bienvenida.
				this.openDialog4();
			},
			err => {
				this.error = "Tu correo ya forma parte de nuestra plataforma."
			}
		);
		
	}

	//Login y register con Facebook
	async signInWithFB() {
		await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
		const postData = {
			"email": this.user.email,
			"user_img": this.user.photoUrl,
			"provider": this.user.provider,
			"timestamps": new Date(),
			"role": "usuario_cliente",
		}
		this.httpClient.post(this.baseUrl + '/users', postData).subscribe(
			res => {
				//Cuando el usuario se registra exitosamente manda a MailChimp el usuario.
				this.registerMailChimpNewUserProvider();
				//Cuando el usuario se registra exitosamente manda a MailChimp el usuario para el newsletter.
				this.registerMailChimpNewsletterProvider();
				//Se cierra el modal de registro
				this.closeDialog();
				//Abrir el modal de Bienvenida.
				this.openDialog4();
			},
			err =>{
				
			}
		);
	}

	//Login y register con Google
	async signInWithGoogle() {
		await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
		const postData = {
			"email": this.user.email,
			"user_img": this.user.photoUrl,
			"provider": this.user.provider,
			"timestamps": new Date(),
			"role": "usuario_cliente",
		}
		this.httpClient.post(this.baseUrl + '/users', postData).subscribe(
			res => {
				//Cuando el usuario se registra exitosamente manda a MailChimp el usuario.
				this.registerMailChimpNewUserProvider();
				//Cuando el usuario se registra exitosamente manda a MailChimp el usuario para el newsletter.
				this.registerMailChimpNewsletterProvider();
				//Se cierra el modal de registro
				this.closeDialog();
				//Abrir el modal de Bienvenida.
				this.openDialog4();
			},
			err => {

			}
		);
	}

	registerMailChimpNewUser() {
		this.NewUserService.subscribeToList(this.postForm.value.correo).subscribe(
			res => {

			}, err => {

			}
		)
	}

	registerMailChimpNewsletter() {
		this.NewsletterService.subscribeToListWithEmail(this.postForm.value.correo).subscribe(
			res => {

			}, 
			err => {

			}
		)
	}
	
	registerMailChimpNewUserProvider() {
		this.NewUserService.subscribeToList(this.user.email).subscribe(
			res => {

			}, err => {

			}
		)
	}

	registerMailChimpNewsletterProvider() {
		this.NewsletterService.subscribeToListWithEmail(this.user.email).subscribe(
			res => {

			}, 
			err => {

			}
		)
	}

	login() {
		this.closeDialog();
		const dialogRef = this.dialog.open(ModalDialog6, {
			height: 'auto',
			maxHeight: '80vh',
			width: '630px',
		});
	}

	openDialog4() {
		const dialogRef = this.dialog.open(ModalDialog10, {
			height: 'auto',
			maxHeight: '80vh',
			width: '630px',
		});
	}
}








@Component({
	selector: 'dialog-login',
	templateUrl: 'modalLogin.html',
	styleUrls: ['nav.component.scss'],
})

export class ModalDialog6 {

	constructor(
		private router: Router,
		public dialog: MatDialog,
		private fb1: FormBuilder,
		public aut: AuthService,
		private NewUserService: NewUserService,
		private NewsletterService: NewsletterService,
		private authService: SocialAuthService,
		private httpClient: HttpClient
	) { }

	hide = true;
	postForm1: FormGroup;
	id: any;
	error: String = "";
	//Inician variables para Login, Register de FB, Gmail
	user: SocialUser;
	loggedIn: boolean;
	GoogleLoginProvider = GoogleLoginProvider;
	email: string;
	password: string;
	loginPassword: string;
	loginEmail: string;
	userLogedInWithEmail: string;
	baseUrl: string = environment.ipUrl
	//Terminan variables para Login, Register de FB, Gmail
	emailValidator: string = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$';

	ngOnInit(): void {
		this.postForm1 = this.fb1.group({
			correo: ['', [Validators.required, Validators.pattern(this.emailValidator)]],
			contrasena: ['', [Validators.required]],
		});

		this.authService.authState.subscribe((user) => {
			this.user = user;
			this.loggedIn = (user != null);
			this.userLogedInWithEmail = localStorage.getItem('loginEmail')
		});
	}

	submit() {
		this.aut.loginWithEmail(this.postForm1.value.correo, this.postForm1.value.contrasena).subscribe(
			res => {
				this.closeDialog();
				if ((res as any).role === "admin") {
					this.id = (res as any)._id;
					this.router.navigateByUrl("/admin/" + this.id)
				}
			},
			err => {
				this.error = "Correo o contraseña incorrectos."
			}
		);
	}

	//Login y register con Facebook
	async signInWithFB() {
		await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
		const postData = {
			"email": this.user.email,
			"user_img": this.user.photoUrl,
			"provider": this.user.provider,
			"timestamps": new Date(),
			"role": "usuario_cliente",
		}
		this.httpClient.post(this.baseUrl + '/users', postData).subscribe(
			res => {
				//Cuando el usuario se registra exitosamente manda a MailChimp el usuario.
				this.registerMailChimpNewUserProvider();
				//Cuando el usuario se registra exitosamente manda a MailChimp el usuario para el newsletter.
				this.registerMailChimpNewsletterProvider();
				//Se cierra el modal de registro
				this.closeDialog();
			},
			err =>{
				
			}
		);
	}

	//Login y register con Google
	async signInWithGoogle() {
		await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
		const postData = {
			"email": this.user.email,
			"user_img": this.user.photoUrl,
			"provider": this.user.provider,
			"timestamps": new Date(),
			"role": "usuario_cliente",
		}
		this.httpClient.post(this.baseUrl + '/users', postData).subscribe(
			res => {
				//Cuando el usuario se registra exitosamente manda a MailChimp el usuario.
				this.registerMailChimpNewUserProvider();
				//Cuando el usuario se registra exitosamente manda a MailChimp el usuario para el newsletter.
				this.registerMailChimpNewsletterProvider();
				//Se cierra el modal de registro
				this.closeDialog();
			},
			err => {

			}
		);
	}
	registerMailChimpNewUserProvider() {
		this.NewUserService.subscribeToList(this.user.email).subscribe(
			res => {

			}, err => {

			}
		)
	}

	registerMailChimpNewsletterProvider() {
		this.NewsletterService.subscribeToListWithEmail(this.user.email).subscribe(
			res => {

			}, 
			err => {

			}
		)
	}

	signOut(): void {
		this.authService.signOut();
	}

	refreshGoogleToken(): void {
		this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
	}

	closeDialog() {
		const dialogRef = this.dialog.closeAll()
	}

	recupe() {
		this.closeDialog();
		const dialogRef = this.dialog.open(ModalDialog1);
	}

	regis() {
		this.closeDialog();
		const dialogRef = this.dialog.open(ModalDialog7, {
			height: 'auto',
			maxHeight: '80vh',
			width: '630px',
		});
	}

}




@Component({
	selector: 'dialog-login',
	templateUrl: 'modalEmpresa.html',
	styleUrls: ['nav.component.scss'],
})
export class ModalDialog9 {

	constructor(
		private router: Router,
		public dialog: MatDialog,
		private fb1: FormBuilder,
		public aut: AuthService,
		private dirServ: DirectoryService,
		private auth: AuthService,
	) { }

	hide = true;
	postForm1: FormGroup;
	id: any;
	error: String = "";

	emailValidator: string = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$';
	passwordValidator: string = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,12}';
	
	ngOnInit(): void {
		this.postForm1 = this.fb1.group({
			correo: ['', [Validators.required, Validators.pattern(this.emailValidator)]],
			contrasena: ['', [Validators.required, Validators.pattern(this.passwordValidator)]],
		});
	}

	
	closeDialog() {
		const dialogRef = this.dialog.closeAll()
	}

    submit() {
		this.aut.loginWithEmail(this.postForm1.value.correo, this.postForm1.value.contrasena).subscribe(
			res => {
				this.redirectIfUserEnterprise(res);
			},
			err => {
				this.error = "Correo o contraseña incorrectos.";
			}
		);
	}


	redirectIfUserEnterprise(enterpriseKey){

		this.dirServ.getEnterprise(enterpriseKey.enterpriseKey).subscribe(
			(res) => {
				this.closeDialog();
				const { _id } = (res as any) || null;

				if (_id) {
					this.router.navigateByUrl('/dashboard/perfil')
					this.auth.setUserLogged(enterpriseKey.enterpriseKey);
				} 
			},
			(err) => {
				
			}
		);
	}


  




}









@Component({
	selector: 'dialog-password',
	templateUrl: 'modalPassword.html',
	styleUrls: ['nav.component.scss'],
})

export class ModalDialog1 {
	constructor(
		public dialog: MatDialog,
		private fb1: FormBuilder,
		public aut: AuthService
	) { }

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

	submit() {
		this.closeDialog();
	}
}







@Component({
	selector: 'dialog-pedido',
	templateUrl: 'modalPedido.html',
	styleUrls: ['nav.component.scss'],
})

export class ModalDialog10 {

	constructor(
		public dialog: MatDialog,
	) { }


	closeDialog() {
		const dialogRef = this.dialog.closeAll();
	}
}
