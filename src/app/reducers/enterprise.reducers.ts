
import {
  EnterpriseInterface,
  EnterpriseModel,
} from '../models/productRequest.model';
import * as ProductActions from '../actions/product.actions';
import {
  Action,
  createReducer,
  on,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
const initialState: EnterpriseInterface = {
  socialEnterpriseKey: '',
  nameEnterprise:'',
  locationCoordinates: {
    longitude: '',
    latitude: '',
  },
  reference: '',
  shortDescription: '',
  contact: {
    website: '',
    email: '',
    facebook: '',
    instagram: '',
    localphone: '',
    whatsapp: '',
  },
  admin: {
    firstname: '',
    lastname: '',
    email: '',
    movil: '',
    password: '',
  },
  createdAccount: false,
  addressPictures: [{}],
  identityPictures: [{}],
  socialNetworks: [
    {
      catSocialNetwork: '',
      data: '',
    },
  ],
};
export const featureKey = 'product';
export const selectAll = (state: EnterpriseModel) => state;
export const selectFeature = createFeatureSelector<
  EnterpriseModel,
  EnterpriseInterface
>('socialEnterpriseKey');
export const selectFeatureAll = createSelector(
  selectAll,
  (state: EnterpriseModel) => state
);
const reducer = createReducer(
  initialState,
  on(ProductActions.LoadProduct, (state) => state),
  on(ProductActions.SetProductKey, (state: EnterpriseModel, { clave }) => {
    // console.log(clave)
    return { ...state, socialEnterpriseKey: clave };
  }),
  on(ProductActions.setNameEnterprise, (state: EnterpriseModel, { nameEnterprise }) => {
    // console.log(clave)
    return { ...state, nameEnterprise: nameEnterprise };
  }),
  on(
    ProductActions.SetLatLong,
    (state: EnterpriseModel, { lat, long, reference }) => {
      return {
        ...state,
        reference: reference,
        locationCoordinates: {
          longitude: long,
          latitude: lat,
        },
      };
    }
  ),
  on(
    ProductActions.SetShortDescriptions,
    (state: EnterpriseModel, { short }) => {
      // console.log(clave)
      return { ...state, shortDescription: short };
    }
  ),
  on(
    ProductActions.SetProfile,
    (
      state: EnterpriseModel,
      { website, email, facebook, instagram, localphone, whatsapp }
    ) => {
      return {
        ...state,
        contact: {
          website: website,
          email: email,
          facebook: facebook,
          instagram: instagram,
          localphone: localphone,
          whatsapp: whatsapp,
        },
      };
    }
  ),
  on(
    ProductActions.SetAdmin,
    (
      state: EnterpriseModel,
      { firstName, lastName, email, movil, password }
    ) => {
      return {
        ...state,
        admin: {
          firstname: firstName,
          lastname: lastName,
          email: email,
          movil: movil,
          password: password,
        },
      };
    }
  ),
  on(
    ProductActions.SetAddressPictures,
    (state: EnterpriseModel, { addressPictures }) => {
      return {
        ...state,
        addressPictures: addressPictures,
      };
    }
  ),
  on(
    ProductActions.SetSocialPicture,
    (state: EnterpriseModel, { identityPictures }) => {
      return {
        ...state,
        identityPictures: identityPictures,
      };
    }
  )
  /*
  on(ToDoActions.CreateToDoAction, (state: EnterpriseModel, todo: ToDo) => {
    return { ...state, ToDos: [...state.ToDos, todo], ToDoError: null };
  }),
  on(ToDoActions.SuccessGetToDoAction, (state: EnterpriseModel, { payload }) => {
    return { ...state, ToDos: payload, ToDoError: null };
  }),
  on(ToDoActions.SuccessCreateToDoAction, (state: EnterpriseModel, { payload }) => {
    return { ...state, ToDos: [...state.ToDos, payload], ToDoError: null };
  }),
  on(ToDoActions.ErrorToDoAction, (state: EnterpriseModel, error: Error) => {
    // remove below line and use different telemetry logging
    console.error(error);
    return { ...state, ToDoError: error };
  })*/
);
export function EntepriseReducer(
  state: EnterpriseModel | undefined,
  action: Action
): EnterpriseModel {
  return reducer(state, action);
}
