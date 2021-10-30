import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LoadProduct } from '../actions/product.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { State } from '../reducers';
import { Store } from '@ngrx/store';
// import { ProductService } from './Product.service';
//import { LocationActionTypes, LocationsError, LoadLocations } from './location.actions';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {

  @Effect()
  loadLocation$ = this.actions$


  constructor(private actions$: Actions, private store: Store<State>) { }

}
