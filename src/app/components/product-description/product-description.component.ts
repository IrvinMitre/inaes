
import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { ProductInterface, ProductModel } from './../../models/product.model';
import * as ProductActions from './../../actions/produc.actions';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsStepsModel } from '../../models/formsStep.model';
import * as FormActions from './../../actions/formsSteps.actions';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit {

  constructor(
    private store: Store<{ product: ProductModel }>,
    private fb: FormBuilder, private router: Router,
    private formStore: Store<{ form: FormsStepsModel }>,
		private _ngZone: NgZone
  ) { }


	@ViewChild('autosize') autosize: CdkTextareaAutosize;
	triggerResize() {
		// Wait for changes to be applied, then trigger textarea resize.
		this._ngZone.onStable.pipe(take(1))
			.subscribe(() => this.autosize.resizeToFitContent(true));
	}


  postForm: FormGroup;

  ngOnInit(): void {
    this.postForm = this.fb.group({
      question1: ['', [Validators.required]],
      question2: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(150)]]
    });
  }

  submit() {
    this.store.dispatch(ProductActions.SetProducDescription({ whatIsIt: this.postForm.value.question1, whereItIs: this.postForm.value.question2, description: this.postForm.value.description }));
    this.formStore.dispatch(FormActions.SetProductStep({ step: 'StepFive' }));
    this.router.navigateByUrl('/producto/palabras-clave')
  }


}
