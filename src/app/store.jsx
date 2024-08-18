import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productsList/prodectSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartslice';
import orderReducer from '../features/order/orderSlice';

export const store = configureStore({
    reducer: {
        product: productReducer,
        user: authReducer,
        cart: cartReducer,
        order: orderReducer
    },
});