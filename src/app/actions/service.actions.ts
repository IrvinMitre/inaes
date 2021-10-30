import { ServiceModel } from './../models/service.model';
import { createAction, props } from '@ngrx/store';

export enum ServicesActionTypes {
  LoadProduct = '[Home Page] Load Service',
  SetserviceId = '[Service] Set Service Id',
  SetProductKey = '[Service] Set Service Key',
  SetServiceDescription = '[Service] Set Description',
  SetServiceCategories = '[Service] Set Categories',
  SetServiceTags = '[Service] Set Tags',
  SetProductFeatures = '[Service] Set Feactures',
  SetServicePictures = '[Service] Set Pictures',
  SetEspecificServices = '[Service] Set Services',
  SetProducPaymentMethods = '[Service] Set Payment',
}

export const LoadProduct = createAction(ServicesActionTypes.LoadProduct);
ServicesActionTypes
// export const SetProduct = createAction(ProductActionTypes.SetProduct, props<{ product: Product }>());
export const SetserviceId= createAction(ServicesActionTypes.SetserviceId, props<{ serviceId: string }>())
export const SetProducKey = createAction(ServicesActionTypes.SetProductKey, props<{ clave: string }>())
export const SetServiceDescription = createAction(ServicesActionTypes.SetServiceDescription, props<{ whatIsIt: string, whereItIs: string, haveFun:string, additionalAttractions:string}>())
export const SetServiceCategories = createAction(ServicesActionTypes.SetServiceCategories, props<{ categories: Object }>())
export const SetServiceTags = createAction(ServicesActionTypes.SetServiceTags, props<{ tags: Object }>())
export const SetProductFeatures = createAction(ServicesActionTypes.SetProductFeatures, props<{ features: Object }>())
export const SetServicePictures = createAction(ServicesActionTypes.SetServicePictures, props<{ pictures: Object }>())
export const SetEspecificServices = createAction(ServicesActionTypes.SetEspecificServices, props<{ especificServices: Object }>())
export const SetProducPaymentMethods = createAction(ServicesActionTypes.SetProducPaymentMethods, props<{ paymentMethods: Object }>())






