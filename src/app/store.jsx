import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productsList/prodectSlice';
export const store = configureStore({
    reducer: {
        product: productReducer,
    },
});