/**
 * @description SurveyNew will show SurveyForm and SurveyReviewForm
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import SurveyForm from './SurveyForm';
import * as actions from '../../actions';
import {withRouter} from 'react-router-dom';

class SurveyNew extends Component {
    saveSurvey() {
        let formValues = {};
        if (this.props.state.form.surveyForm.values) {
            formValues = this.props.state.form.surveyForm.values;
        }
        this.props.saveSurvey(formValues, this.props.history);
    }

    render() {
        return (
            <div>
                <SurveyForm onSurveySubmit={() => this.saveSurvey()}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyNew));