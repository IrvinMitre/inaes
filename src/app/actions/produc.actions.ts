import { createAction, props } from '@ngrx/store';

export enum ProducActionTypes {
  LoadProduct = '[Home Page] Load Product',
  SetProductId = '[Produc] Set Produc Id',
  SetProductKey = '[Produc] Set Produc Key',
  SetProducDescription = '[Produc] Set Description',
  SetProducCategories = '[Produc] Set Categories',
  SetProducPictures = '[Produc] Set Pictures',
  SetProducTags = '[Produc] Set Tags',
  SetProductFeatures = '[Produc] Set Features',
  SetProducPaymentMethods = '[Produc] Set PaymentMethods',
  SetProducComercializations = '[Produc] Set Comercializations',
  SetDelivery = '[Produc] Set Delivery',

}

export const LoadProduct = createAction(ProducActionTypes.LoadProduct);
export const SetProductId = createAction(ProducActionTypes.SetProductId, props<{ productId: string }>())
export const SetProducKey = createAction(ProducActionTypes.SetProductKey, props<{ clave: string }>())
export const SetProducDescription = createAction(ProducActionTypes.SetProducDescription, props<{ whatIsIt: string, whereItIs: string, description: string }>())
export const SetProducCategories = createAction(ProducActionTypes.SetProducCategories, props<{ categories: Object }>())
export const SetProducPictures = createAction(ProducActionTypes.SetProducPictures, props<{ pictures: Object }>())
export const SetProducTags = createAction(ProducActionTypes.SetProducTags, props<{ tags: Object }>())
export const SetProductFeatures = createAction(ProducActionTypes.SetProductFeatures, props<{ features: Object }>())
export const SetProducPaymentMethods = createAction(ProducActionTypes.SetProducPaymentMethods, props<{ paymentMethods: Object }>())
export const SetProducComercializations = createAction(ProducActionTypes.SetProducComercializations, props<{ comercializations: Object }>())
export const SetDelivery = createAction(ProducActionTypes.SetDelivery, props<{ homeDelivery: string }>())



