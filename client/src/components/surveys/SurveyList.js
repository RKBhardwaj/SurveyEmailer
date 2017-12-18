import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchSurveys, deleteSurvey} from "../../actions";

class SurveyList extends Component {
    componentWillMount() {
        this.props.fetchSurveys();
    }

    renderSurveys() {
        return this.props.surveys.map((survey) => {
            return (
                <div key={survey._id} className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">
                            {survey.title}
                            <Link to={{pathname: "/survey/view/" + survey._id, params: survey._id }}>
                                <i className="material-icons right cursor-pointer" title="View Survey">
                                    visibility
                                </i>
                            </Link>
                            <Link to={{pathname: "/survey/edit/" + survey._id, params: survey._id }}>
                                <i className="material-icons right cursor-pointer" title="Edit Survey">
                                    create
                                </i>
                            </Link>
                        </span>
                        <p>
                            {survey.body}
                        </p>
                        <p className="right">
                            {survey.dateSent ? 'Sent on: ' + new Date(survey.dateSent).toLocaleDateString() : 'Not Send Yet'}
                        </p>
                    </div>
                    <div className="card-action btnBox">
                        <div className="resultBox">
                            <a>Yes: {survey.yes}</a>
                            <a>No: {survey.no}</a>
                        </div>
                        <div className="deleteBtn">
                            <a className="white-text" onClick={() => this.props.deleteSurvey(survey._id)}>
                                <i className="material-icons right">delete</i>
                            </a>
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <div className="createNewBtn">
                    <Link to="/surveys/new" className="btn-floating btn-large red">
                        <i className="large material-icons">add</i>
                    </Link>
                </div>
                {this.renderSurveys()}
            </div>
        );
    }
}

function mapStateToProps({surveys}) {
    return {surveys};
}

export default connect(mapStateToProps, {fetchSurveys, deleteSurvey})(SurveyList);