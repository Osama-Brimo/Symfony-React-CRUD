import React from 'react'
import SinglePost from '../../global/SinglePost'

const PostsLoop = ({ posts }) => {
    return <>
        {posts.map(post => {
            console.log(post.user);
            return <SinglePost
                key={post.id}
                title={post.title}
                date={post.date}
                content={post.content}
                user={post.user?.email}
                showFull={false}
            />
        })}
    </>
}

export default PostsLoop;