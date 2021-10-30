import { map } from 'rxjs/operators';
import { subsector } from '../../../models/subsector.model';
import { EconomicSector } from '../../../models/economicSector.model';
import { Branch } from '../../../models/branch.model';
import { Macrosector } from '../../../models/macrosector.model';
import { CatalogClass } from '../../../models/catalogClass.model';
import { ProductService } from '../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../../models/product.model';
import * as ProductActions from '../../../actions/produc.actions';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsStepsModel } from '../../../models/formsStep.model';
import * as FormActions from '../../../actions/formsSteps.actions';
/**
 * @ignore
 */
@Component({
  selector: 'ess-products-category',
  templateUrl: './products-category.component.html',
  styleUrls: ['./products-category.component.scss'],
})
export class ProductsCategoryComponent implements OnInit {
  /**
   *
   * @param fb Variable para crear form Reactivo
   * @param productServ Variable con los servicios de ProductService
   * @param router Variable para realizar enrutamiento
   */
  constructor(
    private store: Store<{ product: ProductModel }>,
    private formStore: Store<{ form: FormsStepsModel }>,
    private fb: FormBuilder,
    private productServ: ProductService,
    private router: Router
  ) {}
  /**
   * Variable que guardara form Reactivo
   * @type {FormGroup}
   * @memberof ProductsCategoryComponent
   */
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
  third = false;
  selectmacro: any;
  tem:any;
  tem2:any;
  tem3:any;
  tem4:any;
  tem5:any;

  categoryData = [
    {
      name: 'Despensa',
      value: 0,
    },
    {
      name: 'Despensa2',
      value: 1,
    },
  ];
  /**
   * Funcion que al cargar pagina, rellena los inputs del formulario con su infromacion correspondiente
   */
  ngOnInit() {
    this.postForm = this.fb.group({
      categoria: ['', [Validators.required]],
      subCategoria: ['', [Validators.required]],
      subCategoria2: ['' ],
      oCategoria: ['' ,[Validators.required]],
      oCategoria2: ['', [Validators.required]],
    });

    this.getMacrosectors();
    this.getCategoriesCatalog();
    // this.getBranches();
    // this.getSectorsByMacrosectors(2);
    // this.getSubsectorsBySector(4);
    // this.getRamasBySubsector(12);
    // this.getClassByRama(34);
  }
  /**
   * Funcion que obtiene el catalago de categorias y rellena input de form correspondiente
   */
  check(e){
    console.log(e);
    this.tem = e;
  }
  check2(e){
    console.log(e);
    this.tem2 = e;
  }
  check3(e){
    console.log(e);
    this.tem3 = e;
  }
  check4(e){
    console.log(e);
    this.tem4 = e;
  }
  check5(e){
    console.log(e);
    this.tem5 = e;
  }

