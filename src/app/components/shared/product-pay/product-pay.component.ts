import { ProductService } from '../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { State, Store } from '@ngrx/store';
import * as ProductActions from '../../../actions/produc.actions';
import { AuthService } from 'src/app/services/auth.service';
import { ProductModel } from 'src/app/models/product.model';
import { ServiceInterface, ServiceModel } from '../../../models/service.model';
import * as ServicesActionTypes from '../../../actions/service.actions';

@Component({
  selector: 'app-product-pay',
  templateUrl: './product-pay.component.html',
  styleUrls: ['./product-pay.component.scss'],
})
export class ProductPayComponent implements OnInit {
  constructor(
    private storeSer: Store<{ product: ServiceModel }>,
    private store: Store<{ product: ProductModel }>,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private auth: AuthService,
    private state: State<ProductModel>,
    private stateSer: State<ServiceModel>,
    private proServ: ProductService,
    private serServ: ProductService,
    private router: Router
  ) { }
  postForm: FormGroup;
  flowType: string;

  ngOnInit(): void {
    this.postForm = this.fb.group({
      efectivo: [false],
      transferencia: [false],
      tarjeta: [false],
      codi: [false],
      paypal: [false],
      mercado: [false],
      pago: [false],
    });
  }

  async modal() {

    let dispatchData = [
      {
        catPayment: this.postForm.value.efectivo ? 'Efectivo' : null,
      },
      {
        catPayment: this.postForm.value.transferencia ? 'Transferencia' : null,
      },
      {
        catPayment: this.postForm.value.tarjeta ? 'Tarjeta' : null,
      },
      {
        catPayment: this.postForm.value.codi ? 'Codi' : null,
      },
      {
        catPayment: this.postForm.value.paypal ? 'Paypal' : null,
      },
      {
        catPayment: this.postForm.value.mercado ? 'Mercado Pago' : null,
      },
      {
        catPayment: this.postForm.value.pago ? 'Pago contra entrega' : null,
      },
    ];

    this.flowType = this.router.url.split('/')[1];
    // console.log(this.flowType);

    switch (this.flowType) {
      case 'producto':
        dispatchData = dispatchData.filter((data) => data.catPayment !== null);

        await this.store.dispatch(
          ProductActions.SetProducKey({ clave: this.auth.getUserKey() })
        );
        await this.store.dispatch(
          ProductActions.SetProducPaymentMethods({
            paymentMethods: dispatchData,
          })
        );
        // console.log(this.state.getValue().produc);
        // console.log(this.state.getValue());
        this.proServ
          .postProduct(this.state.getValue().produc, this.auth.getUserKey())
          .subscribe(
            (res) => {
              // console.log(res);
              // console.log(this.state.getValue().produc);
              const producc = 'Producto';
              const dialogRef = this.dialog.open(ModalDialog,{
                height: '250px',
                width: '700px',
                data:{
                  prov: producc
                }
              });
            },
            (err) => {
              // console.log(err);
            }
          );
        break;
      case 'servicios':
        dispatchData = dispatchData.filter((data) => data.catPayment !== null);

        await this.storeSer.dispatch(
          ServicesActionTypes.SetProducKey({ clave: this.auth.getUserKey() })
        );
        await this.storeSer.dispatch(
          ServicesActionTypes.SetProducPaymentMethods({
            paymentMethods: dispatchData,
          })
        );
        // console.log(this.stateSer.getValue().service);
        this.serServ
          .postService(this.stateSer.getValue().service, this.auth.getUserKey())
          .subscribe(
            (res) => {
              // console.log(res);
              // console.log(this.stateSer.getValue().service);
              const producc = 'Servicio';
              const dialogRef = this.dialog.open(ModalDialog,{
                height: '250px',
                width: '700px',
                data:{
                  prov: producc
                }
              });
            },
            (err) => {
              // console.log(err);
            }
          );
        break;
    }
    //// console.log(this.postForm.value);
    //this.router.navigateByUrl('/producto/categoria')
  }
}



import {Inject } from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'dialo',
  templateUrl: 'modal.html',
})


export class ModalDialog {

  constructor(private router: Router, public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    console.log( this.data.prov);
  }
  closeDialog() {
    const dialogRef = this.dialog.closeAll();
  }
  rediPerfil() {
    this.closeDialog();
    this.router.navigateByUrl('/dashboard/perfil');
  }

  rediBienes() {
    this.closeDialog();
    this.router.navigateByUrl('/producto/producto-servicio');
  }
}

