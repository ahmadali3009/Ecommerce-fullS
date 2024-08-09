import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addtocart } from './cartapi'

const initialState = {
    cartproduct : [],
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
      });

}
  })

  export const selectcart = (state) => state.cart.cartproduct;





export const {} = cartSlice.actions;

export default cartSlice.reducer;