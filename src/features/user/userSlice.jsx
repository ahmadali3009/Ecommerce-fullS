import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { featchorderbyuserid, fetchuserinfo, updateUserprofile } from './userapi'

const initialState = {
    userOrder : [],
    userinfo : null,
    status : "idle",
    error:null,

}

export const featchorderbyuseridaAync = createAsyncThunk(
    "user/featchorderbyuserid",
    async(id) =>
        {
            console.log("product________" , id)
            const response = await featchorderbyuserid(id)
            return response.data
        }
  )
  export const fetchuserinfoAync = createAsyncThunk(
    "user/fetchuserinfo",
    async(id) =>
        {
            console.log("product________" , id)
            const response = await fetchuserinfo(id)
            return response.data
        }
  )
  export const updateUserprofileAync = createAsyncThunk(
    "user/updateUser",
    async(update) =>
        {
            console.log("userprofile" , update)
            const response = await updateUserprofile(update)
            return response.data
        }
  )

 

  export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers: {
    
    },
 extraReducers: (builder) => {
    builder 
    .addCase(featchorderbyuseridaAync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(featchorderbyuseridaAync.fulfilled, (state, action) => {
        console.log('action_______', action.payload);
        state.status = 'idle';
        state.userOrder = action.payload;
      })
      .addCase(featchorderbyuseridaAync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }) .addCase(fetchuserinfoAync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchuserinfoAync.fulfilled, (state, action) => {
        console.log('action_______', action.payload);
        state.status = 'idle';
        state.userinfo = action.payload;
      }).addCase(updateUserprofileAync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserprofileAync.fulfilled, (state, action) => {
        console.log('action_______updateUserprofileAync', action.payload);
        state.status = 'idle';
        const index = state.userinfo.findIndex((user) => user.id === action.payload.id)
        if (index !== -1) {
          state.userinfo[index].addresses = action.payload.addresses;
      }      })
      .addCase(updateUserprofileAync.rejected, (state, action) => {
        state.status = 'failed';
        console.log("error" , action.error)
        state.error = action.error;
      });

}
  })

  export const selectuserorder = (state) => state.userinfo.userOrder;
  export const selectuserinfo = (state) => state.userinfo.userinfo;



export const {  } = userSlice.actions;

export default userSlice.reducer;