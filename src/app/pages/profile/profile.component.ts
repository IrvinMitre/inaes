import { DirectoryService } from './../../services/directory.service';
import { CustomValidator } from './../../../validators/validators';
import { EnterpriseModel } from './../../models/productRequest.model';
import * as ProductActions from './../../actions/product.actions';
import { FormsStepsModel } from './../../models/formsStep.model';
import * as FormActions from './../../actions/formsSteps.actions';
import { State, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from './../../services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { NewEnterpriseService } from '../../services/mailchimp/new-enterprise.service';


@Component({
	selector: 'ess-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	constructor(
		private dirServ: DirectoryService,
		private auth: AuthService,
		private state: State<EnterpriseModel>,
		private formStore: Store<{ form: FormsStepsModel }>,
		private store: Store<{ product: EnterpriseModel }>,
		private fb: FormBuilder,
		public dialog: MatDialog,
		private router: Router,
		private proServ: ProductService,
		private NewEnterpriseService: NewEnterpriseService

	) {
		// this.formStore.dispatch(FormActions.SetRegistrationStep({ step: 'StepFive' }));
    this.img = this.state.getValue().enterprise.identityPictures[0].route;
	}
	img: string;
	postForm: FormGroup;
	hide = true;
	tmp: boolean = false;
	enterpriseName: string;

	ngOnInit() {
		this.img = this.state.getValue().enterprise.identityPictures[0].route;
		this.getidOrganismo();
		 console.log(this.state.getValue());
		this.postForm = this.fb.group({
			nombre: ['', [Validators.required]],
			apellido: ['', [Validators.required]],
			correo: ['', [Validators.required, Validators.email]],
			telefono: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
			contrasena: ['', [Validators.required, CustomValidator.validatePaswword, Validators.maxLength(12), Validators.minLength(8)]],
			confcontrasena: ['', [Validators.required, CustomValidator.validatePaswword, Validators.maxLength(12), Validators.minLength(8)]],
			term: [false, [Validators.requiredTrue]],
			
		});
	}

	 async getidOrganismo() {
		 await this.dirServ.getClaveActualizacion(this.auth.getUserKey())
		.subscribe(res => {
			const idOrganismo = (res as any).data.datosConsulta.idOrganismo;
			const idTipoOrganismo = (res as any).data.idTipoOrganismo;
			// console.log(idOrganismo);
			// console.log(idTipoOrganismo);
			this.dirServ.getDatosOrganismoPlataforma(idOrganismo, idTipoOrganismo).subscribe(
				res => {
					this.enterpriseName = (res as any).organismo.denominacion;
				},
				err => {
					// console.log(err);
				}
			);
		},
		err => {
			// console.log(err)
		});
	}

	openDialog() {
		const dialogRef = this.dialog.open(ModalDialog2, {
			height: '700px',
			width: '900px',
		});
	}

	openDialog2() {
		const dialogRef = this.dialog.open(ModalDialog3);
	}

	 async submit() {
		if (!this.postForm.valid) {
			return;
		}
		this.store.dispatch(ProductActions.SetProductKey({ clave: this.auth.getUserKey() }));
		this.store.dispatch(ProductActions.SetAdmin(
				{ 
					firstName: this.postForm.value.nombre,
					lastName: this.postForm.value.apellido,
					email: this.postForm.value.correo,
					movil: this.postForm.value.telefono,
					password: this.postForm.value.contrasena
				}
			)
		);
		 await this.proServ.postEmpresas(this.state.getValue().enterprise).subscribe(
			res => {
				this.registerMailChimpNewEnterprise(
					this.postForm.value.correo,
					this.enterpriseName
				);

				this.createUserEnterprise( 
					this.postForm.value.correo,
					this.postForm.value.contrasena,
					this.auth.getUserKey()
				);
			},
			err => {
			}
		);
	}

	registerMailChimpNewEnterprise(correo, nombre){
		this.NewEnterpriseService.subscribeToList(correo, nombre)
		.subscribe(res => {

		}, err => {

		})
	}

	createUserEnterprise( email, password, enterpriseKey ) {
		this.auth.signInWithEmailEnterprise(
			email, password, enterpriseKey ).subscribe(
			res => {
				this.registerMailChimpNewEnterprise( email, this.enterpriseName );
			},
			err => {
			}
		);
	}

}




@Component({
	selector: 'dialog-a',
	templateUrl: 'modal.html',
  styleUrls: ['profile.component.scss'],
})
export class ModalDialog2 {
}


@Component({
	selector: 'dialog1',
	templateUrl: 'modal2.html',
  styleUrls: ['profile.component.scss'],
})
export class ModalDialog3 {

	constructor(
		private router: Router,
		public dialog: MatDialog
	) { }

	closeDialog() {
		const dialogRef = this.dialog.closeAll()
	}

	rediPerfil() {
		this.closeDialog()
		this.router.navigateByUrl('/dashboard/perfil')
	}

	rediBienes() {
		this.closeDialog()
		this.router.navigateByUrl('/producto/producto-servicio')
	}

}
