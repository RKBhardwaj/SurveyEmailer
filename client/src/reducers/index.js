import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
import surveyReducer from './surveyReducer';

/**
 * @name combineReducers
 * @description Will combine all the reducers and return as the single reducer
 */
export default combineReducers({
    auth: authReducer,
    form: formReducer,
    surveys: surveysReducer,
    survey: surveyReducer
});