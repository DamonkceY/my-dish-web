import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export interface CommonState {
  myReservationsList: Array<any>;
}

const initialState: CommonState = {
  myReservationsList: [],
}


export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setMyReservationsList: (state, action: PayloadAction<Array<any>>) => {
      state.myReservationsList = action.payload
    },
  },
})

export const { setMyReservationsList } = commonSlice.actions

export const selectMyReservationsList = (state: RootState) => state.common.myReservationsList

export default commonSlice.reducer
