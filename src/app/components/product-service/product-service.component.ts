import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsStepsModel } from './../../models/formsStep.model';
import * as FormActions from './../../actions/formsSteps.actions';
import { Store } from '@ngrx/store';
/**
 * @ignore
 */
@Component({
  selector: 'app-product-service',
  templateUrl: './product-service.component.html',
  styleUrls: ['./product-service.component.scss']
})
export class ProductServiceComponent implements OnInit {
/**
 *
 * @param router variable para realizar enrutamiento
 */
  constructor( private router: Router, private formStore: Store<{ form: FormsStepsModel }>) { }
  /**
   * Navegamos a categoria
   */
rediproduct(){
  this.formStore.dispatch(FormActions.SetProductStep({ step: 'StepTwo' }));
  this.router.navigateByUrl('/producto/categoria')
}

/**
 * navegamos a servicio
 */
rediService(){
  this.formStore.dispatch(FormActions.SetServiceStep({ step: 'StepOne' }));
  this.router.navigateByUrl('/servicios/sectores')
}
  ngOnInit(): void {
  }

}
