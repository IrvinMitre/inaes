import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocialAuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})

export class AuthService {


	constructor(
		private httpClient: HttpClient,
		private authService: SocialAuthService
	) {
		if (localStorage.getItem('socialEnterpriseKey')) this.isLogged = true;
	}


	user: SocialUser;
	loggedIn: boolean;
	GoogleLoginProvider = GoogleLoginProvider;
	email: string;
	password: string;
	loginPassword: string;
	loginEmail: string;
	userLogedInWithEmail: string;
	public isLogged: boolean;
	baseUrl: string = environment.ipUrl;

	ngOnInit() {
		this.authService.authState.subscribe((user) => {
			this.user = user;
			this.loggedIn = user != null;
			this.userLogedInWithEmail = localStorage.getItem('loginEmail');
		});
	}

	isLoggedWithEmail(){
		return this.userLogedInWithEmail = localStorage.getItem('loginEmail');
	}
	setUserLogged(key: string) {
		localStorage.setItem('socialEnterpriseKey', key);
		this.isLogged = true;
	}
  	getAllUsers(){
		return this.httpClient.get(this.baseUrl + '/users');
	}

	deletUser(email: string) {
		return this.httpClient.delete(this.baseUrl + '/users/' + email)
	}

	public getUserKey() {
		return localStorage.getItem('socialEnterpriseKey');
	}
  getUser(correo){
    return this.httpClient.get(this.baseUrl + '/users/'+ correo);
  }
  patchUser(correo, objetoUser){
    return this.httpClient.patch(this.baseUrl + '/users/'+ correo, objetoUser);
  }


	loginWithEmail(loginEmail, loginPassword){
		return this.httpClient.get(this.baseUrl+'/users/login?email='+loginEmail+'&password='+loginPassword);
	}

	loginWithEmailadmin(loginEmail, loginPassword) {

		const postData = {
			"email": loginEmail,
			"password": loginPassword,
			"provider": "CORREO",
			"timestamps": new Date(),
			"role": "admin",
		}

		return this.httpClient.post(this.baseUrl + '/users', postData);
	}

  	loginWithEmailadmins(loginEmail, loginPassword, rol) {

		const postData = {
			"email": loginEmail,
			"password": loginPassword,
			"provider": "CORREO",
			"timestamps": new Date(),
			"role": rol,
		}

		return this.httpClient.post(this.baseUrl + '/users', postData);
	}

	//Login y register con Google
	signInWithGoogle() {
		this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
		const postData = {
			email: this.user.email,
			user_img: this.user.photoUrl,
			provider: this.user.provider,
			timestamps: new Date(),
			role: 'usuario_cliente',
		};

		return this.httpClient.post(this.baseUrl + '/users', postData);
	}

	//Login y register con Facebook
	signInWithFB() {
		this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
		const postData = {
			email: this.user.email,
			user_img: this.user.photoUrl,
			provider: this.user.provider,
			timestamps: new Date(),
			role: 'usuario_cliente',
		};
		this.httpClient.post(this.baseUrl + '/users', postData);
	}

	//Register con Correo de Usuario Cliente
	signInWithEmail(email, password) {
		const postData = {
			email: email,
			password: password,
			provider: 'CORREO',
			timestamps: new Date(),
			role: 'usuario_cliente',
		};
		return this.httpClient.post(this.baseUrl + '/users', postData);
	}

	//Register con Correo de Usuario Cliente
	signInWithEmailEnterprise(email, password, enterpriseKey) {
		const postData = {
			email: email,
			password: password,
			provider: 'CORREO',
			timestamps: new Date(),
			role: 'usuario_empresa',
			enterpriseKey: enterpriseKey
		};
		return this.httpClient.post(this.baseUrl + '/users', postData);
	}
}
