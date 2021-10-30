import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

	constructor(
		private http: HttpClient
	) {}

	baseUrl: string = environment.ipUrl 

	getCatalogs() {
		return this.http.get(`${this.baseUrl}/catalogs`);
  }

  search(key: string) {
    return this.http.get(`${this.baseUrl}/search?key=`+ key);
  }
}
