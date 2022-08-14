import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router";

let APIContext = createContext();



const APIProvider = props => {
    let [posts, setPosts] = useState([]);
    let [user, setUser] = useState([]);


    let [appUser, setAppUser] = useState({});
    let [isGuest, setIsGuest] = useState(true);

    let navigate = useNavigate();

    useEffect(() => {
        // When the provider intializes, ask the server for the current user
        // Otherwise, we would have to login to do so whenever the app reloads
        getCurrentUser();
    }, []);

    useEffect(() => {
        console.log(user);
    }, [user])

    useEffect(() => {
        console.log(appUser, 'app user');
        let noUser = !appUser || Object.keys(appUser).length === 0;
        if (noUser) {
            setIsGuest(true);
        } else {
            setIsGuest(false);
        }
        // We could also redirect routes that require 
        // authorization from here instead of within the api functions
        // navigate('/');
    }, [appUser]);


    //Auth API
    function login(data) {
        axios.post('/api/login', data)
            .then(res => {
                console.log(res, 'login response');
                setAppUser(res.data);
                navigate('/');
            })
            .catch(err => console.error(err));
    }

    function logout() {
        axios.get('/api/logout')
            .then(res => {
                console.log(res, 'logout response');
                navigate('/');
            })
            .catch(err => console.error(err));
    }

    function register(data) {
        axios.post('/api/register', data)
            .then(res => {
                console.log(res, 'register response')
                console.log(data, 'the form data from axios')
            })
            .catch(err => console.error(err));
    }

    function getCurrentUser() {
        axios.get('/api/current_user')
            .then(res => setAppUser(res.data))
            .catch(err => console.error(err));
    }

    //Posts API
    function getPosts() {
        axios.get('/api/posts').then(res => {
            setPosts(res.data.slice());
        });
    }

    function getPost(id) {
        axios.get(`/api/posts/${id}`)
            .then(res => setPosts(res.data));
    }

    function storePost(data) {
        console.log(data, 'the data')
        axios.post('/api/posts/create', data)
            .then(res => console.log(res, data))
            .catch(err => console.log(err, 'err'));
    }

    function updatePost(data, id) {
        axios.put(`/api/posts/${id}`, data)
            .then(res => console.log(res))
            .catch(err => console.log(err, 'err'));
    }

    function destroyPost(id) {
        axios.delete(`/api/posts/${id}`)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err, 'err'));
    }

    //User API
    function getUser(id) {
        axios.get(`/api/user/${id}`)
            .then(res => {
                console.log(res);
                setUser(res.data);
            });
    }

    function updateUser(data, id) {
        axios.put(`/api/user/${id}`, data)
            .then(res => console.log(res))
            .catch(err => console.log(err, 'err'));
    }

    function destroyUser(id) {
        console.log('axios store')
        axios.delete(`/api/user/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err, 'err'));
    }


    return <APIContext.Provider value={{
        postsAPI: {
            index: getPosts,
            show: getPost,
            store: storePost,
            update: updatePost,
            destroy: destroyPost
        },
        userAPI: {
            show: getUser,
            update: updateUser,
            destroy: destroyUser
        },
        authAPI: {
            login: login,
            logout: logout,
            register: register
        },
        posts: posts,
        user: user,
        isGuest: isGuest,
        appUser: appUser

    }}>
        {props.children}
    </APIContext.Provider>
}

export default APIProvider;
export const APIConsumer = APIContext;
