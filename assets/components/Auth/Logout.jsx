import React, { useContext, useEffect } from 'react';
import { APIConsumer } from '../../context/APIContext';

const Logout = () => {
    let context = useContext(APIConsumer);

    useEffect(() => {
        context.authAPI.logout();
    }, []);

    return <h1 className='logging-out'>logging out...</h1>
}

export default Logout;