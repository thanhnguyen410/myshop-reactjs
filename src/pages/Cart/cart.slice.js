import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import purchasesAPi from 'src/api/purchase'
import { payloadCreator } from 'src/utils/helper'
import { logout } from '../Auth/auth.slice'

export const getCartPurchases = createAsyncThunk('cart/getCartPurchases', payloadCreator(purchasesAPi.getCartPurchases))

export const updatePurchase = createAsyncThunk('cart/updatePurchases', payloadCreator(purchasesAPi.updatePurchase))

export const deletePurchase = createAsyncThunk('cart/deletePurchase', payloadCreator(purchasesAPi.deletePurchases))

export const buyPurchases = createAsyncThunk('cart/buyPurchases', payloadCreator(purchasesAPi.buyPurchases))

const cart = createSlice({
  name: 'cart',
  initialState: {
    purchases: []
  },
  extraReducers: {
    [getCartPurchases.fulfilled]: (state, action) => {
      state.purchases = action.payload.data
    },
    [logout.fulfilled]: state => {
      state.purchases = []
    }
  }
})

const cartReducer = cart.reducer
export default cartReducer
