import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../../sign-up/models/user';
import { LogIn } from '../../models/log-in';
import * as LogInActions from '../actions/log-in.actions';

export interface LogInState {
  credentials: LogIn;
  userAuthenticated: User;
  message: {message: string, status: number};
}

const initialStateLogIn: LogInState = {
  credentials: undefined,
  userAuthenticated: undefined,
  message: undefined
};

const reducer = createReducer(initialStateLogIn,
  on(LogInActions.AuthUserAction),
  on(LogInActions.AuthUserSuccessAction, (state, { credentials }) => ( {
    ...state,
    credentials,
    message: undefined
  } )),
  on(LogInActions.AuthUserFailedAction, (state, { message }) => ( {
    ...state,
    message
  } )),
  on(LogInActions.GetUserAuthenticatedAction),
  on(LogInActions.GetUserAuthenticatedSuccessAction, (state, { user }) => ( {
    ...state,
    userAuthenticated: user
  } )),
  on(LogInActions.GetUserAuthenticatedFailedAction, (state, { message }) => ( {
    ...state,
    message
  } ))
);

export function LogInReducer(state: LogInState | undefined, action: Action) {
  return reducer(state, action);
}
