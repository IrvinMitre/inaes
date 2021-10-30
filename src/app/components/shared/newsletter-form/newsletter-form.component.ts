import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { NewsletterService } from '../../../services/mailchimp/newsletter.service';

@Component({
  selector: 'app-newsletter-form',
  templateUrl: './newsletter-form.component.html',
  styleUrls: ['./newsletter-form.component.scss']
})
export class NewsletterFormComponent implements OnInit {

  subscribeData: any = <any>{};
  value: string = "";
  class: string = "";
  
  constructor(
    private NewsletterService: NewsletterService
  ) { }

  ngOnInit(): void {
  }


  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un correo.';
    }
    return this.email.hasError('email') ? 'No es un correo valido' : '';
  }

  subscribe(subscribeForm: NgForm) {
    this.NewsletterService.subscribeToList(this.subscribeData)
      .subscribe(res => {
        this.class = res['result'];
        this.value = this.controllErrorsMailChimp(res);
      }, err => {
        this.value = "Ocurrió un error, intentalo otra vez";
        this.class = "error";
        console.log(err);
      })
  }

  controllErrorsMailChimp(res){
    if(res.result == "error"){
      return "Tu correo ya forma parte de nuestra lista de Desarrolla";
    }
    else if(res.result == "success"){
      return "¡Gracias por suscribirse!";
    }
  }

}
