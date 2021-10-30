import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DirectoryService } from './../../services/directory.service';
import { Component, OnInit, Inject, NgZone, ViewChild } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {take} from 'rxjs/operators';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

	constructor(
		private auth: AuthService,
		private dirServ: DirectoryService,
		private router:ActivatedRoute,
		private producServ: ProductService,
		private fb: FormBuilder,
		private httpClient: HttpClient,
		private _ngZone: NgZone
	) {
		this.router.paramMap.subscribe((params) => {
			this.productId = this.router.snapshot.params.id;
			this.socialkey = this.router.snapshot.params.sk;
			//this.ngOnInit();
		});

		this.makeRating = this.fb.group({
			comentario: [ '', [ Validators.required /*Validators.min(20), Validators.max(350) */ ]],
			rating: [ '', [ Validators.required ]],
		});
	}

	productId = this.router.snapshot.params.id;
	socialkey = this.router.snapshot.params.sk;
	productData: any;
	productData1: any[];
	name: any;
	contacto: any;
	movil: any;
	email: any;
	imgPhoto1: any;
	imgPhoto2: any;
	imgPhoto3: any;
	cer: any;
	idEmpresa: any;
	like = false;
	socialData: any;
	descriptions: any;
	CommercializationSubtype: any;
	payment: any[];
	key: string;
	desDescription: any;
	title: string;
	user: string = "";
	userVerified: string = "";
	userId: string = "";
	makeRating: FormGroup;
	baseUrl: string = environment.ipUrl
	comments: any[];
	commentsParsed: any[] = [];

	changeLike(){
		this.like = !this.like;
	}



	ngOnInit(): void {
		this.getContact();
		this.getProduct();
		this.getName();
		this.isLogged();
		this.getOneUser();
		this.getComments();
	}

	@ViewChild('autosize') autosize: CdkTextareaAutosize;

	triggerResize() {
	  // Wait for changes to be applied, then trigger textarea resize.
	  this._ngZone.onStable.pipe(take(1))
		  .subscribe(() => this.autosize.resizeToFitContent(true));
	}

	numSequence(n: number): Array<number> { 
		let y: number = +n;
		return Array(y);
	} 

	getComments(){
		this.httpClient.get(this.baseUrl + '/ratings').subscribe(
			res => {
				this.comments = ( res as any );
				for( var comment of this.comments ){
					if( this.productId == comment.product_id ){
						this.commentsParsed.push(comment);
					}
				}
				
			},
			err => {
			}
		);
	}


	getContact(){
		this.dirServ.getEnterprise(this.socialkey).subscribe(
			res => {
				this.contacto = (res as any).contact
				this.movil = (res as any).admin.movil
				this.email = (res as any).admin.email
				this.idEmpresa=(res as any).socialEnterpriseKey;
			}
		)
	}

	getProduct(){

		this.dirServ.getOnlyProduct(this.productId, this.socialkey).subscribe(
			res =>{
				this.productData = (res as any);

				this.dirServ.getProductoCategoria((res as any).categories[0].catProduct).subscribe(
					(res) => {
						this.productData1 = (res as any).products;
					},
					(err) => {

					}
				);

				this.key = (res as any).socialEnterpriseKey;
				this.payment = (res as any).paymentMethods;
				this.imgPhoto1 = (res as any).pictures[0].route;
				this.imgPhoto2 = (res as any).pictures[1].route;
				this.imgPhoto3 = (res as any).pictures[2].route;
				this.cer = (res as any).features;
				this.descriptions = (res as any).comercializations;
				this.CommercializationSubtype = (res as any).comercializations[1].catCommercializationSubType;
				this.desDescription = (res as any).comercializations[2].description;
				this.title = (res as any).categories.catProduct;
			},
			err =>{
				
			}
		)
	}


	direct(link){
		window.open(link, '_blank')
	}

	getName(){
		this.dirServ.getClaveActualizacion( this.socialkey).subscribe(
			res => {
				const  idOrganismo  = (res as any).data.datosConsulta.idOrganismo;
				const  idTipoOrganismo  = (res as any).data.idTipoOrganismo;

				this.dirServ.getDatosOrganismoPlataforma(idOrganismo, idTipoOrganismo).subscribe(
					res => {
						this.name = (res as any).organismo.denominacion;
					},
					err => {
						
					}
				);
			},
			err => {

			}
		);

		this.dirServ.getEnterprise(this.socialkey).subscribe(
			res=> {
				this.socialData = (res as any).contact;
				this.contacto = (res as any);
			},
			err => {

			}
		)
	}

	goToLink(link){
		window.open(link, '_blank')
	}


	isLogged(){
		this.user = this.auth.isLoggedWithEmail();
	}

	getOneUser(){
		this.auth.getUser(this.user).subscribe(
			res => {
				this.userVerified = (res as any).email;
				this.userId = (res as any)._id;
			},
			err => {

			}
		);
	}

	submitRating( formData ){
		if ( 
			this.userVerified != null && 
			this.userId != null && 
			this.productId != null && 
			this.socialkey != null && 
			this.makeRating.valid 
			){
				const postData = {
					comment: formData.comentario,
					email: this.userVerified,
					product_id: this.productId,
					rating: formData.rating,
					socialEnterpriseKey: this.socialkey,
					user_id: this.userId
				};
				this.httpClient.post(this.baseUrl + '/ratings', postData).subscribe(
					res => {
						this.getComments();
					},
					err => {
						
					}
				);
		}else{
			return
		}

	}

}
