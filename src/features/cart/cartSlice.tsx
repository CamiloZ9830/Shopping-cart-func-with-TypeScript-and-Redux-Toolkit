import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import { ItemBP } from '../../ts-templates/productTemplate';







interface init  {
       cartItems: [] | ItemBP[] , 
       amountCart: number | undefined,
       total: number | undefined,
       isLoading: 'pending' | 'fullfilled' | 'rejected', 
       error: null | string
};

const initialState = {
    cartItems: [],
    amountCart: 0,
    total: 0,
    isLoading: 'pending'
} as init;

interface IdPayload {
       id: string
};


export const url = 'http://course-api.com/react-useReducer-cart-project';


export const getCartItems =  createAsyncThunk('cart/getCartItems',
async (url: string, thunkApi) => {
       try {
             const response = await fetch(url);
             const data: ItemBP[] = await response.json(); 
             return (data); 

       }
       catch (error: any){
          return thunkApi.rejectWithValue(error.message);
             
       }
});








const cartSlice = createSlice({
       name: 'cart',
       initialState,
       reducers: {
              clearCart: (state) => {
                     state.cartItems = [];
                     
              },
              removeItem: (state, action: PayloadAction<string>) => {
                     const itemId = action.payload;
                     state.cartItems = state.cartItems.filter((item) =>
                     item.id !== itemId);
              },
              increase: (state, {payload}: PayloadAction<IdPayload> ) => {
                     const cartItem: ItemBP | undefined  = state.cartItems.find((item: ItemBP) => 
                     item.id === payload.id);
                     console.log(cartItem);
                     if (cartItem !== undefined) {
                            cartItem.amount = cartItem?.amount? cartItem.amount + 1 
                            : undefined
                     }
                     
                     
              },
              
              decrease: (state, {payload}: PayloadAction<IdPayload>) => {
                     const cartItem: ItemBP | undefined  = state.cartItems.find((item: ItemBP) => 
                     item.id === payload.id);
                     if (cartItem !== undefined) {
                            cartItem.amount = cartItem?.amount? cartItem.amount - 1 
                            : undefined
                     }
              },
              calculateTotals: (state) => {
                     let amount: number = 0;
                     let total: number = 0;
                     
                     state.cartItems.forEach((item: ItemBP | undefined) =>  {
                           /* const itemAmount = item?.amount? amount += item.amount : undefined
                            const cartTotal = item?.amount? total += item.amount*item.price : undefined
                             return state.amountCart = itemAmount, state.total = cartTotal;*/

                             if (item !== undefined) {
                                   amount += item.amount? item.amount: amount = 0 
                                   total += item.amount? item.amount*+item.price : total = 0
                             }
                            });
                            state.amountCart = amount;
                            state.total = total;
              }
            


       },
       extraReducers: (builder) => {
              builder.addCase(getCartItems.pending, (state) => {
                     state.isLoading = 'pending';
              })
              builder.addCase(getCartItems.fulfilled, (state, action: PayloadAction<ItemBP[]>) => {
                     state.isLoading = 'fullfilled';
                     state.cartItems = action.payload;
                     
              })
              builder.addCase(getCartItems.rejected, (state, action: PayloadAction<any>) => {
                     state.isLoading = 'rejected';
                     state.error = action.payload 
              })
              
       }
});

export const {clearCart, removeItem, increase, decrease, calculateTotals} = cartSlice.actions;
export default cartSlice.reducer 