import { Component, OnInit } from '@angular/core';
import { DirectoryService } from '../../../services/directory.service';
import { EnterpriseInterface } from '../../../models/productRequest.model';
import { ProductService } from '../../../services/product.service';
import { ProductInterface } from '../../../models/product.model';

@Component({
  selector: 'app-no-approved',
  templateUrl: './no-approved.component.html',
  styleUrls: ['./no-approved.component.scss']
})
export class NoApprovedComponent implements OnInit {

  constructor(private direcServ: DirectoryService, private producServ: ProductService) { }
  panelOpenState = false;
  empresas: any[];
  productData1: any[];
  divide= true;
  enterpriseData: EnterpriseInterface;
  productData: ProductInterface;
  patchProduct: ProductInterface
  tru = true;
  fal = false;
  enterpriseDataShow: EnterpriseInterface;
  col = true;
  desEmpresa= true;

  ngOnInit(): void {
    this.direcServ.getEnterprises().subscribe(
      res => {
        this.empresas= res as any;
        console.log(this.empresas)

            },
      err => {
        // console.log(err);
      }
    );
  }
  changeDivide(value) {
    this.divide = value;
    if (value == false) {
      this.col = false;
    }
  }
  changeCol(value) {
    this.col = value;
  }
  refresh(){
    window.location.reload();
}
  async changeAprova(key, active) {
    await this.direcServ.getEnterprise(key).subscribe(
      (res) => {
        this.enterpriseData = res as EnterpriseInterface;
         if(active===true){
          this.enterpriseData.createdAccount = true;

        }
        else{
          this.enterpriseData.createdAccount = false;
        }


        this.direcServ.updateProfileData(this.enterpriseData, key).subscribe(
          (res) => {
            console.log(res);
            alert("Empresa actualizada");
            this.refresh()
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        // console.log(err);
      }
    );
    this.ngOnInit();

  }
  async changeAprovaI(id, key, active) {
     await this.direcServ.getOnlyProduct(id, key)
      .subscribe(
        (res) => {
          this.productData = res as ProductInterface;
          this.productData.aprovedItem = active;
          this.producServ
            .pathProduct(
              this.productData,
              this.productData.socialEnterpriseKey,
              id
            )
            .subscribe(
              (res) => {
                console.log(res);
                alert("Producto actualizado");
                this.refresh()
              },
              (err) => {
                console.log(err);
              }
            );

        },
        err => {
          // console.log(err);
        }
      );
      this.ngOnInit();
  }

  product(key) {
    this.desEmpresa= false;
    this.direcServ.getEnterprise(key).subscribe(
      res=> {
        this.enterpriseDataShow = res as EnterpriseInterface;
console.log(this.enterpriseDataShow)
      },
      err=>{

      }
    )
    this.producServ.getProduct(key).subscribe(
      res => {

        this.productData1 = (res as any);
        console.log(this.productData1)
      },
      err => {
        // console.log(err);
      }
    )

  }
  async changeCertA(product_id, socialkey, cert) {
    console.log(product_id, socialkey, cert);
    await this.direcServ.getOnlyProduct(product_id,socialkey).subscribe(
      res => {
        this.patchProduct = (res as any);
        console.log(this.patchProduct);
        for(const features in this.patchProduct.features){
          // console.log(features);
          if(this.patchProduct.features[features].type === cert){
            this.patchProduct.features[features].aprovedCertification = 'Aceptado';
            this.producServ.pathProduct(this.patchProduct, this.patchProduct.socialEnterpriseKey, product_id).subscribe(
              res=>{
                console.log(res);
                alert('certificado aceptado');
                this.refresh();
              },
              err=>{
                console.log(err);
              }
            )
          }
        }
        },
      err => {
        console.log(err);
      }
    )
  }

  async changeCertN(product_id, socialkey, cert) {
    console.log(product_id, socialkey, cert);
    await this.direcServ.getOnlyProduct(product_id,socialkey).subscribe(
      res => {
        this.patchProduct = (res as any);
        console.log(this.patchProduct);
        for(const features in this.patchProduct.features){
          // console.log(features);
          if(this.patchProduct.features[features].type === cert){
            this.patchProduct.features[features].aprovedCertification = 'No Aceptado';
            this.producServ.pathProduct(this.patchProduct, this.patchProduct.socialEnterpriseKey, product_id).subscribe(
              res=>{
                console.log(res);
                alert('certificado no aceptado');
                this.refresh();
              },
              err=>{
                console.log(err);
              }
            )
          }
        }
        },
      err => {
        console.log(err);
      }
    )
  }
  async changeCertI(product_id, socialkey, cert) {
    console.log(product_id, socialkey, cert);
    await this.direcServ.getOnlyProduct(product_id,socialkey).subscribe(
      res => {
        this.patchProduct = (res as any);
        console.log(this.patchProduct);
        for(const features in this.patchProduct.features){
          // console.log(features);
          if(this.patchProduct.features[features].type === cert){
            this.patchProduct.features[features].aprovedCertification = 'No Identificado';
            this.producServ.pathProduct(this.patchProduct, this.patchProduct.socialEnterpriseKey, product_id).subscribe(
              res=>{
                console.log(res);
                alert('certificado no identificado');
                this.refresh();
              },
              err=>{
                console.log(err);
              }
            )
          }
        }
        },
      err => {
        console.log(err);
      }
    )
  }


}
