import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { APIConsumer } from '../../context/APIContext';



const Form = ({ method, title = '', content = '' }) => {
    let context = useContext(APIConsumer);
    let params = useParams();
    let id = params.id;

    let msgBasedOnMethod = method === 'POST' ? 'Create' : method === 'PUT' ? 'Edit' : 'Submit';

    function handleSubmit(e) {
        e.preventDefault();
        let data = {
            content: e.target.content.value,
            title: e.target.title.value
        }
        if (method === 'POST') {
            context.postsAPI.store(data);
        } else if (method === 'PUT') {
            context.postsAPI.update(data, id);
        }
    }

    return <div id='posts-form' className='app-form'>
        <form onSubmit={handleSubmit} name='posts-form'>
            <div className='form-field'>
                <label htmlFor="title">
                    <span>Title</span>
                    <input type="text" name='title' />
                </label>
            </div>
            <div className='form-field'>
                <label htmlFor="content">
                    <span>Content</span>
                    <textarea name="content" id="" cols="30" rows="10">

                    </textarea>
                </label>
            </div>
            <button type="submit">{`${msgBasedOnMethod} Post`}</button>
        </form>
    </div>
}

export default Form;