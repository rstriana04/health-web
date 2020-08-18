import { createAction, props } from '@ngrx/store';
import { User } from '../../../sign-up/models/user';
import { LogIn } from '../../models/log-in';

export enum LogInActionsTypes {
  SET_AUTH_USER = '[Log In] Set Auth User',
  SET_AUTH_USER_SUCCESS = '[Log In] Set Auth User Successfully',
  SET_AUTH_USER_FAILED = '[Log In] Set Auth User Failed',
  SET_TOKEN_AUTH_USER = '[Log In] Set Token Auth User',
  GET_USER_AUTHENTICATED = '[Log-In] Get User Authenticated',
  GET_USER_AUTHENTICATED_SUCCESS = '[Log-In] Get User Authenticated Success',
  GET_USER_AUTHENTICATED_FAILED = '[Log-In] Get User Authenticated Failed'
}

export const AuthUserAction = createAction(LogInActionsTypes.SET_AUTH_USER, props<{ credentials: { email: string, password: string } }>());

export const AuthUserSuccessAction = createAction(LogInActionsTypes.SET_AUTH_USER_SUCCESS, props<{ credentials: LogIn }>());

export const AuthUserFailedAction = createAction(LogInActionsTypes.SET_AUTH_USER_FAILED, props<{ message: string }>());

export const GetUserAuthenticatedAction = createAction(LogInActionsTypes.GET_USER_AUTHENTICATED, props<{ token: string }>());
export const GetUserAuthenticatedSuccessAction = createAction(LogInActionsTypes.GET_USER_AUTHENTICATED_SUCCESS, props<{ user: User}>());
export const GetUserAuthenticatedFailedAction = createAction(LogInActionsTypes.GET_USER_AUTHENTICATED_FAILED, props<{ message: string }>());
