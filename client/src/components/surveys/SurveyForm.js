/**
 * @description SurveyForm shows a form for a user to add input
 */
import _ from 'lodash';
import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import SurveyField from './SurveyField';
import {Link} from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
    renderFields() {
        return _.map(formFields, ({label, name}) => {
            return <Field key={name} component={SurveyField} type="text" label={label} name={name}/>
        });
    }

    render() {
        return (
            <div className="Survey-form-container">
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <div className="btnGroup">
                        <Link to="/surveys" className="btn btn-danger white-text">
                            Cancel
                        </Link>
                        <button type="submit" className="btn btn-success white-text">
                            Save
                            <i className="material-icons right">done</i>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

/**
 * @description Values params contains all the values of fields in the form
 * @param values
 */
function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({name, noValueError}) => {
        if (!values[name]) {
            errors[name] = noValueError;
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);