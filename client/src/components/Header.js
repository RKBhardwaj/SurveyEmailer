import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    renderContent() {
        //console.log(this.props.auth );
        switch (this.props.auth) {
            case null:
                return; //"Still Deciding";
            case false:
                return (
                    <li><a href="/auth/google">Login With Google</a></li>
                );
            default:
                return [
                    <li key="1"><Payments/></li>,
                    <li key="3" className="credit-score" >
                        <a href="">Credits: {this.props.auth.credits}</a>
                    </li>,
                    <li key="2"><a href="/api/logout">Logout</a></li>
                ];
        }
    }

    render() {
        //console.log(this.props);
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link className="left brand-logo"
                          to={this.props.auth ? '/surveys' : '/'}>
                        Emaily
                    </Link>
                    <a href="/#" data-activates="mobile-demo" className="button-collapse">
                        <i className="material-icons">menu</i>
                    </a>
                    <ul className="right hide-on-med-and-down">
                        {this.renderContent()}
                    </ul>
                    <ul className="side-nav" id="mobile-demo">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps({auth}) {
    return {auth};
}

export default connect(mapStateToProps)(Header);