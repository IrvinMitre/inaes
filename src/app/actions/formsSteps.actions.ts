import { createAction, props } from '@ngrx/store';

export enum FormStepsActionTypes {
    SetProductStep = '[FormStep] Set Product Step',
    SetServiceStep = '[FormStep] Set Service Step',
    SetRegistrationStep = '[FormStep] Set Registration Step'
}

export const SetProductStep = createAction(FormStepsActionTypes.SetProductStep, props< { step: string }>());
export const SetServiceStep = createAction(FormStepsActionTypes.SetServiceStep, props< { step: string }>());
export const SetRegistrationStep = createAction(FormStepsActionTypes.SetRegistrationStep, props< { step: string }>());
export const SetProductProgress = createAction(FormStepsActionTypes.SetRegistrationStep, props< { progres: number }>());
export const SetServiceProgress = createAction(FormStepsActionTypes.SetRegistrationStep, props< { progres: number }>());
export const SetRegistrationProgress = createAction(FormStepsActionTypes.SetRegistrationStep, props< { progres: number }>());
