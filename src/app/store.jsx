import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productsList/prodectSlice';
import authReducer from '../features/auth/authSlice';
export const store = configureStore({
    reducer: {
        product: productReducer,
        user: authReducer,
    },
});