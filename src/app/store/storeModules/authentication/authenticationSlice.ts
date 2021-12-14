import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface AuthenticationState {
  // TODO User Interface
  connectedUser: any;

}

const initialState: AuthenticationState = {
  connectedUser: null,
};


export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setConnectedUser: (state, action: PayloadAction<any>) => {
      state.connectedUser = action.payload;
    },
  },
});

export const { setConnectedUser } = authenticationSlice.actions;

export const selectConnectedUser = (state: RootState) => state.authentication.connectedUser;

export default authenticationSlice.reducer;
