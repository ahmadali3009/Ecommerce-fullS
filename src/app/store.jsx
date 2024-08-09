import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productsList/prodectSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartslice';
export const store = configureStore({
    reducer: {
        product: productReducer,
        user: authReducer,
        cart: cartReducer,
    },
});