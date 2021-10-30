import { ProductInterface, ProductModel } from './../models/product.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as ProductActions from '../actions/produc.actions';

const inititialState: ProductInterface = {
  productId: "",
  socialEnterpriseKey: "",
  locationCoordinates:
  {
    longitude: "",
    latitude: ""
  },
  whatIsIt: "",
  whereItIs: "",
  description: "",
  homeDelivery: "",
  aprovedItem: "",
  categories: {},
  features: {},
  tags: {},
  pictures: {},
  comercializations:
    [
      {
        catCommercializationType: "",
        catCommercializationSubType: "",
        description: ""
      }
    ],
  paymentMethods: {},
  socialNetworks:
    [
      {
        catSocialNetwork: "",
        data: ""
      }
    ]
}

const reducer = createReducer(inititialState,
  on(ProductActions.SetProductId, (state: ProductModel, { productId }) => {
    return { ...state, productId: productId }
  }),
  on(ProductActions.SetProducKey, (state: ProductModel, { clave }) => {
    return { ...state, socialEnterpriseKey: clave }
  }),
  on(ProductActions.SetProducDescription, (state: ProductModel, { whatIsIt, whereItIs, description }) => {
    return {
      ...state,

      whatIsIt: whatIsIt,
      whereItIs: whereItIs,
      description: description

    }
  }),
  on(ProductActions.SetProducCategories, (state: ProductModel, { categories }) => {
    return { ...state, categories: categories }
  }),
  on(ProductActions.SetProducPictures, (state: ProductModel, { pictures }) => {
    return { ...state, pictures: pictures }
  }),
  on(ProductActions.SetProducTags, (state: ProductModel, { tags }) => {
    return { ...state, tags: tags }
  }),
  on(ProductActions.SetProductFeatures, (state: ProductModel, { features }) => {
    return { ...state, features: features }
  }),
  on(ProductActions.SetProducPaymentMethods, (state: ProductModel, { paymentMethods }) => {
    return { ...state, paymentMethods: paymentMethods }
  }),
  on(ProductActions.SetProducComercializations, (state: ProductModel, { comercializations }) => {
    return { ...state, comercializations: comercializations }
  }),
  on(ProductActions.SetDelivery, (state: ProductModel, { homeDelivery }) => {
    return {
      ...state,

      homeDelivery: homeDelivery,

    }
  })
);

export function ProducReducer(
  state: ProductModel | undefined,
  action: Action
): ProductModel {
  return reducer(state, action);
}
