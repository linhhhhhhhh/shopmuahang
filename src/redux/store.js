import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer/reducer';
const middleware = [thunk];
const initialState = {};
export default createStore(rootReducer, initialState, applyMiddleware(...middleware));