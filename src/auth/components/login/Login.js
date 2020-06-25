import React from 'react';
import classes from './Login.module.scss';
import loginFormLogo from '../../../assets/images/logo.png'
import { Field, reduxForm } from 'redux-form';

const login = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <div className={classes.LoginForm}>
            <div className={classes.LoginFormDiv}>
                <img src={loginFormLogo} className={classes.Logo}></img>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>First Name</label>
                        <div>
                            <Field
                                name="firstName"
                                component="input"
                                type="text"
                                placeholder="First Name"
                            />
                        </div>
                    </div>
                    <div>
                        <label>Last Name</label>
                        <div>
                            <Field
                                name="lastName"
                                component="input"
                                type="text"
                                placeholder="Last Name"
                            />
                        </div>
                    </div>
                    <div>
                        <label>Email</label>
                        <div>
                            <Field
                                name="email"
                                component="input"
                                type="email"
                                placeholder="Email"
                            />
                        </div>
                    </div>
                    <div>
                        <label>Sex</label>
                        <div>
                            <label>
                                <Field name="sex" component="input" type="radio" value="male" />
                                {' '}
            Male
          </label>
                            <label>
                                <Field name="sex" component="input" type="radio" value="female" />
                                {' '}
            Female
          </label>
                        </div>
                    </div>
                    <div>
                        <label>Favorite Color</label>
                        <div>
                            <Field name="favoriteColor" component="select">
                                <option />
                                <option value="ff0000">Red</option>
                                <option value="00ff00">Green</option>
                                <option value="0000ff">Blue</option>
                            </Field>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="employed">Employed</label>
                        <div>
                            <Field
                                name="employed"
                                id="employed"
                                component="input"
                                type="checkbox"
                            />
                        </div>
                    </div>
                    <div>
                        <label>Notes</label>
                        <div>
                            <Field name="notes" component="textarea" />
                        </div>
                    </div>
                    <div>
                        <button type="submit" disabled={pristine || submitting}>Submit</button>
                        <button type="button" disabled={pristine || submitting} onClick={reset}>
                            Clear Values
        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default reduxForm({
    form: 'login', // a unique identifier for this form
})(login);