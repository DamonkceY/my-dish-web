import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface RootSliceState {
  // TODO User Interface
  shoppingModal: boolean;

}

const initialState: RootSliceState = {
  shoppingModal: false,
};


export const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setShoppingModal: (state, action: PayloadAction<boolean>) => {
      state.shoppingModal = action.payload;
    },
  },
});

export const { setShoppingModal } = rootSlice.actions;

export const selectShoppingModal = (state: RootState) => state.root.shoppingModal;

export default rootSlice.reducer;
