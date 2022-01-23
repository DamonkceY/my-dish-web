import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export interface CartState {
  cart: any;
  orderDetails: any;
  orderConfirmationDetails: any;
}

const initialState: CartState = {
  cart: null,
  orderDetails: null,
  orderConfirmationDetails: null,
}


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<any>) => {
      state.cart = action.payload
    },
    setOrderDetails: (state, action: PayloadAction<any>) => {
      localStorage.setItem('ORDER_DETAILS', JSON.stringify(action.payload))
      state.orderDetails = action.payload
    },
    setOrderConfirmationDetails: (state, action: PayloadAction<any>) => {
      localStorage.setItem('ORDER_CONFIRMATION_DETAILS', JSON.stringify(action.payload))
      state.orderConfirmationDetails = action.payload
    },
  },
})

export const { setCart, setOrderDetails, setOrderConfirmationDetails } = cartSlice.actions

export const selectCart = (state: RootState) => state.cart.cart
export const selectOrderDetails = (state: RootState) => state.cart.orderDetails
export const selectOrderConfirmationDetails = (state: RootState) => state.cart.orderConfirmationDetails

export default cartSlice.reducer
