import { createAsyncThunk } from '@reduxjs/toolkit'
import purchasesAPi from 'src/api/purchase'
import { payloadCreator } from 'src/utils/helper'

export const getPurchases = createAsyncThunk('user/getPurchases', payloadCreator(purchasesAPi.getPurchases))
