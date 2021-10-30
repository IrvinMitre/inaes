import { EnterpriseModel } from './../models/productRequest.model';
import { createAction, props } from '@ngrx/store';
export enum ProductActionTypes {
  LoadProduct = '[Home Page] Load Product',
  SetProduct = '[Product] Set Product',
  SetProductKey = '[Product] Set Product Key',
  SetNameEnterprise = '[Product] Set NameEnterprise',
  SetLatLong = '[Product] Set Lat Long',
  SetShortDescriptions = '[Product] Set Short Descriptions',
  SetProfile = '[Product] Set Short Profile',
  SetAdmin = '[Product] Set Short Admin',
  SetAddressPictures = '[Product] Set AddressPictures',
  SetSocialPicture = '[Product] Set SocialPictures',

}
export const LoadProduct = createAction(ProductActionTypes.LoadProduct);
ProductActionTypes
// export const SetProduct = createAction(ProductActionTypes.SetProduct, props<{ product: Product }>());
export const SetProductKey = createAction(ProductActionTypes.SetProductKey, props<{ clave: string }>());
export const setNameEnterprise = createAction(ProductActionTypes.SetNameEnterprise, props<{nameEnterprise: string}>());
export const SetLatLong = createAction(ProductActionTypes.SetLatLong, props<{ lat: string, long: string, reference: string }>());
export const SetShortDescriptions = createAction(ProductActionTypes.SetShortDescriptions, props<{ short: string }>());
export const SetProfile = createAction(ProductActionTypes.SetProfile, props<{ website: string, email: string, facebook: string, instagram: string, localphone:string, whatsapp:string}>());
export const SetAdmin = createAction(ProductActionTypes.SetAdmin, props<{ firstName: string, lastName:string, email:string, movil:string, password:string }>());
export const SetAddressPictures = createAction(ProductActionTypes.SetAddressPictures, props<{ addressPictures: Object}>());
export const SetSocialPicture = createAction(ProductActionTypes.SetSocialPicture, props<{identityPictures: Object}>());

