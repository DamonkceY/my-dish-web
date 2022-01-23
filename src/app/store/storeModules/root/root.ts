import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export interface ToastInterface {
  message: string,
  type: 'danger' | 'info' | 'success',
  uniqueId: string,
}

export interface RootSliceState {
  // TODO User Interface
  shoppingModal: any;
  isRootLoading: boolean;
  deviceWidth: number;
  toastsArray: Array<ToastInterface>;
}

const initialState: RootSliceState = {
  shoppingModal: null,
  isRootLoading: false,
  deviceWidth: document.body.clientWidth,
  toastsArray: [],
}


export const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setShoppingModal: (state, action: PayloadAction<any>) => {
      state.shoppingModal = action.payload
    },
    setRootLoading: (state, action: PayloadAction<boolean>) => {
      state.isRootLoading = action.payload
    },
    deleteFromToastsArray: (state, action: PayloadAction<string>) => {
      const temp = [...state.toastsArray]
      temp.splice(temp.findIndex((item) => item.uniqueId === action.payload), 1)
      state.toastsArray = [...temp]
    },
    pushToToastsArray: (state, action: PayloadAction<ToastInterface>) => {
      state.toastsArray = [...state.toastsArray, action.payload]
    },
    setDeviceWidth: (state, action: PayloadAction<number>) => {
      state.deviceWidth = action.payload
    },
  },
})

export const { setShoppingModal, setRootLoading, setDeviceWidth, deleteFromToastsArray, pushToToastsArray } = rootSlice.actions

export const selectShoppingModal = (state: RootState) => state.root.shoppingModal
export const selectRootLoading = (state: RootState) => state.root.isRootLoading
export const selectToastsArray = (state: RootState) => state.root.toastsArray
export const selectDeviceWidth = (state: RootState) => state.root.deviceWidth

export default rootSlice.reducer
