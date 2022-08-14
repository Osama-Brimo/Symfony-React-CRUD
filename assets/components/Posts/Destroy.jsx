import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { APIConsumer } from '../../context/APIContext';

const Destroy = () => {
    let context = useContext(APIConsumer);
    let params = useParams();
    let id = parseInt(params.id);

    useEffect(() => {
        context.postsAPI.destroy(id);
    }, []);

    return <h1 className='logging-out'>deleting...</h1>
}

export default Destroy;