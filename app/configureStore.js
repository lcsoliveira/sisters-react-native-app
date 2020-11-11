import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk';

import { rootReducer } from './reducer.js'; 

export default function configureStore(initialState = {}) {

  return createStore(rootReducer, initialState, applyMiddleware(thunk))
}

