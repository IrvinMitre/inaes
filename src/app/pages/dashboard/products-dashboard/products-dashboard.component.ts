import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { EnterpriseModel } from '../../../models/productRequest.model';
import { State, Store } from '@ngrx/store';
@Component({
  selector: 'ess-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.scss']
})
export class ProductsDashboardComponent implements OnInit {

  constructor(private auth: AuthService, private productServ: ProductService, private state: State<EnterpriseModel>) { }

  productData: any[];

  ngOnInit() {

    this.productServ.getProduct(this.auth.getUserKey()).subscribe(
      res => {
        this.productData = (res as any);
        console.log(this.productData);
        console.log(this.productData[0].features.pictureRoute);
      },
      err => {
        // console.log(err);
      }
    )
  }

}