  getCategoriesCatalog() {
    this.productServ.getCategoriesCatalog().subscribe(
      (res) => {
        this.catalog = (res as any).filter(
          (catalog) => catalog.catalogId === 'catProduct'
        );
        // console.log(this.catalog);
        // this.catalog[0].products.map(product => product.product);
        this.categories = this.catalog[0].products.map(
          (product) => product.product
        );
        // console.log(this.categories);
      },
      (err) => {
        // console.log(err);
      }
    );
  }
  /**
   * Obtiene subcategorias por medio de un switch que compara su valor
   * para llenar input de form correspondiente
   * @param nextCategorie valor de la categoria siguiente
   * @param value Valor que compara el nivel de subcategoria
   */
  setSubcategorie(nextCategorie, value) {
    this.selectmacro = value;
    // // console.log('val', value)
    //// console.log(this.postForm.get(value))
    switch (nextCategorie) {
      case 'sub1':
        this.sub1 = this.catalog[0].products.filter(
          (subProducts) => subProducts.product === value
        )[0].subproducts;
        this.otherSub = this.sub1;
        this.third = false;
        // console.log(this.sub1)
        break;

      case 'sub2':
        this.sub2 = this.sub1.filter(
          (subsub) => subsub.subproduct === value
        )[0].subsubproducts;
        if (this.sub2.length > 0) {
          this.third = true;
        } else {
          this.third = false;
        }

        // console.log(this.sub2)
        break;

      case 'otherSub':
        //this.otherSub = this.sub2.filter(subsub => subsub.subproduct === value)
        //// console.log(this.otherSub)
        break;

      case 'lastSub':
        this.lastSub = this.catalog[0].products.filter(
          (subProducts) => subProducts.product === value
        )[0].subproducts;
        this.otherSub = this.sub1;
        //this.third = false;
        // console.log(this.lastSub)
        break;
    }
  }
  /**
   * Habilita la vista de inputs en el form con un switch que compara que input
   * se deben rellenar
   * @param nextInput valor de Input
   * @param value valor a comparar
   */
  setNextInput(nextInput, value) {
    switch (nextInput) {
      case 'sectors':
        this.getSectorsByMacrosectors(value);
        this.postForm.get('sector').enable();
        // this.postForm.get('sector').setValue('');
        this.postForm.get('ssector').setValue('');
        this.postForm.get('rama').setValue('');
        this.postForm.get('srama').setValue('');

        this.subSectores = [] as subsector[];
        this.branches = [] as Branch[];
        this.clases = [] as CatalogClass[];

        break;

      case 'subSectors':
        this.getSubsectorsBySector(value);
        this.postForm.get('ssector').enable();
        this.postForm.get('rama').setValue('');
        this.postForm.get('srama').setValue('');
        this.branches = [] as Branch[];
        this.clases = [] as CatalogClass[];

        break;

      case 'rama':
        this.getRamasBySubsector(value);
        this.postForm.get('rama').enable();
        this.postForm.get('srama').setValue('');
        this.clases = [] as CatalogClass[];
        break;

      case 'subRama':
        this.getClassByRama(value);
        this.postForm.get('srama').enable();

        break;

      default:
        break;
    }
  }
  /**
   * Obtiene macrosectores para rellenar en input de form
   */
  getMacrosectors() {
    this.productServ.getMacrosectores().subscribe(
      (res) => {
        this.macrosectors = (res as any).lista;
        // console.log('macrosectores', this.macrosectors);
      },
      (err) => {
        // console.log(err);
      }
    );
  }
  /**
   * Obtiene sectores de macrosector especifico
   * @param variable ID de macrosector
   */
  getSectorsByMacrosectors(variable) {
    this.productServ.getSectorsByMacroSectors(variable).subscribe(
      (res) => {
        this.sectores = (res as any).lista;
        // console.log('sectores', this.sectores);
      },
      (err) => {
        // console.log(err);
      }
    );
  }
  /**
   * Obtiene subsectores de un sector en específico
   * @param variable ID de sector
   */
  getSubsectorsBySector(variable) {
    this.productServ.getSubsectorsBySector(variable).subscribe(
      (res) => {
        this.subSectores = (res as any).lista;
        // console.log('Subsectores', this.subSectores);
      },
      (err) => {
        // console.log(err);
      }
    );
  }
  /**
   * Obtiene ramas de un subsector esepcficico
   * @param variable ID de subsector
   */
  getRamasBySubsector(variable) {
    this.productServ.getRamasBySubsector(variable).subscribe(
      (res) => {
        this.branches = (res as any).lista;
        // console.log('Ramas', this.branches);
      },
      (err) => {
        // console.log(err);
      }
    );
  }
  /**
   * Obtiene clases de una Rama en especifico
   * @param variable ID de Rama
   */
  getClassByRama(variable) {
    this.productServ.getClassByRama(variable).subscribe(
      (res) => {
        this.clases = (res as any).lista;
        // console.log('Clases', this.clases);
      },
      (err) => {
        // console.log(err);
      }
    );
  }
  /**
   * Asigna el value correcto del input
   * @param event evento de form
   */
  onChange(event): void {
    const selected = event;
    // console.log(selected);
  }
  /**
   * valida el formulario para continuar y navega
   * a la siguiente vista
   */


  submit() {
    if (!this.postForm.valid) {
      return;
    }
    let id = Math.floor(Math.random() * (100 - 0)) + 0;

    // // console.log(this.postForm.value);
    // // console.log(this.postForm.value.categoria)
    this.store.dispatch(
      ProductActions.SetProductId({ productId: id.toString() })
    );

    // // console.log(this.postForm.value)
    const dispatchData = [
      {
        catProduct: this.postForm.value.categoria,
        catSubproduct: this.postForm.value.subCategoria,
        catSubSubproduct: this.postForm.value.subCategoria2,
      },
      {
        catProduct: this.postForm.value.oCategoria,
        catSubproduct: this.postForm.value.oCategoria2,
      },
    ];

     console.log(dispatchData)
    this.store.dispatch(
      ProductActions.SetProducCategories({ categories: dispatchData })
    );
    this.formStore.dispatch(FormActions.SetProductStep({ step: 'StepTree' }));
    this.router.navigateByUrl('/producto/certificado');
  }
}
