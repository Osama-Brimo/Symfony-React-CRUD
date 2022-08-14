import React from 'react';

const SinglePost = ({ title, user, date, content, showFull = false }) => {
    return <div className='single-post py-4'>
        <div className='post-container'>

            <div className='post-top'>
                <div className='d-flex flex-column'>
                    <div className='post-title'>
                        <span> {title || 'Placeholder Title'} </span>
                    </div>

                    <div className='d-flex'>
                        {
                            /* 
                            We don't have access to the user in cases where
                            we get user>post such as when showing profiles
                            (see /src/UserController.php)
                            */
                        }
                        {
                            user ?
                                <div className='post-user'>
                                    <span> {user} </span>
                                </div>
                                :
                                null
                        }

                        <div className='post-date'>
                            <span> {date || 'Placeholder Date'} </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='post-bottom'>
                <div className='post-content'>
                    <span> {showFull ? content : `${content.slice(0, 50)}...` || 'Placeholder Content'} </span>
                </div>
            </div>

        </div>
    </div>
}

export default SinglePost;