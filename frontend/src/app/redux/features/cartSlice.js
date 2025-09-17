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
            const { product, items } = payload
            const findeqnty = items.find((item) => item.productId == product._id)
            const { _id, finalPrice, originalPrice } = product;
            state.items = state.items.filter(item => item.productId !== _id);
            state.originalPrice_Total -= originalPrice * findeqnty.qnty
            state.finalPrice_Total -= finalPrice * findeqnty.qnty
            console.log(state.items)
            localStorage.setItem('cart', JSON.stringify(state))
        },
        addQnty: (state, { payload }) => {
            const { product, type } = payload;
            const exiting = state.items.find((item) => item.productId == product._id)
            if (type == "+") {
                exiting.qnty++
            } else if (type == "-") {
                exiting.qnty--
            }
            
            localStorage.setItem('cart', JSON.stringify(state))
        },
    },
})


export const { addTocart, lsCartItem, removeTocart, addQnty } = cartSlice.actions

export default cartSlice.reducer