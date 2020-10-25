import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART, TANG, GIAM } from '../actions/types';

const initialState = {
    cartItem: [],
    total: 0
}
export default function (state = initialState, action) {
    let cart = state.cartItem
    if (action.type === ADD_TO_CART) {
        cart.push(action.payload);
        let item = cart.find(item => item.id == action.payload.id);
        let newCart = cart.filter(item => item.id != action.payload.id);
        if (newCart) {
            item.quantity += 1;
            newCart.push(item);
            return {
                ...state,
                cartItem: newCart,
                total: state.total + action.payload.product.DonGia
            };

        } else {
            item.quantity = 1;
            let newTotal = state.total + action.payload.product.DonGia
            return {
                ...state,
                cartItem: [...cart],
                total: newTotal
            };
        }
    }
    if (action.type === REMOVE_FROM_CART) {
        let itemToRemove = cart.find(item => action.payload.id === item.id)
        let new_items = cart.filter(item => action.payload.id !== item.id)
        let newTotal = state.total - (itemToRemove.product.DonGia * itemToRemove.quantity)
        return {
            ...state,
            cartItem: new_items,
            total: newTotal
        }

    }
    if (action.type === EMPTY_CART) {
        return {
            ...state,
            cartItem: [],
            total: 0
        }

    }
    if (action.type === TANG) {
        let addedItem = cart.find(item => action.payload.id === item.id)
        addedItem.quantity += 1;
        let newTotal = state.total + addedItem.product.DonGia
        return {
            ...state,
            cartItem: [...cart],
            total: newTotal
        }
    }
    if (action.type === GIAM) {
        let addedItem = cart.find(item => action.payload.id === item.id)
        if (addedItem.quantity === 1) {
            let new_items = cart.filter(item => item.id !== action.payload.id)
            let newTotal = state.total - addedItem.product.DonGia
            return {
                ...state,
                cartItem: new_items,
                total: newTotal
            }
        }
        else {
            let sm = addedItem.quantity -= 1
            let newTotal = sm * addedItem.product.DonGia
            return {
                ...state,
                cartItem: [...cart],
                total: newTotal
            }
        }
    } else {
        return state;
    }
}