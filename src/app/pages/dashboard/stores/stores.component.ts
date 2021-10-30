import { DirectoryService } from './../../../services/directory.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ess-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit {
  constructor(private fb: FormBuilder, private dirS: DirectoryService) { }
  postForm: FormGroup;
  ngOnInit() {
    this.postForm = this.fb.group({
      establecimiento: ['', [Validators.required]],
      direccion1: ['', [Validators.required]],
      mercado: ['', [Validators.required]],
      direccion2: ['', [Validators.required]],
      sMercado: ['', [Validators.required]],
      sMercados: ['', [Validators.required]],
      tienda: ['', [Validators.required]],
      eTienda: ['', [Validators.required]],
      selectVen: ['', [Validators.required]],
      url: ['', [Validators.required]],
    });
  }

  submit() {

  }
}
