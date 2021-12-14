import { AppThunk } from '../../store'

export interface LoginCredentialsInterface {
  email: string;
}

export const attemptLogin = (data: LoginCredentialsInterface): AppThunk => (
  dispatch,
  getState
) => {

};
