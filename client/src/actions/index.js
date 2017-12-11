import axios from 'axios';
import {FETCH_USER, FETCH_SURVEYS} from './types';
import swal from 'sweetalert2';

export const fetchUser = () => async (dispatch) => {
    const res = await axios.get('/api/current_user');
    dispatch({
        type: FETCH_USER,
        payload: res.data
    });
};

export const handleToken = (token) => async (dispatch) => {
    const res = await axios.post('/api/handlePayment', token);
    dispatch({
        type: FETCH_USER,
        payload: res.data
    });
};

export const submitSurvey = (values, history) => async (dispatch) => {
    const res = await axios.post('/api/surveys/', values);
    history.push('/surveys');
    dispatch({
        type: FETCH_USER,
        payload: res.data
    });
};

export const fetchSurveys = () => async (dispatch) => {
    const res = await axios.get('/api/surveys');
    dispatch({
        type: FETCH_SURVEYS,
        payload: res.data
    })
};

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