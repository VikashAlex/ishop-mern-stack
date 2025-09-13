import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    originalPrice_Total: 0,
    finalPrice_Total: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addTocart: (state, { payload }) => {
            const { productId, originalPrice, finalPrice } = payload;
            const exsiting = state.items.find((item) => item.productId == productId);
            if (exsiting) {
                exsiting.qnty++
            } else {
                state.items.push({ productId, qnty: 1 })
            }
            state.originalPrice_Total += originalPrice
            state.finalPrice_Total += finalPrice
            localStorage.setItem('cart', JSON.stringify(state))
        },
        lsCartItem: (state) => {
            const cart = JSON.parse(localStorage.getItem('cart'));
            if (cart) {
                state.items = cart.items;
                state.originalPrice_Total = cart.originalPrice_Total
                state.finalPrice_Total = cart.finalPrice_Total
            }
        },
        removeTocart: (state, { payload }) => {
            const { _id, finalPrice, originalPrice } = payload;
            state.items = state.items.filter(item => item.productId !== _id);
            state.originalPrice_Total -= originalPrice
            state.finalPrice_Total -= finalPrice
            localStorage.setItem('cart', JSON.stringify(state))
        },

    },
})


export const { addTocart, lsCartItem, removeTocart } = cartSlice.actions

export default cartSlice.reducer