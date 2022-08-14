import React from 'react';
import Form from '../Users/Form';


const Login = props => {
    return <div id='login-page'>
        <div className='auth-header'>
            <span>Login</span>
        </div>
        <Form type='login'/>
    </div>
}

export default Login;