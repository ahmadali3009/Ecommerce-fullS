import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {fectchAllOrderStatus} from "./orderstatusapi"
const initialState = {
    orderinfo: [],
    status : "idle",
    error:null,
}

export const fectchAllOrderStatusasync = createAsyncThunk(
    "adminorder/AllOrderStatus",
    async() =>
        {
            const response = await fectchAllOrderStatus()
            console.log("this thnk recivdev order" , response)
            return response.data
        }
  )


  export const AdorderSSlice = createSlice({
      name : "adminorder",
      initialState,
      reducers: {
  
      },
   extraReducers: (builder) => {
      builder 
      .addCase(fectchAllOrderStatusasync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fectchAllOrderStatusasync.fulfilled, (state, action) => {
          console.log('action_______', action.payload);
          state.status = 'idle';
          state.orderinfo = action.payload;
        })
        .addCase(fectchAllOrderStatusasync.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
    }
    });

  export  const selectAllorder = (state) => state.orderstatus.orderinfo;

    export const {} = AdorderSSlice.actions;
    
    export default AdorderSSlice.reducer;