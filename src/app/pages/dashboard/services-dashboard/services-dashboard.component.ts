import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'ess-services-dashboard',
  templateUrl: './services-dashboard.component.html',
  styleUrls: ['./services-dashboard.component.scss']
})
export class ServicesDashboardComponent implements OnInit {

  constructor(private auth: AuthService, private productServ: ProductService) { }

  ServiceData: any[];

  ngOnInit() {
    this.productServ.getService(this.auth.getUserKey()).subscribe(
      res => {
        // console.log(res);
        this.ServiceData = (res as any);
      },
      err => {
        // console.log(err);
      }
    )
  }

}
