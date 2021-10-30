import { ServiceInterface, ServiceModel } from '../models/service.model';
import * as ProductActions from '../actions/service.actions';
import * as ServicesActionTypes from '../actions/service.actions';
import { Action, createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';

const initialState: ServiceInterface = {
  serviceId:'',
  socialEnterpriseKey:'',
  locationCoordinates:
  {
    longitude:'',
    latitude:''
  },
  whatIsIt:'',
  whereItIs:'',
  haveFun:'',
  additionalAttractions:'',
  approvedItem:'',
  categories:{},
  features:{},
  tags:{},
  pictures:{},
  comercializations:
  [
    {
      catCommercializationType:'',
          catCommercializationSubType:'',
          description:''
        }
  ],
  paymentMethods:{},
  socialNetworks:
  [
    {
      catSocialNetwork:'',
      data:''
    }
  ],
  especificServices:{}
};
const reducer = createReducer(initialState,
  on(ServicesActionTypes.SetserviceId, (state: ServiceModel, { serviceId }) => {
    return { ...state, serviceId: serviceId }
  }),
  on(ServicesActionTypes.SetProducKey, (state: ServiceModel, { clave }) => {
    return { ...state, socialEnterpriseKey: clave }
  }),
  on(ServicesActionTypes.SetServiceCategories, (state: ServiceModel, { categories }) => {
    return { ...state, categories: categories }
  }),
  on(ServicesActionTypes.SetServiceDescription, (state: ServiceModel, { whatIsIt, whereItIs, haveFun, additionalAttractions}) => {
    return {
      ...state,

        whatIsIt: whatIsIt,
        whereItIs: whereItIs,
        haveFun: haveFun,
        additionalAttractions: additionalAttractions

    }
  }),
  on(ServicesActionTypes.SetServicePictures, (state: ServiceModel, { pictures }) => {
    return { ...state, pictures: pictures }
  }),
  on(ServicesActionTypes.SetServiceTags, (state: ServiceModel, { tags}) => {
    return { ...state, tags: tags }
  }),
  on(ServicesActionTypes.SetProductFeatures, (state: ServiceModel, { features }) => {
    return { ...state, features: features }
  }),
  on(ServicesActionTypes.SetEspecificServices, (state: ServiceModel, { especificServices }) => {
    return { ...state, especificServices: especificServices }
  }),
  on(ServicesActionTypes.SetProducPaymentMethods, (state: ServiceModel, { paymentMethods }) => {
    return { ...state, paymentMethods: paymentMethods }
  }),
  );

export function ServiceReducer(
  state: ServiceModel | undefined,
  action: Action
): ServiceModel {
  return reducer(state, action);
}







