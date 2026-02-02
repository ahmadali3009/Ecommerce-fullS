import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addtocart , deleteCart, fetchproductbyuserid, resetCart, updateCart } from './cartapi'

const initialState = {
    cartproduct : [],
    cartbyid:[],
    deleteid:null,
    status : "idle",
    error:null,

}

export const addtocartaync = createAsyncThunk(
    "cart/addtocart",
    async(product) =>
        {
            console.log("product________" , product)
            const response = await addtocart(product)
            return response.data
        }
  )

  export const fetchcartbyidaync = createAsyncThunk(
    "cart/fetchcartbyid",
    async(userid) =>
        {
            console.log("userid________" , userid)
            const response = await fetchproductbyuserid(userid)
            return response.data
        }
  )
  export const updateCartaync = createAsyncThunk(
    "cart/updatecart",
    async(update) =>
        {
            console.log("userid________" , update)
            const response = await updateCart(update)
            return response.data
        }
  )

  export const deleteCartaync = createAsyncThunk(
    "cart/deleteCart",
    async(productid) =>
        {
            console.log("userid________" , productid)
            const response = await deleteCart(productid)
            return response.data
        }
  )

  
  export const resetCartaync = createAsyncThunk(
    "cart/resetCart",
    async(userid) =>
        {
            console.log("userid________" , userid)
            const response = await resetCart(userid)
            return response.data
        }
  )

  export const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers: {

    },
 extraReducers: (builder) => {
    builder 
    .addCase(addtocartaync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addtocartaync.fulfilled, (state, action) => {
        console.log('action_______', action.payload);
        state.status = 'idle';
        state.cartproduct.push(action.payload);
      })
      .addCase(addtocartaync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }).addCase(fetchcartbyidaync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchcartbyidaync.fulfilled, (state, action) => {
        console.log('action_______', action.payload);
        state.status = 'idle';
        state.cartproduct = action.payload ;
      })
      .addCase(fetchcartbyidaync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }).addCase(updateCartaync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartaync.fulfilled, (state, action) => {
        console.log('action_______', action.payload);
        state.status = 'idle';
        const index = state.cartproduct.findIndex((product) => product.id === action.payload.id)
        state.cartproduct[index] = action.payload ;
      })
      .addCase(updateCartaync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }).addCase(deleteCartaync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCartaync.fulfilled, (state, action) => {
        console.log('action_______', action.payload);
        const index = state.cartproduct.findIndex((product) => product.id === action.payload)
        state.cartproduct.splice(index,1) ;
      })
      .addCase(deleteCartaync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }).addCase(resetCartaync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartaync.fulfilled, (state, action) => {
        console.log('action_______', action.payload);
        state.status = 'idle';
        state.cartproduct = [] ;
      });

}
  })

  export const selectcart = (state) => state.cart.cartproduct;
  export const selectcartbyid = (state) => state.cart.cartbyid;






export default cartSlice.reducer;