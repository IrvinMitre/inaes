import { CatalogService } from 'src/app/services/catalog.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, OnChanges, NgModule } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  Router,
  Event,
  NavigationStart,
  RoutesRecognized,
  RouteConfigLoadStart,
  RouteConfigLoadEnd,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { DirectoryService } from './../../services/directory.service';
export interface ProductCard {
  products: [{_id: string;
    socialEnterpriseKey: string;
    description: string
    whatIsIt: string;
    whereItIs: string;
    categories: [
      {
        catProduct: string;
      },
      {
        catProduct: string;
      }
    ];
    pictures: [
      {
        route: string;
      }
    ];}]

}

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
})
export class ProductCategoryComponent implements OnInit {
  constructor(
    private producServ: ProductService,
    private auth: AuthService,
    private cat: CatalogService,
    private route: ActivatedRoute,
    private router: Router,
    private dirServ: DirectoryService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.subcat = this.route.snapshot.params.id;

      this.ngOnInit();
    });

  }
  panelOpenState = false;
  filtros = true;
  productData: ProductCard;
  productDatas: any;
  categoria: any[];
  categProduct: any[];
  searched = 'Todos';
  quantity = 0;
  subcat = this.route.snapshot.params.id;
  like = false;
  background: any;
  title: any;
  subTitle: any;


  ngOnInit() {
    console.log('init');
    if (this.route.snapshot.queryParams['parent']) {
      // console.log('con subtitulo: ', this.route.snapshot.queryParams['parent']);

      this.subtitlec(this.route.snapshot.queryParams['parent'],this.route.snapshot.params.id);
    } else {
      this.changeTitle(this.route.snapshot.params.id);
    }

    this.getProduct();


  }
  changeLike() {
    this.like = !this.like;
  }
  subtitlecsub(title, sub, subsub){
    this.quantity= 0;

    this.title = title;
    this.dirServ.getProductoCategoriaSub(title, sub).subscribe(
      (res) => {
        let temp;
        this.productDatas = (res as ProductCard).products;

       console.log(this.productDatas)
      },
      (err) => {
        // console.log(err);
      }
    );
    let dataa = this.productDatas.categories.filter(function(i){
      return i.catSubSubproduct = subsub;
    })
    console.log(dataa)


    switch (title) {
      case 'Artesanías de México':
        this.background = 'artesaniasdeM';
        break;
        case 'Bebidas de México':
          this.background = 'bebidasdeM';
          break;
        case 'Bebidas de México':
          this.background = 'bebidasdeM';
          break;
        case 'Blancos':
          this.background = 'Blancos';
          break;
        case 'Calzado':
          this.background = 'calzado';
          break;
        case 'Cuidado personal':
          this.background = 'cudadoP';
          break;
        case 'De exportación':
          this.background = 'deexport';
          break;
        case 'De temporada':
          this.background = 'deTemp';
          break;
        case 'Hogar, muebles y decoración':
          this.background = 'hmd';
          break;
        case 'Joyería y accesorios':
          this.background = 'joyeriaYa';
          break;
        case 'Listo para comer':
          this.background = 'listpc';
          break;
        case 'Piedras y minerales':
          this.background = 'piedrasymine';
          break;
        case 'Ropa, calzado y blancos':
          this.background = 'ropacalz';
          break;
        case 'Despensa':
          this.background = 'Despensa';
          break;
    }
    this.subTitle = sub;

  }

  subtitlec(title, sub) {
    this.quantity= 0;

    this.title = title;
    this.dirServ.getProductoCategoriaSub(title, sub).subscribe(
      (res) => {
         this.productData = (res as any);
         if(res != null){
         this.quantity = ((res as any).products).length;}
         console.log(this.productData)
      },
      (err) => {
        // console.log(err);
      }
    );

    switch (title) {
      case 'Artesanías de México':
        this.background = 'artesaniasdeM';
        break;
        case 'Bebidas de México':
          this.background = 'bebidasdeM';
          break;
        case 'Bebidas de México':
          this.background = 'bebidasdeM';
          break;
        case 'Blancos':
          this.background = 'Blancos';
          break;
        case 'Calzado':
          this.background = 'calzado';
          break;
        case 'Cuidado personal':
          this.background = 'cudadoP';
          break;
        case 'De exportación':
          this.background = 'deexport';
          break;
        case 'De temporada':
          this.background = 'deTemp';
          break;
        case 'Hogar, muebles y decoración':
          this.background = 'hmd';
          break;
        case 'Joyería y accesorios':
          this.background = 'joyeriaYa';
          break;
        case 'Listo para comer':
          this.background = 'listpc';
          break;
        case 'Piedras y minerales':
          this.background = 'piedrasymine';
          break;
        case 'Ropa, calzado y blancos':
          this.background = 'ropacalz';
          break;
        case 'Despensa':
          this.background = 'Despensa';
          break;
    }
    this.subTitle = sub;
  }
  changeTitle(title) {
    this.quantity= 0;
    this.subTitle = '';
    this.title = title;
    this.dirServ.getProductoCategoria(title).subscribe(
      (res) => {
         this.productData = (res as ProductCard);
         this.quantity = ((res as any).products).length;
      },
      (err) => {
        // console.log(err);
      }
    );

    //  this.productData = this.productDatas.filter(toris => toris.categories[0].catService == this.title)

    switch (title) {
      case 'Artesanías de México':
        this.background = 'artesaniasdeM';

        break;
      case 'Bebidas de México':
        this.background = 'bebidasdeM';
        break;
      case 'Bebidas de México':
        this.background = 'bebidasdeM';
        break;
      case 'Blancos':
        this.background = 'Blancos';
        break;
      case 'Calzado':
        this.background = 'calzado';
        break;
      case 'Cuidado personal':
        this.background = 'cudadoP';
        break;
      case 'De exportación':
        this.background = 'deexport';
        break;
      case 'De temporada':
        this.background = 'deTemp';
        break;
      case 'Hogar, muebles y decoración':
        this.background = 'hmd';
        break;
      case 'Joyería y accesorios':
        this.background = 'joyeriaYa';
        break;
      case 'Listo para comer':
        this.background = 'listpc';
        break;
      case 'Piedras y minerales':
        this.background = 'piedrasymine';
        break;
      case 'Ropa, calzado y blancos':
        this.background = 'ropacalz';
        break;
      case 'Despensa':
        this.background = 'Despensa';
        break;
    }
  }
  setFiltro() {
    this.filtros = !this.filtros;
  }
  getProduct() {
    this.producServ.getCategoriesCatalog().subscribe(
      (res) => {
        this.categProduct = (res as any).filter(
          (cat) => cat.catalogId === 'catProduct'
        )[0].products;
        console.log(this.categProduct);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  searchProduct(value: string) {
    // console.log(value);
    this.searched = value;


    this.quantity = 0;
    //console.log('buscado', value);

    this.dirServ.getProductoCategoria(value).subscribe(
      (res) => {
         this.productData = (res as any);
         this.quantity = ((res as any).products).length;

      },
      (err) => {
        // console.log(err);
      }
    );
  }


}
