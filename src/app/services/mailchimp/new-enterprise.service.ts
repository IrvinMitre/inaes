import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewEnterpriseService {

  mailchimpEndpoint = 'https://gob.us1.list-manage.com/subscribe/post-json?u=c2f9d481fc7d1ca768b4c4a13&id=7a97862bad';
  
  constructor(
    private http: HttpClient
  ) { }

  subscribeToList(correo, nombre) {
    const params = new HttpParams()
      .set('EMAIL', correo)
      .set('NOMEMPRESA', nombre);

    const mailchimpUrl = `${this.mailchimpEndpoint}&${params.toString()}`;
    return this.http.jsonp(mailchimpUrl, 'c');
  }

}
