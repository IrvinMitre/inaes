import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductInterface, ProductModel } from '../../../models/product.model';
import { ServiceModel } from '../../../models/service.model';
import * as ProductActions from '../../../actions/produc.actions';
import * as ServicesActionTypes from '../../../actions/service.actions';
import { FormsStepsModel } from '../../../models/formsStep.model';
import * as FormActions from '../../../actions/formsSteps.actions';
import { Store } from '@ngrx/store';
/**
 * @ignore
 */
@Component({
  selector: 'app-product-keyword',
  templateUrl: './product-keyword.component.html',
  styleUrls: ['./product-keyword.component.scss']
})
export class ProductKeywordComponent implements OnInit {
/**
 *
 * @param fb variable para crear form reactivo
 * @param router variable para enrutamiento
 */
  constructor(private storeSer: Store<{ product: ServiceModel }>,private store: Store<{ product: ProductModel }>,private fb: FormBuilder, private router: Router, private formStore: Store<{ form: FormsStepsModel }>) { }
  postForm: FormGroup;
  flowType: string;
  title: string;
  subtitle: string;
  progress: number;

  ngOnInit(): void {
    this.postForm = this.fb.group({
      pclave1: ['', [Validators.required]],

    });

    this.flowType = this.router.url.split('/')[1]
    // console.log(this.flowType);

    switch (this.flowType) {
      case 'producto':
        this.title = 'Impulsa tu producto en los buscadores';
        this.subtitle = 'Ingresa al menos una frase clave que describa tu producto.';
        this.progress = 62.5;

        break;
      case 'servicios':
        this.title = 'Impulsa tu servicio en los buscadores';
        this.subtitle = 'Ingresa al menos una frase clave que describa tu servicio.';
        this.progress = 60;
        break;
    }
  }
/**
 * Navegamos a vista de fotografia
 */
  submit(){
    const dispatchData =  [
      {
        tag: this.postForm.value.pclave1,
      }
    ];

    this.flowType = this.router.url.split('/')[1]
    // console.log(this.flowType);

    switch (this.flowType) {
      case 'producto':
        // console.log(dispatchData)
        this.store.dispatch(ProductActions.SetProducTags({ tags: dispatchData }));
        this.formStore.dispatch(FormActions.SetProductStep({ step: 'StepSix' }));
        this.router.navigateByUrl('producto/fotografia')
        break;
      case 'servicios':
        this.storeSer.dispatch(ServicesActionTypes.SetServiceTags({ tags: dispatchData }));
        this.formStore.dispatch(FormActions.SetServiceStep({ step: 'StepFive' }));
        this.router.navigateByUrl('/servicios/fotografia')
        break;
    }


  }




}
