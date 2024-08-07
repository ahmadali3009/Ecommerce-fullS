import React from 'react'
import { createuser } from './authapi'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    createusers : null,
    status : "idle"
}

export const createuseraync = createAsyncThunk(
    "user/createuser",
    async(user) =>
        {
            console.log("user________" , user)
            const response = await createuser(user)
            return response.data
        }
  )


export const authSlice = createSlice({
    name : "user",
    initialState,
    reducers: {

    },
 extraReducers: (builder) => {
    builder 
    .addCase(createuseraync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createuseraync.fulfilled, (state, action) => {
        console.log('action_______', action.payload);
        state.status = 'idle';
        state.createusers = action.payload;
      })
      .addCase(createuseraync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    }

})
export const selectcreateuser = (state) => state.user.createusers;




export const {} = authSlice.actions;

export default authSlice.reducer;