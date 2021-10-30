import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { State } from '@ngrx/store';
import { FormsStepsModel } from '../models/formsStep.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesFunnelGuard implements CanActivate {

  constructor(private router: Router, private formState: State<FormsStepsModel>) { }

  public canActivate(route: ActivatedRouteSnapshot){
    let allowed = true;

    console.log(this.formState.value.formSteps.currentServiceStep, route.url[0].path);

    switch (this.formState.value.formSteps.currentServiceStep) {
      case 'StepOne':
        if (route.url[0].path !== 'sectores') allowed = false;
        break;
        case 'StepTwo':
        if (route.url[0].path !== 'certificado') allowed = false;
        break;

      case 'StepTree':
        if (route.url[0].path !== 'path') allowed = false;
        break;

      case 'StepFour':
        if (route.url[0].path !== 'palabras-clave') allowed = false;
        break;

      case 'StepFive':
        if (route.url[0].path !== 'fotografia') allowed = false;
        break;

      case 'StepSix':
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
