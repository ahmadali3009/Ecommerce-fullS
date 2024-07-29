import React from 'react'
import { fetchallproducts , fetchallproductscategories } from './productapi'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


const initialState = {
    products : [],
    status : "idle"
}

export const fetchallproductsAycn = createAsyncThunk(
    "products/fetchallproducts",
    async() =>
        {
            const response = await fetchallproducts()
            return response.data
        }
)

export const fetchallproductscategoriesaync = createAsyncThunk(
  "products/fetchallproductscategories",
  async({filter, Sort}) =>
      {
        console.log("inslice",filter , Sort)
          const response = await fetchallproductscategories(filter , Sort)
          console.log("this thnk recivdev product" , response)
          return response.data
      }
)


export const productSlice = createSlice({
    name : "products",
    initialState,
    reducers: {

    },
 extraReducers: (builder) => {
    builder
      .addCase(fetchallproductsAycn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchallproductsAycn.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchallproductsAycn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }) .addCase(fetchallproductscategoriesaync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchallproductscategoriesaync.fulfilled, (state, action) => {
        console.log('action_______', action.payload);
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchallproductscategoriesaync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },

})
export const selectAllProducts = (state) => state.product.products;

export const {} = productSlice.actions;

export default productSlice.reducer;