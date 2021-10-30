import { FormsStepsModel, FormsStepsInterface } from './../models/formsStep.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as FormActions from '../actions/formsSteps.actions';

const initialState: FormsStepsInterface = {
    currentProductStep: '',
    currentRegistrationStep: '',
    currentServiceStep: '',
    currentServiceProgress: 0,
    currentProductProgress: 0,
}

const reducer = createReducer(initialState,
    on(FormActions.SetProductStep, (state: FormsStepsModel, { step }) => {
        return { ...state, currentProductStep: step }
    }),
    on(FormActions.SetServiceStep, (state: FormsStepsModel, { step }) => {
        return { ...state, currentServiceStep: step }
    }),
    on(FormActions.SetRegistrationStep, (state: FormsStepsModel, { step }) => {
        return { ...state, currentRegistrationStep: step }
    }),
    on(FormActions.SetProductProgress, (state: FormsStepsModel, { progres }) => {
      return { ...state, currentProductProgress: progres }
  }),
    on(FormActions.SetServiceProgress, (state: FormsStepsModel, { progres }) => {
      return { ...state, currentServiceProgress: progres }
  }),
)

export function FormsStepReducer(
    state: FormsStepsModel | undefined,
    action: Action
): FormsStepsModel {
    return reducer(state, action);
}
