/**
 * @description Will responsible for redux setup in the app
 */
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk'; 
//Gives direct access to dispatch function when we use reduxThunk as the middleware in the store. 
//When any actions return function then it automatically the function inside in it call the dispatch method.

import App from './components/App';
import reducers from './reducers';

//Creating store using createStore from redux
/**
 * @name createStore .
 * @description - method will create the store which contains the state, will have three arguments 
 * 1. Reducer
 * 2. state
 * 3. Middleware
 */
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

/**
 * Provide - redux function which knows how to work with store
 * Store - will contains the states of the app
 */
ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.querySelector('#root')
);