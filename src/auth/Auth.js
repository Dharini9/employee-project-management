import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class Auth extends Component {
    render() {
        return (
            <div>
                Auth Component working!!
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >Sign In</Button>
            </div>
        );
    }
}

export default Auth;