import React from 'react'
import {  fetchallproductscategories , fetchbrands , fetchcategories , fetchproductdetailbyid} from './productapi'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


const initialState = {
    products : [],
    brand:[],
    categories:[],
    productdetail:null,
    status : "idle"
}

// export const fetchallproductsAycn = createAsyncThunk(
//     "products/fetchallproducts",
//     async() =>
//         {
//             const response = await fetchallproducts()
//             return response.data
//         }
// )

export const fetchallproductscategoriesaync = createAsyncThunk(
  "products/fetchallproductscategories",
  async({filter, Sort , pagenation}) =>
      {
        console.log("inslice",filter , Sort , pagenation)
          const response = await fetchallproductscategories(filter , Sort , pagenation)
          console.log("this thnk recivdev product" , response)
          return response.data
      }
)

export const fetchbrandsaync = createAsyncThunk(
  "products/fetchbrands",
  async() =>
      {
          const response = await fetchbrands()
          return response.data
      }
)

export const fetchcategoriesaync = createAsyncThunk(
  "products/fetchcategories",
  async() =>
      {
          const response = await fetchcategories()
          return response.data
      }
)

export const fetchproductdetailbyidaync = createAsyncThunk(
  "products/fetchproductdetailbyid",
  async(id) =>
      {
          const response = await fetchproductdetailbyid(id)
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
      // .addCase(fetchallproductsAycn.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(fetchallproductsAycn.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.products = action.payload;
      // })
      // .addCase(fetchallproductsAycn.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.error.message;
      // }) 
      .addCase(fetchallproductscategoriesaync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchallproductscategoriesaync.fulfilled, (state, action) => {
        console.log('action_______', action.payload);
        state.status = 'idle';
        state.products = action.payload.data;
      })
      .addCase(fetchallproductscategoriesaync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }).addCase(fetchbrandsaync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchbrandsaync.fulfilled, (state, action) => {
        console.log('action_______', action.payload);
        state.status = 'idle';
        state.brand = action.payload;
      })
      .addCase(fetchbrandsaync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }).addCase(fetchcategoriesaync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchcategoriesaync.fulfilled, (state, action) => {
        console.log('action_______', action.payload);
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchcategoriesaync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }).addCase(fetchproductdetailbyidaync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchproductdetailbyidaync.fulfilled, (state, action) => {
        console.log('action_______', action.payload);
        state.status = 'idle';
        state.productdetail = action.payload;
      })
      .addCase(fetchproductdetailbyidaync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },

})
export const selectAllProducts = (state) => state.product.products;
export const selectAllbrand = (state) => state.product.brand;
export const selectAllcategories = (state) => state.product.categories;
export const selectproductbyid = (state) => state.product.productdetail;



export const {} = productSlice.actions;

export default productSlice.reducer;