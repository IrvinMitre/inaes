import { EnterpriseInterface } from './../models/productRequest.model';
import { ProductInterface } from './../models/product.model';
import { ServiceInterface } from './../models/service.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
/**
 * @ignore
 */
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  /**
   *
   * @param http Declara variable http para hacer peticiones http
   */
  constructor(private http: HttpClient) {}
  /**
   * @ignore
   */
  baseUrl = environment.apiUrl;
  ipUrl = environment.ipUrl;

  headers = {
    'Content-Type': 'application/json',
  };

  requestOptions = {
    headers: new HttpHeaders(this.headers),
  };
  /**
   * Obtiene los macrosectores para llenar input en formulario
   */
  getMacrosectores() {
    return this.http.post(
      `${this.baseUrl}/directorioWS/general/getMacrosectores`,
      {},
      this.requestOptions
    );
  }
  /**
   * Obtiene los catalgos de actividad para llenar input en formulario
   */
  getCatalogosActividad() {
    return this.http.post(
      `${this.baseUrl}/directorioWS/directorio/getCatalogosActividad`,
      {},
      this.requestOptions
    );
  }
  /**
   * Obtiene los catalgos de servicios para llenar input en formulario
   */
  getCatalogosServicios() {
    return this.http.get(`${this.baseUrl}/catalogs/catService`, {});
  }
  /**
   * Obtiene los sectores de un Macro en específico
   * @param idMacrosector ID de Macro Sector
   * @returns Jason con los sectores del macrosector
   */
  getSectorsByMacroSectors(idMacrosector: number) {
    return this.http.post(
      `${this.baseUrl}/directorioWS/general/getSectores`,
      {
        idMacrosector: idMacrosector,
        activo: true,
      },
      this.requestOptions
    );
  }
  /**
   * Obtiene los Sub-Sectores de un Sector en específico
   * @param idSector ID de Sector
   * @returns Jason con los Sub-Sectores de sector
   */
  getSubsectorsBySector(idSector: number) {
    return this.http.post(
      `${this.baseUrl}/directorioWS/general/getSubsectores`,
      {
        idSector: idSector,
      },
      this.requestOptions
    );
  }
  /**
   * Obtiene las ramas de un Sub-Sector en específico
   * @param idsubSector ID de sub-sector
   * @returns Jason con ramas de sub-sector
   */
  getRamasBySubsector(idsubSector: number) {
    return this.http.post(
      `${this.baseUrl}/directorioWS/general/getRamas`,
      {
        idSubsector: idsubSector,
      },
      this.requestOptions
    );
  }
  /**
   *
   * @param idRama ID de Rama
   * @returns
   */
  getClassByRama(idRama: number) {
    return this.http.post(
      `${this.baseUrl}/directorioWS/general/getClases`,
      {
        idRama: idRama,
      },
      this.requestOptions
    );
  }
  /**
   *
   * @param idClase ID de Clase
   */
  getActividadesByRama(idClase: number) {
    return this.http.post(
      `${this.baseUrl}/directorioWS/general/getClases`,
      {
        idClase: idClase,
      },
      this.requestOptions
    );
  }
  /**
   * Obtiene catalogo de Categorias para llenar input en formulario
   */
  getCategoriesCatalog() {
    return this.http.get(`${this.ipUrl}/catalogs`);
  }
  /**
   * Ingresa el producto en base de datos
   * @param product Interfaz de Producto con campos llenados por el usuario
   */
  postEmpresas(product: EnterpriseInterface) {
    return this.http.post(`${this.ipUrl}/enterprises`, product);
  }

  getAditional() {
    return this.http.get(`${this.ipUrl}/catalogs/catCommercializationType`, {},);
  }

  postService(service: ServiceInterface, socialEnterpriseKey: string) {
    return this.http.post(`${this.ipUrl}/enterprises/${socialEnterpriseKey}/services`, service);
  }
  postProduct(product: ProductInterface, socialEnterpriseKey: string) {
    return this.http.post(`${this.ipUrl}/enterprises/${socialEnterpriseKey}/products`, product);
  }
  pathProduct(product: ProductInterface, socialEnterpriseKey: string, id:string) {
    return this.http.patch(`${this.ipUrl}/enterprises/${socialEnterpriseKey}/products/${id}`, product);
  }
  pathService(product: ServiceInterface, socialEnterpriseKey: string, id:string) {
    return this.http.patch(`${this.ipUrl}/enterprises/${socialEnterpriseKey}/services/${id}`, product);
  }


  getService(socialEnterpriseKey: string){
    return this.http.get(`${this.ipUrl}/enterprises/${socialEnterpriseKey}/services`);
  }
  getProduct(socialEnterpriseKey: string){
    return this.http.get(`${this.ipUrl}/enterprises/${socialEnterpriseKey}/products`);
  }

}
