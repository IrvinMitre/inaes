import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

//Imports para el login y logout con FB y Gmail
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	user: SocialUser;
	loggedIn: boolean;
	GoogleLoginProvider = GoogleLoginProvider;
	email: string;
	password: string;
	loginPassword: string;
	loginEmail: string;
	userLogedInWithEmail: string;
	baseUrl: string = environment.ipUrl 

	constructor(
		private authService: SocialAuthService,
		private httpClient:HttpClient
	) { }


	ngOnInit() {
		this.authService.authState.subscribe((user) => {
			this.user = user;
			this.loggedIn = (user != null);
			this.userLogedInWithEmail = localStorage.getItem('loginEmail')
		});
	}

	//Login y register con Google
	async signInWithGoogle(){
		
		await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
		const postData = {
			"email": this.user.email,
			"user_img": this.user.photoUrl,
			"provider": this.user.provider,
			"timestamps": new Date(),
			"role": "user",
		}
		this.httpClient.post(this.baseUrl+'/users', postData).subscribe(data => {
			console.log(data);
		});
	}

	//Login y register con Facebook
	async signInWithFB() {
		await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
		const postData = {
			"email": this.user.email,
			"user_img": this.user.photoUrl,
			"provider": this.user.provider,
			"timestamps": new Date(),
			"role": "user",
		}	
		this.httpClient.post(this.baseUrl+'/users', postData).subscribe(data => {
			console.log(data);
		});
	}

	signOut(): void {
		this.authService.signOut();
	}

	refreshGoogleToken(): void {
		this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
	}

	
	//Register con Correo
	signInWithEmail(email, password){
		const postData = {
			"email": email,
			"password": password,
			"provider": "CORREO",
			"timestamps": new Date(),
			"role": "user",
		}
		this.httpClient.post(this.baseUrl+'/users', postData).subscribe(data => {
			console.log(data);
		});
	}
	//Login con Correo
	loginWithEmail(loginEmail, loginPassword){
		this.httpClient.get(
			this.baseUrl+'/users/login?email='+loginEmail+'&password='+loginPassword)
			.subscribe(data => {
				localStorage.setItem('loginEmail', loginEmail)
				window.location.reload();
			}
		);
	}
	//Cierra sesisón con correo
	logOutWithEmail() {
		localStorage.removeItem('loginEmail')
		window.location.reload();
	}
}
