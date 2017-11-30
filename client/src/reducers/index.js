import { combineReducers } from 'redux';
import authReducer from './authReducer';

/**
 * @name combineReducers
 * @description Will combine all the reducers and return as the single reducer
 */
export default combineReducers({
    auth: authReducer
});