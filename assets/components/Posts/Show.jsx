import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { APIConsumer } from '../../context/APIContext';
import SinglePost from '../global/SinglePost';



const Show = () => {
    let context = useContext(APIConsumer);
    let post = context.posts;
    console.log(post, 'show post');
    let { id } = useParams();
    let isOwner = !context.isGuest && post.user?.id === context.appUser?.id;

    useEffect(() => {
        context.postsAPI.show(id);
    }, [])

    return <div className='post-show'>
        <SinglePost
            key={post.id}
            title={post.title}
            date={post.date}
            content={post.content}
            user={post.user?.email}
            showFull={true}
        />
        {
            isOwner ?
                <div className='delete-post-link'>
                    <Link to={`/posts/delete/${id}`}>Delete Post</Link>
                </div> :
                null
        }
    </div>
}

export default Show;