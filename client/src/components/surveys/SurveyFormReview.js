/**
 * @description Survey Form Review, shows user to review the entries they makes
 */

import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import formFields from './formFields';
import {getSurveyDetails, sendSurvey} from '../../actions';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import Utilities from '../../utils/utils';

class SurveyFormReview extends Component{
    state = {
        showResponse: false
    };

    componentWillMount() {
        this.props.getSurveyDetails(this.props.location.params);
    }

    renderFields() {
        const formValues = _.isEmpty(this.props.survey) || (this.props.survey._id !== this.props.location.params) ? {} : this.props.survey;
        return _.map(formFields, ({label, name}) => {
            return (
                <div key={name} className="survey-field">
                    <label>{label}</label>
                    <div>{Utilities.formatFormValues(formValues[name])}</div>
                </div>
            );
        });
    }

    sendSurvey() {
        const history = this.props.history;
        this.props.sendSurvey(this.props.location.params, history);
    }

    renderRespondent(recipients) {
        return _.map(recipients, (recipient) => {
            return (
                <tr key={recipient.email}>
                    <td>
                        {recipient.email}
                    </td>
                    <td>
                        {recipient.responded ? 'Yes' : 'Not Responded '}
                    </td>
                </tr>
            );
        });
    }

    renderResponse() {
        const formValues = this.props.survey || {};
        return (
            <div>
                <div className="row">
                    <div className="col-md-6 btn btn-primary">Result</div>
                    <div className="col-md-3 btn btn-success"><strong>Yes:</strong> {formValues.yes}</div>
                    <div className="col-md-3 btn btn-danger"><strong>No:</strong> {formValues.no}</div>
                </div>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <td>
                                    Email
                                </td>
                                <td>
                                    Response Status
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                        {this.renderRespondent(formValues.recipients)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="Survey-form-container">
                {
                    _.isEmpty(this.props.survey) || (this.props.survey._id !== this.props.location.params) ?
                        <div className="preloader-wrapper big active center">
                            <div className="spinner-layer spinner-blue-only">
                                <div className="circle-clipper left">
                                    <div className="circle">&nbsp;</div>
                                </div><div className="gap-patch">
                                <div className="circle">&nbsp;</div>
                            </div><div className="circle-clipper right">
                                <div className="circle">&nbsp;</div>
                            </div>
                            </div>
                        </div>
                        : ''
                }
                <h5>Please confirm your entries</h5>
                <div>
                    {this.renderFields()}
                </div>

                {
                    this.state.showResponse ?
                    <div className="">
                        {this.renderResponse()}
                    </div> : ''
                }
                <div className="btnGroup">
                    <Link to="/surveys" className="red btn-flat left white-text">
                        Cancel
                    </Link>
                    {
                        this.props.survey.length > 0 ?
                            <button
                                onClick={() => this.sendSurvey()}
                                className="green white-text btn-flat right">
                                Send Survey
                                <i className="material-icons right">email</i>
                            </button>
                            :
                            <button className="green white-text btn-flat right"
                                    onClick={() => this.setState({showResponse: !this.state.showResponse})}>
                                {!this.state.showResponse ? 'Show Response' : 'Hide Response'}
                                <i className="material-icons right cursor-pointer right">
                                    {!this.state.showResponse ? 'visibility' : 'visibility_off'}
                                </i>
                            </button>
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps({survey}) {
    return {
        survey
    };
}

export default connect(mapStateToProps, {getSurveyDetails, sendSurvey})(withRouter(SurveyFormReview));