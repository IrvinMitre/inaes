import { AuthService } from './../../services/auth.service';
import { EnterpriseModel } from './../../models/productRequest.model';
import { FormsStepsModel } from './../../models/formsStep.model';
import * as FormActions from './../../actions/formsSteps.actions';
import * as ProductActions from './../../actions/product.actions';
import { Store } from '@ngrx/store';
import { DirectoryService } from './../../services/directory.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ess-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss'],
})
export class RegistryComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private formStore: Store<{ form: FormsStepsModel }>,
    private store: Store<{ product: EnterpriseModel }>,
    private form: FormBuilder,
    public dialog: MatDialog,
    private dirServ: DirectoryService,
    private router: Router
  ) { }

  postForm: FormGroup;
  openDialog() {
    const dialogRef = this.dialog.open(ModalDialog,{
      height: '700px',
      width: '900px',
    });
  }

  ngOnInit() {
    this.postForm = this.form.group({
      clave: ['', [Validators.required]],
    });
    this.store.dispatch(ProductActions.LoadProduct());
  }

  async submit() {
    if (!this.postForm.valid) {
      return;
    }

    await this.dirServ.getEnterprise(this.postForm.value.clave).subscribe(
      (res) => {
        console.log(res)
        const { _id } = (res as any) || null;
        console.log(_id);

        if (_id) {
          this.auth.setUserLogged(this.postForm.value.clave);
          this.router.navigateByUrl('/dashboard/perfil')
          
        } else {
          this.dirServ
            .getClaveActualizacion(this.postForm.value.clave)
            .subscribe(
              (res) => {
                const { data } = res as any;
                // console.log(data);
                this.auth.setUserLogged(this.postForm.value.clave);
                this.store.dispatch(
                  ProductActions.SetProductKey({ clave: this.postForm.value.clave })
                );
                this.formStore.dispatch(
                  FormActions.SetRegistrationStep({ step: 'StepTwo' })
                );

                //console.log(this.state.getValue().enterprise)
                data
                  ? this.router.navigateByUrl('/registro/bienvenida')
                  : this.dialog.open(ModalDialog,{
                    height: '700px',
                    width: '900px',
                  });
              },
              (err) => {
                console.log(err);
                const dialogRef = this.dialog.open(ModalDialog,{
                  height: '700px',
                  width: '900px',
                });
              }
            );
        }
      },
      (err) => {
        console.log(err);
        this.dirServ
          .getClaveActualizacion(this.postForm.value.clave)
          .subscribe(
            (res) => {
              const { data } = res as any;
              // console.log(data);
              this.auth.setUserLogged(this.postForm.value.clave);
              this.store.dispatch(
                ProductActions.SetProductKey({ clave: this.postForm.value.clave })
              );
              this.formStore.dispatch(
                FormActions.SetRegistrationStep({ step: 'StepTwo' })
              );

              //console.log(this.state.getValue().enterprise)
              data
                ? this.router.navigateByUrl('/registro/bienvenida')
                : this.dialog.open(ModalDialog,{
                  height: '200px',
                  width: '500px',


                });
            },
            (err) => {
              console.log(err);
              const dialogRef = this.dialog.open(ModalDialog);
            }
          );
        // const dialogRef = this.dialog.open(ModalDialog);
      }
    );


  }

  create() {
    window.open('http://sistemas.inaes.gob.mx/directorioEESS/', '_blank'); // set endpoint for creation
  }
}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'modal.html',
})
export class ModalDialog {
  constructor(private router: Router, public dialog: MatDialog) { }

  closeDialog() {
    const dialogRef = this.dialog.closeAll();
  }

  create() {
    this.closeDialog();
    window.open('http://sistemas.inaes.gob.mx/directorioEESS/', '_blank'); // set endpoint for creation
  }
}
