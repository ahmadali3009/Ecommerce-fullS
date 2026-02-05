import { createuser , checkuser, checkAuth } from './authapi'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    createusers :{
      addresses : [],
    } ,
    checkuser : null,
    status : "idle",
    userChecked : false,
    error:null,
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
  export const checkuseraync = createAsyncThunk(
    "user/checkuser",
    async(loginuser) =>
        {
            console.log("user________" , loginuser)
            const response = await checkuser(loginuser)
            return response.data
        }
  )

  export const checkAuthAsync = createAsyncThunk(
    'user/checkAuth',
    async () => {
      try {
        const response = await checkAuth();
        console.log("response checkAuthAsync", response)
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  );

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
      })  .addCase(checkuseraync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkuseraync.fulfilled, (state, action) => {
        console.log('checkuserfullfilledloginuser_______', action.payload);
        state.status = 'idle';
        state.checkuser = action.payload;
      })
      .addCase(checkuseraync.rejected, (state, action) => {
        state.status = 'failed';
        console.log("error" , action.error)
        state.error = action.error;
      }).addCase(checkAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.checkuser = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, _action) => {
        state.status = 'idle';
        state.userChecked = true;
      });
    }

})
export const selectcreateuser = (state) => state.user.createusers;
export const selectcheckuser = (state) => state.user.checkuser;
export const selecterror = (state) => state.user.error;
export const selectUserChecked = (state) => state.user.userChecked;
export const selectAuthStatus = (state) => state.user.status;





export default authSlice.reducer;