import { EnterpriseModel } from './../../models/productRequest.model';
import * as ProductActions from './../../actions/product.actions';
import { FormsStepsModel } from './../../models/formsStep.model';
import * as FormActions from './../../actions/formsSteps.actions';
import { State, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { DirectoryService } from './../../services/directory.service';
@Component({
  selector: 'ess-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
})
export class InformationComponent implements OnInit {
  constructor(
    private store: Store<{ product: EnterpriseModel }>,
    private state: State<EnterpriseModel>,
    private formStore: Store<{ form: FormsStepsModel }>,
    private fb: FormBuilder,
    private dirServ: DirectoryService,
    public dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
  ) {}
  postForm: FormGroup;
  hide = true;
  ngOnInit() {
    this.getDatos();
    this.postForm = this.fb.group({
      correo: ['', [Validators.email]],
      facebook: [''],
      insta: [''],
      red: [''],
      telefono: ['', [Validators.maxLength(10), Validators.minLength(10)]],
      telefonoW: ['', [Validators.maxLength(10), Validators.minLength(10)]],
    });
  }
  async getDatos(){
    await this.dirServ.getClaveActualizacion(this.auth.getUserKey()).subscribe(
      (res) => {
        const idOrganismo = (res as any).data.datosConsulta.idOrganismo;
        const idTipoOrganismo = (res as any).data.idTipoOrganismo;
      //  console.log(res);
        // console.log(idTipoOrganismo);
          this.dirServ
          .getDatosOrganismoPlataforma(idOrganismo, idTipoOrganismo)
          .subscribe(
            (res) => {
             // console.log((res as any).contact.email);
             this.postForm = this.fb.group({
              correo: [(res as any).contact.email, [Validators.email]],
              facebook: [(res as any).contact.facebook],
              insta: [(res as any).contact.instagram],
              red: [(res as any).contact.website],
              telefono: [
                (res as any).contact.localphone,
                [
                  Validators.maxLength(10),
                  Validators.minLength(10),
                ],
              ],
              telefonoW: [(res as any).contact.whatsapp, [Validators.maxLength(10), Validators.minLength(10)]],
            });
              // this.claveActividad = (res as any).data.actividad.clave;
            },
            (err) => {
              // console.log(err);
            }
          );
      },
      (err) => {
        // console.log(err)
      }
    );
  }
  openDialog() {
    const dialogRef = this.dialog.open(ModalDialog4);
  }
  submit() {
    if (!this.postForm.valid) {
      return;
    }
    console.log(this.state.getValue());
    this.store.dispatch(
      ProductActions.SetProfile({
        website: this.postForm.value.red,
        email: this.postForm.value.correo,
        facebook: this.postForm.value.facebook,
        instagram: this.postForm.value.insta,
        localphone: this.postForm.value.telefono,
        whatsapp: this.postForm.value.telefonoW,
      })
    );
    console.log(this.state.getValue());
    this.formStore.dispatch(
      FormActions.SetRegistrationStep({ step: 'StepFive' })
    );
    this.router.navigateByUrl('/registro/perfil');
  }
}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'modal.html',
})
export class ModalDialog4 {}
