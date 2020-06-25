import React, { Component } from 'react';
import Login from './components/login/Login';
import classes from './Auth.module.scss';
import { Provider } from "react-redux";
import store from '../shared/store/Store'

class Auth extends Component {

    showResults = (values) => {
        window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
    }

    render() {
        return (
            <Provider store={store}>
                <div className={classes.Auth}>
                    <Login onSubmit={this.showResults}/>
                </div>
            </Provider>
        );
    }
}

export default Auth;