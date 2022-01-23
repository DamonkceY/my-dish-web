import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import UserModelInterface from '../../../utils/interfaces/modelsInterfaces/User'

export interface AuthenticationState {
  connectedUser: UserModelInterface | undefined;

}

const initialState: AuthenticationState = {
  connectedUser: undefined,
}


export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setConnectedUser: (state, action: PayloadAction<UserModelInterface | undefined>) => {
      state.connectedUser = action.payload
    },
    logout: (state) => {
      state.connectedUser = undefined
      localStorage.removeItem('myDishWeb')
      window.location.replace('/auth')
    },
  },
})

export const { setConnectedUser, logout } = authenticationSlice.actions

export const selectConnectedUser = (state: RootState) => state.authentication.connectedUser

export default authenticationSlice.reducer
