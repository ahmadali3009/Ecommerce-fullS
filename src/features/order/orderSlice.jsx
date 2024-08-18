import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { currentorder } from './orderapi'

const initialState = {
    order : null,
    status : "idle",
    error:null,

}

export const createorderaync = createAsyncThunk(
    "order/createorder",
    async(order) =>
        {
            console.log("product________" , order)
            const response = await currentorder(order)
            return response.data
        }
  )


  export const orderSlice = createSlice({
    name : "order",
    initialState,
    reducers: {
      resetOrder: (state)=>
        {
          state.order = null
        },
    },
 extraReducers: (builder) => {
    builder 
    .addCase(createorderaync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createorderaync.fulfilled, (state, action) => {
        console.log('action_______', action.payload);
        state.status = 'idle';
        state.order = action.payload;
      })
      .addCase(createorderaync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

}
  })

  export const selectorder = (state) => state.order.order;


export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;