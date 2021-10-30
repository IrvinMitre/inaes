import { AuthService } from './auth.service';
import { CatalogClass } from './../models/catalogClass.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  /**
   *
   * @param http Declara variable http para hacer peticiones http
   */

  constructor(private http: HttpClient, private auth: AuthService) { }

  /**
   * @ignore
   */

  baseUrl = environment.apiUrl;
  baseUrl2 = environment.ipUrl;
  headers = {
    'Content-Type': 'application/json',
  };
  requestOptions = {
    headers: new HttpHeaders(this.headers),
  };
  /**
   * Obtiene la informacion para llenar form
   * @param clave Clave ingresada por el usuario
   */
  getClaveActualizacion(clave: String) {
    return this.http.post(`${this.baseUrl}/directorioWS/directorio/getClaveActualizacionDatos`, { clave }, this.requestOptions);
  }
  /**
   * Obtiene los datos de la empresa ingresada
   * @param idOrganismo ID de Empresa
   * @param idTipoOrganismo ID de tipo de empresa
   */
  getDatosOrganismoPlataforma(idOrganismo: any, idTipoOrganismo: number) {
    return this.http.post(`${this.baseUrl}/directorioWS/directorio/getDatosOrganismoPlataforma`, {
      'idOrganismo': idOrganismo,
      'idTipoOrganismo': idTipoOrganismo
    }, this.requestOptions);
  }
  getEnterprise(socialEnterPriseKey: string) {
    return this.http.get(`${this.baseUrl2}/enterprises/${socialEnterPriseKey}`)
  }
  getOnlyProduct(productId: string, socialEnterPriseKey: string) {
    return this.http.get(`${this.baseUrl2}/enterprises/${socialEnterPriseKey}/products/${productId}`)
  }
  getOnlyService(serviceId: string, socialEnterPriseKey: string) {
    return this.http.get(`${this.baseUrl2}/enterprises/${socialEnterPriseKey}/services/${serviceId}`)
  }
  getBySearchKey(key: string) {
    return this.http.get(`${this.baseUrl2}/search?key=${key}`)
  }
  updateProfileData(data: any, key: string) {
    return this.http.patch(`${this.baseUrl2}/enterprises/${key}`, data)
  }
  getServices(){
    return this.http.get(`${this.baseUrl2}/enterprises/services`);
  }
  getProducts(){
    return this.http.get(`${this.baseUrl2}/enterprises/products`);
  }

  uploadFile(formData: FormData) {
    console.log(formData);
    return this.http.post(`${this.baseUrl2}/upload`, formData)
  }
  getEnterprises() {
    return this.http.get(`${this.baseUrl2}/enterprises`)
  }
  imageUpload(files){
  return this.http.post(`${this.baseUrl2}/files`, files)
  }

  getImage(socialEnterPriseKey, sub, name){
    return this.http.get(`${this.baseUrl2}/files/${socialEnterPriseKey}/${sub}/${name}`)
  }

  getProductoCategoria(cat){
    return this.http.get(`${this.baseUrl2}/category/${cat}`)
  }
  getProductoCategoriaSub(cat, sub){
    return this.http.get(`${this.baseUrl2}/category/${cat}/subcategory/${sub}`)
  }

  getLatLong(address: string) {
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAwZ8ziVbQbMPgo_Rvkt18zoWurTTBPNjA&address=${address}`)
  }

}

