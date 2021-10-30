import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from './../../../validators/validators';

import { AuthService } from 'src/app/services/auth.service';
import { DirectoryService } from './../../services/directory.service';
import {
  EnterpriseInterface,
  EnterpriseModel,
} from '../../models/productRequest.model';


@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {

  constructor( private fb: FormBuilder,

    private auth: AuthService,
    private dirServ: DirectoryService){}
  hide2 = true;
  hide = true;
  postForm = this.fb.group({

    Nucontrasena: [
      '',
      [
        Validators.required,
        CustomValidator.validatePaswword,
        Validators.maxLength(12),
        Validators.minLength(8),
      ],
    ],
    NuCcontrasena: [
      '',
      [
        Validators.required,
        CustomValidator.validatePaswword,
        Validators.maxLength(12),
        Validators.minLength(8),
      ],
    ],
  });

  ngOnInit(): void {
  }
  submit(){}

}
