// import { SetProduct, SetProductKey } from './../actions/product.actions';
// import { selectProduct } from './index';
import { EnterpriseInterface } from './../models/productRequest.model';
import {
  ActionReducerMap,
  on,
  createReducer,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
// import { ProductActionTypes, ProductActions } from '../actions/product.actions';
export interface ProductState {
  productData: EnterpriseInterface;
}
const initialProductState: EnterpriseInterface = {
  socialEnterpriseKey: '',
  nameEnterprise: '',
  locationCoordinates: {
    longitude: '',
    latitude: ''
  },
  reference: '',
  shortDescription: '',
  contact: {
    website: '',
    email: '',
    facebook: '',
    instagram: '',
    localphone: '',
    whatsapp: ''
  },
  admin: {
    firstname: '',
    lastname: '',
    email: '',
    movil: '',
    password: ''
  },
  createdAccount: false,
  addressPictures: [
    {
      catSocialNetwork: '',
      data: ''
    }
  ],
  identityPictures: [
    {
      route: ''
    }
  ],
  socialNetworks: [
    {
      catSocialNetwork: '',
      data: ''
    }
  ],
};
export interface State {
  // Product: Product;
}
const productReducer = createReducer(
  initialProductState,
  // on(ScoreboardPageActions.homeScore, state => ({ ...state, home: state.home + 1 })),
  // on(ScoreboardPageActions.awayScore, state => ({ ...state, away: state.away + 1 })),
  // on(ScoreboardPageActions.resetScore, state => ({ home: 0, away: 0 })),
  // on(SetProduct, (state, { product }) => ({})),
  // on(SetProductKey, (state, { clave }) => ({ socialEnterpriseKey: clave }))
);
export const reducers: ActionReducerMap<State> = {
  // setProduyctKey: productReducer
};
// export const selectProduct = (state: State) => state.Product.productData;
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
