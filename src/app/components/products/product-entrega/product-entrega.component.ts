import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductInterface, ProductModel } from '../../../models/product.model';
import * as ProductActions from '../../../actions/produc.actions';
import { State, Store } from '@ngrx/store';
import { ProductService } from '../../../services/product.service';
import { FormsStepsModel } from '../../../models/formsStep.model';
import * as FormActions from '../../../actions/formsSteps.actions';
/**
 * @ignore
 */
@Component({
  selector: 'app-product-entrega',
  templateUrl: './product-entrega.component.html',
  styleUrls: ['./product-entrega.component.scss']
})
export class ProductEntregaComponent implements OnInit {
  /**
   *
   * @param router variable para realizar enrutamiento
   */
  constructor(private auth: AuthService, private state: State<ProductModel>, private store: Store<{ product: ProductModel }>, private fb: FormBuilder, private router: Router, private formStore: Store<{ form: FormsStepsModel }>) { }
  postForm: FormGroup;
  /**
   * Navegamos a la vista adicional
   */
  /**
  * Navegamos a la ruta de falta
  */
 valide: any;
  ngOnInit(): void {

  }
  setValidet(){
    this.store.dispatch(ProductActions.SetDelivery({ homeDelivery: this.valide }));
    this.formStore.dispatch(FormActions.SetProductStep({ step: 'StepEight' }));
    this.router.navigateByUrl('/producto/adicional')
  }
  setValideti(){
    const dispatchData = [
      {
        catCommercializationType: "",
        description: "",
        catCommercializationSubType: []
      },
      {
        catCommercializationType: "",
        description: "",
        catCommercializationSubType: []
      }
    ];
    this.store.dispatch(ProductActions.SetProducComercializations({ comercializations: dispatchData }));
    this.formStore.dispatch(FormActions.SetProductStep({ step: 'StepNine' }));
    this.router.navigateByUrl('/producto/adicional')
  }





}
