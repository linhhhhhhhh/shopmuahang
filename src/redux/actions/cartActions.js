import { ADD_TO_CART, REMOVE_FROM_CART,TANG,GIAM, EMPTY_CART} from './types';

export const addToCart = (product,id) => dispatch => {
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product,
            id,
            quantity:0
        }
    })
}
export const tang = (id) => dispatch => {
    dispatch({
        type: TANG,
        payload: {
           id:id,
        }
    })
}
export const giam = (id) => dispatch => {
    dispatch({
        type: GIAM,
        payload: {
           id:id,
        }
    })
}
export const removeItem = (id) => dispatch => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: {
           id:id
        }
    })
}
export const emptyCart= () => dispatch => {
    dispatch({
        type: EMPTY_CART,
        
    })
}