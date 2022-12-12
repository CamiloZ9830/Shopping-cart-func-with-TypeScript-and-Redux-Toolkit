import {configureStore} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import cartReducer from './features/cart/cartSlice';
import modalReducer from './features/modal/modalSlice';

export const store = configureStore({
     reducer: {
        cart: cartReducer,
        modal: modalReducer
        
     },
        
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

