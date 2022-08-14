import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { APIConsumer } from '../../context/APIContext';

// Form used for any input for a user entity (login, registation, update)

const Form = ({ type }) => {
    let context = useContext(APIConsumer);
    let params = useParams();

    let id = parseInt(params.id);
    let formMsgs =
    {
        login: 'Login',
        register: 'Register',
        edit: 'Edit Info'
    };

    function handleSubmit(e) {
        let data = {
            username: e.target.email.value,
            password: e.target.password.value
        };
        console.log(data, 'form data');
        e.preventDefault();
        if (type === 'login') {
            context.authAPI.login(data);
        } else if (type === 'register') {
            context.authAPI.register(data);
        } else if (type === 'edit') {
            context.userAPI.update(data, id);
        }
    }

    return <div id='auth-form' className='app-form'>
        <h1>{ formMsgs[type] }</h1>
        <form onSubmit={handleSubmit} name='posts-form'>
            <div className='form-field'>
                <label htmlFor="email">
                    <span>email</span>
                    <input type="text" name='email' />
                </label>
            </div>
            <div className='form-field'>
                <label htmlFor="password">
                    <span>Password</span>
                    <input type="password" name='password' />
                </label>
            </div>
            <button type="submit">Go</button>
        </form>
    </div>
}

export default Form;