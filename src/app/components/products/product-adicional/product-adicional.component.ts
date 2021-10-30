import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { ProductModel } from '../../../models/product.model';
import * as ProductActions from '../../../actions/produc.actions';
import { Store } from '@ngrx/store';
import { FormsStepsModel } from '../../../models/formsStep.model';
import * as FormActions from '../../../actions/formsSteps.actions';
/**
 * @ignore
 */
@Component({
  selector: 'app-product-adicional',
  templateUrl: './product-adicional.component.html',
  styleUrls: ['./product-adicional.component.scss']
})
export class ProductAdicionalComponent implements OnInit {
  /**
   *
   * @param fb variable para crear form reactivo
   * @param router variable para realizar enrutamentiento
   * @param productServ variable con servicios de ProductServ
   */


  constructor(private formBuilder: FormBuilder, private store: Store<{ product: ProductModel }>, private fb: FormBuilder, private router: Router, private productServ: ProductService, private formStore: Store<{ form: FormsStepsModel }>) { }
  postForm: FormGroup;
  establecimiento: any[];
  flat: any[];
  SubEstablecimiento: any[];
  SubEstablecimiento2: any[];
  items: FormArray;
  dataForm: FormGroup;
  otro = false;
  opc: any[];
  opc1: any[];
  temp: any;
  cont= 0;
  tem: any;

  subs = [];
  subs2 = [];

  subsArray = [];

  ngOnInit(): void {
    this.dataForm = this.formBuilder.group({
      items: this.formBuilder.array([this.createItem()])
    })

    // addItem() llamar dentro de un for que sea menos uno el tamaño del objeto que se tiene que llenar

    // // console.log(this.dataForm);

    //una vez creados los forms correspondientes para el array de items, se crea otro for dodne se van a llenar

    this.getCategoriesCatalog();
  }

  select(i,e){
    this.temp = e;
    this.tem = e;
    console.log(e)

      switch (this.temp) {
        case "Súper mercado":
          document.getElementById(i).style.display = "none";
          break;
        case "Tiendas de conveniencia ":
          document.getElementById(i).style.display = "none";
          break;
        case "Tiendas departamentales":
          document.getElementById(i).style.display = "none";
          break;
          case "Almácenes":
            document.getElementById(i).style.display = "none";
            break;
        case "Tienda en línea propia":
          //document.getElementById("online").style.display = "none";
          document.getElementById("online"+i).style.display = "none";
          document.getElementById("online2"+i).style.display = "block";
          break;
          case "Tienda en línea externa (Amazon, Mercado libre, Linio, otra.)":
            //document.getElementById("online").style.display = "none";
            document.getElementById("online"+i).style.display = "none";
            document.getElementById("online2"+i).style.display = "block";
            break;
        default:
          document.getElementById("online"+i).style.display = "block";
          document.getElementById("online2"+i).style.display = "none";
          document.getElementById(i).style.display = "block";

          break;


      }

    }

select2(e){
  /**
   * console.log(e);
  this.opc = this.opc.filter(opc => opc.type !== e);
  console.log(this.opc);
  */

  const newData = this.opc1[this.opc1.length-1].filter(obj => obj.type !== e);
  this.opc1.push(newData);
  console.log(this.opc1);
}


  /**
   * obtiene catalago de categorias
   */
  getCategoriesCatalog() {
    this.productServ.getAditional().subscribe(
      res => {
        this.establecimiento = (res as any).types ;
        this.opc = (res as any).types;
        this.opc1=[]
        this.opc1.push(this.opc);
        console.log(this.opc1);
      },
      err => {
        // // console.log(err);
      }
    );
  }



  /**
   * Obtiene subcategorias por medio de un switch que compara su valor
   * para llenar input de form correspondiente
   * @param value Valor que compara el nivel de subcategoria
   */


  createItem(): FormGroup {
    this.cont ++;
    this.subsArray.push([]);
    return this.formBuilder.group({
      nombre: ['', [Validators.required]],
      direccion: [''],
      subs: []
    });


  }

  addItem(): void {
    this.items = this.dataForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  handleSubtypes(index: number, name: string) {
    console.log(name);
    
    if (!this.dataForm.controls.items['controls'][index].controls.subs.value) {
      this.dataForm.controls.items['controls'][index].controls.subs.value = [name];
    } else {

      (this.dataForm.controls.items['controls'][index].controls.subs.value.filter(value => value === name).length === 0)
        ? this.dataForm.controls.items['controls'][index].controls.subs.value.push(name)
        : this.dataForm.controls.items['controls'][index].controls.subs.value.pop(name)
    }

    // console.log('taman', this.dataForm.controls.items['controls'][index].controls.subs.value.length);
    // console.log('direc', this.dataForm.controls.items['controls'][index].controls.direccion);

    if (this.dataForm.controls.items['controls'][index].controls.subs.value.length > 0) {
      // console.log('eliminar');
      this.dataForm.controls.items['controls'][index].controls.direccion.reset();
      this.dataForm.controls.items['controls'][index].controls.direccion.disable();
    } else {
      this.dataForm.controls.items['controls'][index].controls.direccion.enable();
    }
    // console.log(this.dataForm.controls.items['controls'][index].controls);
  }

  setSubtypeArray(index: number, value: any) {
    this.dataForm.controls.items['controls'][index].controls.direccion.enable();

    let valueEnd = value.type;
    this.subsArray[index] = this.establecimiento.filter(SubEstablecimiento => SubEstablecimiento.type === valueEnd)[0].subtypes //this.establecimiento[0].subtypes
    if (this.subsArray[index].length > 0) {
      document.getElementById("direccion").style.display = "none";
      for (let i = 0; i < this.subsArray[index].length; i++) {
        this.subsArray[index][i].checked = false;
      }
    }
    // // console.log(this.subsArray[index])
  }
  /**
   * valida si form es valida para avanzar y
   * navega a la siguiente vista
   */
  submit() {
    // console.log(this.dataForm.controls.items['controls']);

    if (!this.dataForm.valid) {
      return;
    }

    let dispatchData = [];

    for (let i = 0; i < this.dataForm.controls.items['controls'].length; i++) {
      dispatchData.push({
        catCommercializationType: this.dataForm.controls.items['controls'][i].controls.nombre.value,
        description: this.dataForm.controls.items['controls'][i].controls.direccion.value,
        catCommercializationSubType: this.dataForm.controls.items['controls'][i].controls.subs.value,
      })
    }

    // console.log(dispatchData);


    this.store.dispatch(ProductActions.SetProducComercializations({ comercializations: dispatchData }));
    this.formStore.dispatch(FormActions.SetProductStep({ step: 'StepNine' }));
    this.router.navigateByUrl('/producto/pago')
  }
}
