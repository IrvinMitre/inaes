import { FormsStepsModel } from './../../../models/formsStep.model';
import { ProductService } from '../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { subsector } from '../../../models/subsector.model';
import { EconomicSector } from '../../../models/economicSector.model';
import { Branch } from '../../../models/branch.model';
import { Macrosector } from '../../../models/macrosector.model';
import { CatalogClass } from '../../../models/catalogClass.model';
import { ServiceInterface, ServiceModel } from '../../../models/service.model';
import * as ServicesActionTypes from '../../../actions/service.actions';
import { Store } from '@ngrx/store';
import * as FormActions from '../../../actions/formsSteps.actions';


@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.scss']
})
export class SectorsComponent implements OnInit {

  constructor(private formStore: Store<{ form: FormsStepsModel }>, private store: Store<{ product: ServiceModel }>,private fb: FormBuilder, private productServ: ProductService, private router: Router) { }
  postForm: FormGroup;
  hide = true;

  macrosectors: Macrosector[];
  branches: Branch[];
  sectores: EconomicSector[];
  subSectores: subsector[];
  clases: CatalogClass[];
  catalog: any[];
  categories: any[];
  sub1: any[];
  sub2: any[];
  otherSub: any[];
  lastSub: any[];
  servicio: any[];
  tem: any;

  categoryData = [{
    name: 'Despensa',
    value: 0
  },
  {
    name: 'Despensa2',
    value: 1
  }];
  ngOnInit() {
    this.postForm = this.fb.group({
      ecoturismo: ['', [Validators.required]]
    });


    this.getCategoriesCatalog();
  }
  check(e){
    console.log(e);
    this.tem = e;
  }
  getCategoriesCatalog() {
    this.productServ.getCategoriesCatalog()
      .subscribe(
        res => {
          console.log(res);
          this.catalog = (res as any).filter(catalog => catalog.catalogId === 'catService');
           console.log(this.catalog);
           this.catalog[0].services.map(service => service.service);
           this.categories = this.catalog[0].services.map(service => service.service);
           console.log(this.catalog[0].services.map(service => service.service));

        },
        err => {
          // console.log(err);
        }
      )
  }

  redicert(){
    this.formStore.dispatch(FormActions.SetServiceStep({ step: 'StepTwo' }))
    this.router.navigateByUrl('/servicios/certificado')
    this.store.dispatch(ServicesActionTypes.SetserviceId({ serviceId: this.postForm.value.ecoturismo}));

    const dispatchData = [
      {
        catService: this.postForm.value.ecoturismo
      }]

    // console.log(dispatchData)
    this.store.dispatch(ServicesActionTypes.SetServiceCategories({ categories: dispatchData }));

  }

  submit() {
    if (!this.postForm.valid) {
      return;
    }
    this.formStore.dispatch(FormActions.SetServiceStep({ step: 'StepTwo' }))
    this.router.navigateByUrl('/servicios/certificado')
    this.store.dispatch(ServicesActionTypes.SetserviceId({ serviceId: this.postForm.value.ecoturismo}));

    const dispatchData = [
      {
        catService: this.postForm.value.ecoturismo
      }]

    // console.log(dispatchData)
    this.store.dispatch(ServicesActionTypes.SetServiceCategories({ categories: dispatchData }));
  }
}
