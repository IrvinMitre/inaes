import { Component, OnInit } from '@angular/core';
import { FormsStepsModel } from './../../../models/formsStep.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceInterface, ServiceModel } from '../../../models/service.model';
import * as ServicesActionTypes from '../../../actions/service.actions';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import * as FormActions from '../../../actions/formsSteps.actions';

/**
 *
 */
@Component({
  selector: 'app-product-path',
  templateUrl: './product-path.component.html',
  styleUrls: ['./product-path.component.scss']
})
export class ProductPathComponent implements OnInit {
  constructor(private formStore: Store<{ form: FormsStepsModel }>,private store: Store<{ product: ServiceModel }>,private router: Router, private fb: FormBuilder) {}

  postForm: FormGroup;
  urls = [];

  ngOnInit() {
    this.postForm = this.fb.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.maxLength(350)]],
      recomen: ['', [Validators.required, Validators.maxLength(350)]],
      rent:[false],
      rest:[false],
      wifi:[false],
      tv:[false],
      air:[false],
      cale:[false],
      renta:[false],
      camp:[false],
      tours:[false],
    });
  }
  submit() {
    if (!this.postForm) {
      return;
    }
    let dispatchData = [
      {
        catEspecificService: (this.postForm.value.rent ? 'Renta de Habitaciones' : null)
      },
      {
        catEspecificService: (this.postForm.value.rest ? 'Restaurante' : null)
      },
      {
        catEspecificService: (this.postForm.value.wifi ? 'Wifi' : null)
      },
      {
        catEspecificService: (this.postForm.value.tv ? 'TV' : null)
      },
      {
        catEspecificService: (this.postForm.value.air ? 'Aire Acondicionado' : null)
      },
      {
        catEspecificService: (this.postForm.value.cale ? 'Calefaccion' : null)
      },
      {
        catEspecificService: (this.postForm.value.renta ? 'Renta de Equipo' : null)
      },
      {
        catEspecificService: (this.postForm.value.camp ? 'Camping' : null)
      },
      {
        catEspecificService: (this.postForm.value.tours ? 'Tour Personalizado' : null)
      },
    ];

    dispatchData = dispatchData.filter(data => data.catEspecificService !== null);

    this.store.dispatch(ServicesActionTypes.SetEspecificServices({ especificServices: dispatchData }))
    this.formStore.dispatch(FormActions.SetServiceStep({step: 'StepFour'}));
    this.router.navigateByUrl('/servicios/palabras-clave')
    this.store.dispatch(ServicesActionTypes.SetServiceDescription({ whatIsIt: this.postForm.value.nombre, whereItIs: this.postForm.value.direccion, haveFun: this.postForm.value.descripcion, additionalAttractions:this.postForm.value.recomen}));
    // console.log(this.postForm.value);
  }
}
