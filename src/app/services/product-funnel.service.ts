import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Store, State } from '@ngrx/store';
import { Router } from '@angular/router';
import { ProductModel } from '../models/product.model';
import { FormsStepsModel } from '../models/formsStep.model';

@Injectable({
  providedIn: 'root',
})
export class ProductFunnelGuard implements CanActivate {
  constructor(
    private store: Store<{ product: ProductModel }>,
    private state: State<ProductModel>,
    private router: Router,
    private formState: State<FormsStepsModel>
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    let allowed = true;

    console.log(
      this.formState.value.formSteps.currentProductStep,
      route.url[0].path
    );

    switch (this.formState.value.formSteps.currentProductStep) {
      case 'StepTwo':
        if (route.url[0].path !== 'categoria') allowed = false;
        break;

      case 'StepTree':
        if (route.url[0].path !== 'certificado') allowed = false;
        break;

      case 'StepFour':
        if (route.url[0].path !== 'descripcion') allowed = false;
        break;

      case 'StepFive':
        if (route.url[0].path !== 'palabras-clave') allowed = false;
        break;

      case 'StepSix':
        if (route.url[0].path !== 'fotografia') allowed = false;
        break;
      case 'StepSeven':
        if (route.url[0].path !== 'entrega') allowed = false;
        break;

      case 'StepEight':
        if (route.url[0].path !== 'adicional') allowed = false;
        break;

      case 'StepNine':
        if (route.url[0].path !== 'pago') allowed = false;
        break;

      default:
        allowed = false;
        break;
    }

    if (!allowed) this.router.navigateByUrl('/producto-servicio');

    return allowed;

    return true;
  }
}
