import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { State } from '@ngrx/store';
import { FormsStepsModel } from '../models/formsStep.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationFunnelGuard implements CanActivate {

  constructor(private formState: State<FormsStepsModel>, private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot) {

    let allowed = true;

    console.log(this.formState.value.formSteps.currentRegistrationStep, route.url[0].path);

    switch (this.formState.value.formSteps.currentRegistrationStep) {
      case 'StepTwo':
        if (route.url[0].path !== 'bienvenida')
          allowed = false;
        break;

      case 'StepTree':
        if (route.url[0].path !== 'bienes-y-servicios')
          allowed = false;
        break;

      case 'StepFour':
        if (route.url[0].path !== 'informacion-adicional')
          allowed = false;
        break;

      case 'StepFive':
        if (route.url[0].path !== 'perfil')
          allowed = false;
        break;

      default:
        allowed = false;
        break;
    }

    if (!allowed)
      this.router.navigateByUrl('/registro')

    return allowed;
  }
}
