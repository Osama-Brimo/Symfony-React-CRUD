import React, { useContext, useEffect } from 'react';
import { APIConsumer } from '../../context/APIContext';
import SinglePost from '../global/SinglePost';
import PostsLoop from './loop/PostsLoop';



const Index = () => {
    let context = useContext(APIConsumer);
    let posts = context.posts;
    console.log(context.posts, 'con')

    useEffect(() => {
        context.postsAPI.index();
    }, [])

    return <div className='posts-index'>
        <PostsLoop posts={posts} />
    </div>
}

export default Index;