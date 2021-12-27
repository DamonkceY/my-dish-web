import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface RootSliceState {
  // TODO User Interface
  shoppingModal: boolean;
  isRootLoading: boolean;
  deviceWidth: number;

}

const initialState: RootSliceState = {
  shoppingModal: false,
  isRootLoading: false,
  deviceWidth: document.body.clientWidth,
};


export const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setShoppingModal: (state, action: PayloadAction<boolean>) => {
      state.shoppingModal = action.payload;
    },
    setRootLoading: (state, action: PayloadAction<boolean>) => {
      state.isRootLoading = action.payload;
    },
    setDeviceWidth: (state, action: PayloadAction<number>) => {
      state.deviceWidth = action.payload;
    },
  },
});

export const { setShoppingModal, setRootLoading, setDeviceWidth } = rootSlice.actions;

export const selectShoppingModal = (state: RootState) => state.root.shoppingModal;
export const selectRootLoading = (state: RootState) => state.root.isRootLoading;
export const selectDeviceWidth = (state: RootState) => state.root.deviceWidth;

export default rootSlice.reducer;
