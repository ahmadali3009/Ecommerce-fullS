import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { featchorderbyuserid, fetchuserinfo, updateUser, updateUserprofile } from './userapi'

const initialState = {
    userOrder : [],
    userinfo : null,
    status : "idle",
    error:null,

}

export const featchorderbyuseridaAync = createAsyncThunk(
    "user/featchorderbyuserid",
    async() =>
        {
            const response = await featchorderbyuserid()
            return response.data
        }
  )
  export const fetchuserinfoAync = createAsyncThunk(
    "user/fetchuserinfo",
    async() =>
        {
            const response = await fetchuserinfo()
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

  export const updateUseraync = createAsyncThunk(
    "cart/updateuser",
    async(update) =>
        {
            console.log("userid________" , update)
            const response = await updateUser(update)
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
        console.log('action_______orderarraydata', action.payload);
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
        console.log('fetchuserinfoAync//////////', action.payload);
        state.status = 'idle';
        state.userinfo = action.payload;
      }).addCase(updateUserprofileAync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserprofileAync.fulfilled, (state, action) => {
        console.log('action_______updateUserprofileAync', action.payload);
        state.status = 'idle';
          state.userinfo.addresses = action.payload.addresses;
         })
      .addCase(updateUserprofileAync.rejected, (state, action) => {
        state.status = 'failed';
        console.log("error" , action.error)
        state.error = action.error;
      }).addCase(updateUseraync.pending, (state) => {
        state.status = 'loading';
      }) .addCase(updateUseraync.fulfilled, (state, action) => {
        console.log('action_______', action.payload);
        state.status = 'idle';
    
        // Update createusers addresses
        state.userinfo.addresses = [...state.userinfo.addresses, ...action.payload.addresses];
    
        // Check if checkuser is null, if so initialize it
        if (state.checkuser === null) {
            state.userinfo = {
                addresses: [...action.payload.addresses],
                // Add any other properties from action.payload if needed
            };
        } else {
            // Merge the addresses into the existing checkuser object
            state.userinfo = {
                ...state.userinfo,
                addresses: [...state.userinfo.addresses, ...action.payload.addresses],
            };
        }
    }).addCase(updateUseraync.rejected, (state, action) => {
        state.status = 'failed';
        console.log("error" , action.error)
        state.error = action.error;
      });

}
  })

  export const selectuserorder = (state) => state.userinfo.userOrder;
  export const selectuserinfo = (state) => state.userinfo.userinfo;



export default userSlice.reducer;