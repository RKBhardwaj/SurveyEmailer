/**
 * @description will responsible for react setup in app
 */
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import SurveyView from './surveys/SurveyView';
import SurveyFormReview from './surveys/SurveyFormReview';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route exact path="/Surveys/new" component={SurveyNew} />
                        <Route path="/Survey/edit" component={SurveyView} />
                        <Route path="/Survey/view/" component={SurveyFormReview} />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default connect(null, actions)(App);