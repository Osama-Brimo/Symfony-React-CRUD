import React from 'react';
import Form from '../Users/Form';

const Register = props => {
    return <div id='register-page'>
        <div className='auth-header'>
            <span>Register</span>
        </div>
        <Form type='register'/>
    </div>
}

export default Register;