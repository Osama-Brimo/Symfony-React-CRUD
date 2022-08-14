import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import { APIConsumer } from '../../context/APIContext';
import PostsLoop from '../Posts/loop/PostsLoop';

const Show = props => {

    //todo: make sure that at the router level the id can only be a string with numbers
    let context = useContext(APIConsumer);
    let params = useParams();
    let location = useLocation();
    let id = parseInt(params.id);
    
    let accountIsAppUser = !context.isGuest && id === context.appUser.id;
    let email = context.user.email;
    let posts = context.user.posts;
    let postsCount = posts?.length;

    useEffect(() => {
        context.userAPI.show(id);
    }, [location]);


    return <div id='user-show'>
        <div className='container my-5'>
            <div className='user-email'>
                <h1>{accountIsAppUser ? 'Your Account' : email}</h1>
            </div>
            <div className='user-posts'>
                <h3>Posts by {accountIsAppUser ? 'you' : email} {`(${postsCount})`}</h3>
                <div>
                    <PostsLoop posts={posts || []} />
                </div>
            </div>
        </div>
    </div>
}

export default Show;