import { ProductService } from './../../services/product.service';
import { ProductInterface } from './../../models/product.model';
import { DirectoryService } from './../../services/directory.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private dir: DirectoryService,
    private fb: FormBuilder,
    private router1: ActivatedRoute,
    private router: Router,
    private productServ: ProductService,
    private dirServ: DirectoryService
  ) {}
  otros='';
	baseUrl: string = environment.ipUrl
  idProduct = this.router1.snapshot.params.id;
  productData: ProductInterface;
  categories: any[];
  sub1: any[];
  sub2: any[];
  catalog: any[];
  otherSub: any[];
  lastSub: any[];
  flat: any[];
  third = false;
  array: any;

  url = '../../../assets/background-upload-image.jpg';
  url2 = '../../../assets/background-upload-image.jpg';
  url3 = '../../../assets/background-upload-image.jpg';
  url4 = '../../../assets/background-upload-image.jpg';
  url5= '../../../assets/background-upload-image.jpg';
  url6= '../../../assets/background-upload-image.jpg';
  url7= '../../../assets/background-upload-image.jpg';
  textImage1 = false;
  textImage2 = false;
  textImage3 = false;
  textImage4 = false;
  textImage5 = false;
  textImage6 = false;
  textImage7 = false;

  establecimiento: any[];
  SubEstablecimiento: any[];
  SubEstablecimiento2: any[];
  subs = [];
  subs2 = [];
  items: FormArray;
  dataForm: FormGroup;
  subsArray = [];
  comercializations: any;

  postForm = this.fb.group({
    //categorias
    categoria: ['', [Validators.required]],
    subCategoria: [''],
    subCategoria2: [''],
    oCategoria: [''],
    oCategoria2: [''],
    //certificacion
    cert1: [false],
    cert2: [false],
    cert3: [false],
    cert4: [false],

    //description
    question1: ['', [Validators.required]],
    question2: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.maxLength(150)]],
    //frase-clave
    pclave1: ['', [Validators.required]],
    //fotografia
    textoAlternativo: [''],
    textoAlternativo2: [''],
    textoAlternativo3: [''],
    //entrega
    entrega: ['', [Validators.required]],
    //pago
    efectivo: [],
    transferencia: [],
    tarjeta: [],
    codi: [],
    paypal: [],
    mercado: [],
    pago: [],
  });

  ngOnInit(): void {
    console.log(this.productData);
    this.dataForm = this.formBuilder.group({
      items: this.formBuilder.array([this.createItem()]),
    });
    this.getCategoriesCatalog();
    this.getProduct();
  }

  limpiar(e){
    e.prevetnDefault();
    this.otros = '';
  }

  async getProduct() {
    // console.log(this.idProduct, this.auth.getUserKey());
    await this.dir
      .getOnlyProduct(this.idProduct, this.auth.getUserKey())
      .subscribe(
        (res) => {
          this.productData = res as ProductInterface;
          this.comercializations = this.productData.comercializations;
          console.log(this.productData);
          // console.log(this.comercializations);

          for (
            let i = 0;
            i < Object.keys(this.comercializations).length - 1;
            i++
          ) {
            const data = this.comercializations[i];
            // console.log(data);
            this.addItem();
            console.log(data);

          }
          for (
            let i = 0;
            i < Object.keys(this.comercializations).length;
            i++
          ) {
            let type = this.comercializations[i].catCommercializationType;
            let description = this.comercializations[i].description;
            let subtype = this.comercializations[i].catCommercializationSubType;
            this.dataForm.controls.items['controls'][i].controls.nombre.value = type;
            // console.log(Object.keys(subtype).length);
            if (subtype != null) {
              for (
                let j = 0;
                j < (Object.keys(subtype).length)-1;
                j++
              ) {
                // console.log(subtype[j]);
                this.handleSubtypes(j, subtype[j]);
                // this.setCheckBox(j, subtype[j]);
                //this.postForm.get('subs'[j]).setValue(true);


              }
            }
            this.dataForm.controls.items['controls'][i].controls.direccion.value = description;
            console.log(this.dataForm.controls.items['controls'][i].controls.direccion.value);

          }
          //  this.setSubcategorie('sub1', this.productData.categories[0].catProduct);
          this.postForm.setValue({
            categoria: this.productData.categories[0].catProduct,
            subCategoria: this.productData.categories[0].catSubproduct,
            subCategoria2: this.productData.categories[0].catSubSubproduct,
            oCategoria: this.productData.categories[1].catProduct,
            oCategoria2: this.productData.categories[1].catSubproduct,
            // certificado
            cert1: false,
            cert2: false,
            cert3: false,
            cert4: false,
            //description
            question1: this.productData.whatIsIt,
            question2: this.productData.whereItIs,
            description: this.productData.description,
            //frase-clave
            pclave1: this.productData.tags[0].tag,
            //fotografia
            textoAlternativo: this.productData.pictures[0].description,
            textoAlternativo2: this.productData.pictures[1].description,
            textoAlternativo3: this.productData.pictures[2].description,
            //entrega
            entrega: this.productData.homeDelivery,
            //pago
            efectivo: false,
            transferencia: false,
            tarjeta: false,
            codi: false,
            paypal: false,
            mercado: false,
            pago: false,
          });

          for (
            let i = 0;
            i < Object.keys(this.productData.features).length;
            i++
          ) {
            // console.log(this.productData.features[i].type);
            switch (this.productData.features[i].type) {
              case 'Marca registrada': {
                this.url = this.productData.features[i].pictureRoute;
                this.postForm.controls.cert1.setValue(true);

              }
              case 'Denominación de origen': {
                this.url2 = this.productData.features[i].pictureRoute;
                this.postForm.controls.cert2.setValue(true);

              }
              case 'Sello de comercio justo': {
                this.url3 = this.productData.features[i].pictureRoute;
                this.postForm.controls.cert3.setValue(true);

              }
              case 'Producto orgánico': {
                this.url4 = this.productData.features[i].pictureRoute;
                this.postForm.controls.cert4.setValue(true);
              }
            }
          }


          for (
            let i = 0;
            i < Object.keys(this.productData.pictures).length;
            i++
          ) {
            //console.log(this.productData.pictures[i]);
            switch (this.productData.pictures[i].route) {
              case this.productData.pictures[0].route: {
                if (this.productData.pictures[0].route == null)
                  this.url5 = '../../../assets/background-upload-image.jpg';
                else {
                  this.url5 = this.productData.pictures[0].route;
                }
                break;
              }
              case this.productData.pictures[1].route: {
                if (this.productData.pictures[1].route == null)
                  this.url6 = '../../../assets/background-upload-image.jpg';
                else {
                  this.url6 = this.productData.pictures[1].route;
                  console.log(this.url6);
                }
                break;
              }
              case this.productData.pictures[2].route: {
                if (this.productData.pictures[2].route == null)
                  this.url7 = '../../../assets/background-upload-image.jpg';
                else {
                  this.url7 = this.productData.pictures[2].route;
                }
                break;
              }
              default:
            }
          }

          for (
            let i = 0;
            i < Object.keys(this.productData.paymentMethods).length;
            i++
          ) {
            //console.log(this.productData.paymentMethods[i].catPayment);
            switch (this.productData.paymentMethods[i].catPayment) {
              case 'Efectivo': {
                this.postForm.get('efectivo').setValue(true);
                break;
              }
              case 'Transferencia': {
                this.postForm.get('transferencia').setValue(true);
                break;
              }
              case 'Tarjeta': {
                this.postForm.get('tarjeta').setValue(true);
                break;
              }
              case 'Codi': {
                this.postForm.get('codi').setValue(true);
                //console.log("SetEfectivo");
                break;
              }
              case 'Paypal': {
                this.postForm.get('paypal').setValue(true);
                break;
              }
              case 'Mercado Pago': {
                this.postForm.get('mercado').setValue(true);
                break;
              }
              case 'Pago contra entrega': {
                this.postForm.get('pago').setValue(true);
                break;
              }
              default:
            }
          }
          // console.log(this.url, this.url2, this.url3, this.url4, this.url5, this.url7)
        },
        (err) => {}
      );

    /** if (this.productData.features[0].pictureRoute) {
      this.url = this.productData.features[0].pictureRoute;
    } else {
      this.url = '../../../assets/background-upload-image.jpg';
    }
    if (this.productData.features[1].pictureRoute) {
      this.url2 = this.productData.features[1].pictureRoute;
    } else {
      this.url2 = '../../../assets/background-upload-image.jpg';
    }
    if (this.productData.features[2].pictureRoute) {
      this.url3 = this.productData.features[2].pictureRoute;
    } else {
      this.url3 = '../../../assets/background-upload-image.jpg';
    }
    if (this.productData.features[3].pictureRoute) {
      this.url4 = this.productData.features[3].pictureRoute;
    } else {
      this.url4 = '../../../assets/background-upload-image.jpg';
    }
    if (this.productData.pictures[0].route !="") {
      console.log(this.productData.pictures[0].route)
      this.url5 = this.productData.pictures[0].route;
    } else {
      this.url5 = '../../../assets/background-upload-image.jpg';
    }
    if (this.productData.pictures[1].route) {
      this.url6 = this.productData.pictures[1].route;
    } else {
      this.url6 = '../../../assets/background-upload-image.jpg';
    }
    if (this.productData.pictures[2].route) {
      this.url7 = this.productData.pictures[2].route;
    } else {
      this.url7 = '../../../assets/background-upload-image.jpg';
    }
   */ // console.log(this.productData.paymentMethods)
  }
  setSubcategorie(nextCategorie, value) {
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
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      if(event.target.files[0].size < 200000){
        this.textImage1 = false;
      const formData = new FormData();
      // {
      //  type: string,
      //  pictureRoute: string
      //  }
      formData.append('files', event.target.files[0]);
      formData.append('directory', this.auth.getUserKey());
      formData.append('subDirectory', 'producto-certificacion');

      this.dirServ.imageUpload(formData).subscribe(
        (res) => {
          let imge = (res as any).message;
          let imarl = imge.slice(1, -1);
           this.url = `${this.baseUrl}/${imarl}`;
           console.log(this.url);
        },
        (err) => {
          console.log(err);
        }
      );
      }
      else{
        this.textImage1 = true;
      }
    }
  }
  onSelectFile2(event) {
    if (event.target.files && event.target.files[0]) {
      if(event.target.files[0].size < 200000){
        this.textImage2 = false;
      const formData = new FormData();
      // {
      //  type: string,
      //  pictureRoute: string
      //  }
      formData.append('files', event.target.files[0]);
      formData.append('directory', this.auth.getUserKey());
      formData.append('subDirectory', 'producto-certificacion');
      this.dirServ.imageUpload(formData).subscribe(
        (res) => {
          let imge = (res as any).message;
         let imarl = imge.slice(1, -1);
          this.url2 = `${this.baseUrl}/${imarl}`;
          console.log(this.url);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    else{
      this.textImage2 = true;
    }
    }
  }
  onSelectFile3(event) {
    if (event.target.files && event.target.files[0]) {
      if(event.target.files[0].size < 200000){
        this.textImage3 = false;
      const formData = new FormData();
      // {
      //  type: string,
      //  pictureRoute: string
      //  }
      formData.append('files', event.target.files[0]);
      formData.append('directory', this.auth.getUserKey());
      formData.append('subDirectory', 'producto-certificacion');

      this.dirServ.imageUpload(formData).subscribe(
        (res) => {
          let imge = (res as any).message;
         let imarl = imge.slice(1, -1);
          this.url3 = `${this.baseUrl}/${imarl}`;
          console.log(this.url);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    else{
      this.textImage3 = true;
    }
    }
  }
  onSelectFile4(event) {
    if (event.target.files && event.target.files[0]) {
      if(event.target.files[0].size < 200000){
        this.textImage4 = false;
      const formData = new FormData();
      // {
      //  type: string,
      //  pictureRoute: string
      //  }
      formData.append('files', event.target.files[0]);
      formData.append('directory', this.auth.getUserKey());
      formData.append('subDirectory', 'producto-certificacion');

      this.dirServ.imageUpload(formData).subscribe(
        (res) => {
          let imge = (res as any).message;
         let imarl = imge.slice(1, -1);
          this.url4 = `${this.baseUrl}/${imarl}`;
          console.log(this.url);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    else{
      this.textImage4 = true;
    }
    }
  }
  onSelectFile5(event) {
    if (event.target.files && event.target.files[0]) {
      if(event.target.files[0].size < 200000){
        this.textImage5 = false;
      const formData = new FormData();
      // {
      //  type: string,
      //  pictureRoute: string
      //  }
      formData.append('files', event.target.files[0]);
      formData.append('directory', this.auth.getUserKey());
      formData.append('subDirectory', 'producto-fotografia');

      this.dirServ.imageUpload(formData).subscribe(
        res => {
          let imge = (res as any).message;
          let imarl = imge.slice(1, -1);
           this.url5 = `${this.baseUrl}/${imarl}`;
           console.log(this.url5);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    else{
      this.textImage5 = true;
    }
    }
  }
  onSelectFile6(event) {
    //console.log('sel2');
    if (event.target.files && event.target.files[0]) {
      if(event.target.files[0].size < 200000){
        this.textImage6 = false;
      const formData = new FormData();
      // {
      //  type: string,
      //  pictureRoute: string
      //  }
      formData.append('files', event.target.files[0]);
      formData.append('directory', this.auth.getUserKey());
      formData.append('subDirectory', 'producto-fotografia');

      this.dirServ.imageUpload(formData).subscribe(
        res => {
          let imge = (res as any).message;
          let imarl = imge.slice(1, -1);
           this.url6 = `${this.baseUrl}/${imarl}`;
           console.log(this.url6);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    else{
      this.textImage6 = true;
    }
    }
  }
  onSelectFile7(event) {
    console.log('sel3');
    if (event.target.files && event.target.files[0]) {
      if(event.target.files[0].size < 200000){
        this.textImage7 = false;
      const formData = new FormData();
      // {
      //  type: string,
      //  pictureRoute: string
      //  }
      formData.append('files', event.target.files[0]);
      formData.append('directory', this.auth.getUserKey());
      formData.append('subDirectory', 'producto-fotografia');

      this.dirServ.imageUpload(formData).subscribe(
        res => {
          let imge = (res as any).message;
          let imarl = imge.slice(1, -1);
           this.url7 = `${this.baseUrl}/${imarl}`;
           console.log(this.url7);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    else{
      this.textImage7 = true;
    }
    }
  }

  erase1(e){
    e.preventDefault()
    this.url='../../../assets/background-upload-image.jpg';
  }
  erase2(e){
    e.preventDefault()
    this.url2='../../../assets/background-upload-image.jpg';
  }
  erase3(e){
    e.preventDefault()
    this.url3='../../../assets/background-upload-image.jpg';
  }
  erase4(e){
    e.preventDefault()
    this.url4='../../../assets/background-upload-image.jpg';
  }

  getCategoriesCatalog() {
    this.productServ.getCategoriesCatalog().subscribe(
      (res) => {
        this.catalog = (res as any).filter(
          (catalog) => catalog.catalogId === 'catProduct'
        );
        this.categories = this.catalog[0].products.map(
          (product) => product.product
        );
        // console.log(this.catalog);
        // this.catalog[0].products.map(product => product.product);

        // console.log(this.categories);
      },
      (err) => {
        // console.log(err);
      }
    );
    this.productServ.getAditional().subscribe(
      (res) => {
        this.establecimiento = (res as any).types; //filter(establecimiento =>establecimiento.types==="types");
        // console.log('estableciento', this.establecimiento);
      },
      (err) => {
        // // console.log(err);
      }
    );
  }
  select(e) {
    console.log(e);
    switch (e) {
      case 'Súper mercado':
        document.getElementById('direccion').style.display = 'none';
        break;
      case 'Tiendas de conveniencia ':
        document.getElementById('direccion').style.display = 'none';
        break;
      case 'Tiendas departamentales':
        document.getElementById('direccion').style.display = 'none';
        break;
      default:
        document.getElementById('direccion').style.display = 'block';
        break;
    }
  }

  createItem(): FormGroup {
    this.subsArray.push([]);
    return this.formBuilder.group({
      nombre: ['', [Validators.required]],
      direccion: [''],
      subs: [],
    });
  }



  addItem(): void {
    this.items = this.dataForm.get('items') as FormArray;
    this.items.push(this.createItem());
    console.log(this.items);
  }

  setCheckBox(index: number, name: string){
    console.log(this.dataForm.controls.items['controls'][index]);
  }
  onmatChip(){
    console.log( document.getElementById('otro'))
  }

  handleSubtypes(index: number, name: string) {

    if (!this.dataForm.controls.items['controls'][index].controls.subs.value) {
      this.dataForm.controls.items['controls'][index].controls.subs.value = [
        name,
      ];
      console.log(this.dataForm.controls.items['controls'][index].controls.subs.value);
    } else {
      this.dataForm.controls.items['controls'][
        index
      ].controls.subs.value.filter((value) => value === name).length === 0
        ? this.dataForm.controls.items['controls'][
            index
          ].controls.subs.value.push(name)
        : this.dataForm.controls.items['controls'][
            index
          ].controls.subs.value.pop(name);
    }

    // console.log('taman', this.dataForm.controls.items['controls'][index].controls.subs.value.length);
    // console.log('direc', this.dataForm.controls.items['controls'][index].controls.direccion);

    if (
      this.dataForm.controls.items['controls'][index].controls.subs.value
        .length > 0
    ) {
      // console.log('eliminar');
      this.dataForm.controls.items['controls'][
        index
      ].controls.direccion.reset();
      this.dataForm.controls.items['controls'][
        index
      ].controls.direccion.disable();
    } else {
      this.dataForm.controls.items['controls'][
        index
      ].controls.direccion.enable();
    }

    // console.log(this.dataForm.controls.items['controls'][index].controls);
  }

  setSubtypeArray(index: number, value: any) {
    this.dataForm.controls.items['controls'][index].controls.direccion.enable();

    let valueEnd = value.type;
    this.subsArray[index] = this.establecimiento.filter(
      (SubEstablecimiento) => SubEstablecimiento.type === valueEnd
    )[0].subtypes; //this.establecimiento[0].subtypes
    if (this.subsArray[index].length > 0) {
      for (let i = 0; i < this.subsArray[index].length; i++) {
        this.subsArray[index][i].checked = false;
      }
    }
    // // console.log(this.subsArray[index])
  }

  submit() {
    //Descripcion

    this.productData.whatIsIt = this.postForm.value.question1;
    this.productData.whereItIs = this.postForm.value.question2;
    this.productData.description = this.postForm.value.description;

    //entrega
    this.productData.homeDelivery = this.postForm.value.entrega;

    let dispatchData1 = [];

    for (let i = 0; i < this.dataForm.controls.items['controls'].length; i++) {
      dispatchData1.push({
        catCommercializationType: this.dataForm.controls.items['controls'][i].controls.nombre.value,
        description: this.dataForm.controls.items['controls'][i].controls.direccion.value,
        catCommercializationSubType: this.dataForm.controls.items['controls'][i].controls.subs.value,
      })
    }
    this.productData.comercializations = dispatchData1;

    //categoria
    // objeto
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
    this.productData.categories = dispatchData;

    //Cerificado
    const features = [];

    if (this.postForm.value.cert1)
      features.push({
        type: 'Marca registrada',
        pictureRoute: this.url,
      });

    if (this.postForm.value.cert2)
      features.push({
        type: 'Denominación de origen',
        pictureRoute: this.url2,
      });

    if (this.postForm.value.cert3)
      features.push({
        type: 'Sello de comercio justo',
        pictureRoute: this.url3,
      });

    if (this.postForm.value.cert4)
      features.push({
        type: 'Producto orgánico',
        pictureRoute: this.url4,
      });

    this.productData.features = features;
    //palabras clave
    const clave = [
      {
        tag: this.postForm.value.pclave1,
      },
    ];
    this.productData.tags = clave;

    //fotografia
    const fotografia = [
      {
        route: this.url5,
        description: this.postForm.value.textoAlternativo,
      },
      {
        route: this.url6,
        description: this.postForm.value.textoAlternativo2,
      },
      {
        route: this.url7,
        description: this.postForm.value.textoAlternativo3,
      },
    ];
    this.productData.pictures = fotografia;
    //metodos de pago
    //objeto
    let pago = [
      {
        catPayment: this.postForm.value.efectivo ? 'Efectivo' : null,
      },
      {
        catPayment: this.postForm.value.transferencia ? 'Transferencia' : null,
      },
      {
        catPayment: this.postForm.value.tarjeta ? 'Tarjeta' : null,
      },
      {
        catPayment: this.postForm.value.codi ? 'Codi' : null,
      },
      {
        catPayment: this.postForm.value.paypal ? 'Paypal' : null,
      },
      {
        catPayment: this.postForm.value.mercado ? 'Mercado Pago' : null,
      },
      {
        catPayment: this.postForm.value.pago ? 'Pago contra entrega' : null,
      },
    ];

    this.productData.paymentMethods = pago;

    //socialNetworks
    //objeto
    let key = this.auth.getUserKey();
    console.log(this.productData);
    this.productServ
      .pathProduct(
        this.productData,
        this.productData.socialEnterpriseKey,
        this.idProduct
      )
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    this.router.navigateByUrl('/dashboard/productos');
  }
}
