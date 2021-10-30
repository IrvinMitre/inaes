import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DirectoryService } from './../../services/directory.service';
import { ActivatedRoute, Params } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Overlay} from '@angular/cdk/overlay';
import {ViewEncapsulation} from '@angular/core';
import { AutofillMonitor } from '@angular/cdk/text-field';

export interface DialogData {
  key: string;
  service: string;

}
@Component({
  selector: 'ess-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {

  constructor(private auth: AuthService, private dirServ: DirectoryService, private route: ActivatedRoute, public dialog: MatDialog, public overlay: Overlay) { }

  serviceData: any;
  serviceId = this.route.snapshot.params.id;
  socialKey = this.route.snapshot.params.sk;
  contact: any;
  imageUrl: string;
  feactures: any;

  ngOnInit() {
    this.getService();
    this.getContact();
  }
  getService(){
    this.dirServ.getOnlyService(this.serviceId, this.socialKey).subscribe(
      res =>{
        this.serviceData = (res as any);
        console.log(this.serviceData);
        this.imageUrl = '.svg'
        this.feactures = (res as any).features;
      },
      err =>{
        console.log(err);
      }
    )
  }
  getContact (){
    this.dirServ.getEnterprise(this.socialKey).subscribe(
      res => {
        this.contact = (res as any);
        console.log(this.contact);
      }
    )
  }
  openDialog() {

    const dialogRef = this.dialog.open(ModalDialog8,{
      //scrollStrategy: overlay.scrollStrategies.noop(),
      height: 'auto',
      autoFocus: true,
      width: '100%',
      data: {service: this.serviceId, key: this.socialKey}

    });
  }
}
@Component({
  selector: 'dialog-serv',
  templateUrl: 'galeria.html',
  styleUrls: ['./destination.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalDialog8 {
  constructor(public dialog: MatDialog, private dirServ: DirectoryService, private auth: AuthService, private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  closeDialog() {
    const dialogRef = this.dialog.closeAll()
  }

  serviceData: any;
  serviceId: string;
  key: string;

  ngOnInit() {
    this.serviceId = this.data.service;
    this.key = this.data.key;
    this.getService();

  }
  async getService(){
    console.log(this.serviceId)
     await this.dirServ.getOnlyService(this.serviceId, this.key).subscribe(
      res =>{
        this.serviceData = (res as any);
        console.log(this.serviceData);

      },
      err =>{
        console.log(err);
      }
    )
  }

}

