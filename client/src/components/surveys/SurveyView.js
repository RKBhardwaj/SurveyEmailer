/**
 * @description SurveyView will show SurveyForm and SurveyReviewForm
 */
import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import SurveyFormEdit from './SurveyFormEdit';
import * as actions from '../../actions';
import {withRouter} from 'react-router-dom';
import Utilities from '../../utils/utils';
import formFields from './formFields';

class SurveyNew extends Component {
    componentWillMount() {
        this.props.getSurveyDetails(this.props.location.params);
    }

    updateSurvey(surveyId) {
        let formValues = this.props.state.form.SurveyFormEdit.values || {};
        formValues.surveyId = this.props.location.params;
        this.props.updateSurvey(formValues, this.props.history);
    }

    renderContent() {
        const formValues = this.props.state.survey || {};
        let formValueObject = {};
        _.forEach(formFields, ({name}) => {
            formValueObject[name] = Utilities.formatFormValues(formValues[name])
        });
        return <SurveyFormEdit initialValues={formValueObject} onSurveySubmit={() => this.updateSurvey()}/>
    }

    render() {
        return (
            <div>
                {
                    _.isEmpty(this.props.state.survey) || (this.props.state.survey._id !== this.props.location.params) ?
                        <div className="preloader-wrapper big active">
                            <div className="spinner-layer spinner-blue-only">
                                <div className="circle-clipper left">
                                    <div className="circle">&nbsp;</div>
                                </div>
                                <div className="gap-patch">
                                    <div className="circle">&nbsp;</div>
                                </div>
                                <div className="circle-clipper right">
                                    <div className="circle">&nbsp;</div>
                                </div>
                            </div>
                        </div>
                        :
                        this.renderContent()
                }
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