// * Description: App Entry Point
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import configureStore from './app/configureStore';

const initialState = {};
const store = configureStore(initialState);

import Router from './app/router'

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        ) 
    }
}