import axios from 'axios';
import {FETCH_USER, FETCH_SURVEYS, FETCH_SURVEY} from './types';
import swal from 'sweetalert2';

/**
 * @description function to save survey
 * @param values
 * @param history
 */
export const saveSurvey = (values, history) => (dispatch) => {
    swal({
        title: 'Are you sure?',
        text: 'Are you sure that you want to save the survey?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        confirmButtonClass: 'btn btn-success right',
        cancelButtonClass: 'btn btn-danger left',
        buttonsStyling: false,
        reverseButtons: true
    })
        .then(async (result) => {
            if (result.value) {
                const res = await axios.post('/api/saveSurvey', values);
                history.push('/surveys');
                swal('Send!', 'Survey has been successfully save!!!', 'success');
                dispatch({
                    type: FETCH_USER,
                    payload: res.data
                });
            }
        });
};

/**
 * @description function to update survey
 * @param values
 * @param history
 */
export const updateSurvey = (values, history) => (dispatch) => {
    swal({
        title: 'Are you sure?',
        text: 'Are you sure that you want to update the survey?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        confirmButtonClass: 'btn btn-success right',
        cancelButtonClass: 'btn btn-danger left',
        buttonsStyling: false,
        reverseButtons: true
    })
        .then(async (result) => {
            if (result.value) {
                const res = await axios.post('/api/updateSurvey', values);
                history.push('/surveys');
                swal('Send!', 'Survey has been successfully updated!!!', 'success');
                dispatch({
                    type: FETCH_USER,
                    payload: res.data
                });
            }
        });
};

/**
 * @description function to delete survey
 * @param surveyId
 */
export const deleteSurvey = (surveyId) => (dispatch) => {
    swal({
        title: 'Are you sure?',
        text: 'Are you sure that you want to delete the survey?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel',
        confirmButtonClass: 'btn btn-success right',
        cancelButtonClass: 'btn btn-danger left',
        buttonsStyling: false,
        reverseButtons: true
    })
        .then(async (result) => {
            if (result.value) {
                const res = await axios.post('/api/deleteSurvey', {surveyId});
                swal('Deleted!', 'Survey has been deleted successfully', 'success');
                dispatch({
                    type: FETCH_SURVEYS,
                    payload: res.data
                });
            }
        });
};

/**
 * @description function to fetch the list of the surveys
 */
export const fetchSurveys = () => async (dispatch) => {
    const res = await axios.get('/api/surveys');
    dispatch({
        type: FETCH_SURVEYS,
        payload: res.data
    })
};

/**
 * @description function to send mail to recipients of the survey
 * @param surveyId
 * @param history
 */
export const sendSurvey = (surveyId, history) => (dispatch) => {
    swal({
        title: 'Are you sure?',
        text: 'Are you sure that you want to send the survey to recipients?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        confirmButtonClass: 'btn btn-success right',
        cancelButtonClass: 'btn btn-danger left',
        buttonsStyling: false,
        reverseButtons: true
    })
        .then(async (result) => {
            if (result.value) {
                const res = await axios.post('/api/sendSurveys/', {surveyId});
                history.push('/surveys');
                swal('Send!', 'Survey has been successfully send to recipients', 'success');
                dispatch({
                    type: FETCH_USER,
                    payload: res.data
                });
            }
        });
};

/**
 * @description function to get the details of the survey
 * @param surveyId
 */
export const getSurveyDetails = (surveyId) => async (dispatch) => {
    const res = await axios.post('/api/getSurveyDetails', {surveyId});
    dispatch({
        type: FETCH_SURVEY,
        payload: res.data
    });
};
