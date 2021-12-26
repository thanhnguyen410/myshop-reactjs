import { createAsyncThunk } from '@reduxjs/toolkit'
import productApi from 'src/api/product.api'
import purchasesAPi from 'src/api/purchase'
import { payloadCreator } from 'src/utils/helper'

export const getProductDetail = createAsyncThunk(
  'product/getProductDetail',
  payloadCreator(productApi.getProductDetail)
)

export const addToCart = createAsyncThunk('product/addToCart', payloadCreator(purchasesAPi.addToCart))
