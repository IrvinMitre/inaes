import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
	providedIn: 'root'
})

export class NewAdminService {
	mailchimpEndpoint = 'https://gob.us1.list-manage.com/subscribe/post-json?u=c2f9d481fc7d1ca768b4c4a13&id=d09be39d3b';
	
	constructor(
		private http: HttpClient
	) { }

	subscribeToList( email ) {
		const params = new HttpParams()
		  .set('EMAIL', email);
		  
		const mailchimpUrl = `${this.mailchimpEndpoint}&${params.toString()}`;
	
		return this.http.jsonp(mailchimpUrl, 'c');
	  }
}
