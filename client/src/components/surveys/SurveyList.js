import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchSurveys, deleteSurvey} from "../../actions";

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderSurveys() {
        return this.props.surveys.reverse().map((survey) => {
            return (
                <div key={survey._id} className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">{survey.title}</span>
                        <span className="right">
                            <i className="material-icons">create</i>
                        </span>
                        <p>
                            {survey.body}
                        </p>
                        <p className="right">
                            Sent on: {new Date(survey.dateSent).toLocaleDateString()}
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

    render(surveys) {
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