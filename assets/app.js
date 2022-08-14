/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/css/app.css';

// start the Stimulus application
import './bootstrap';

//React
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Router, Routes, Route, Outlet, useLocation, Navigate, useNavigate } from 'react-router-dom';

import APIProvider from './context/APIContext';

//Pages
import Base from './components/global/Base';
import Home from './components/Home';

//Posts 
import ShowPost from './components/Posts/Show';
import CreatePost from './components/Posts/Create';
import EditPost from './components/Posts/Update';
import DestroyPost from './components/Posts/Destroy';

//Users
import ShowUser from './components/Users/Show';
import EditUser from './components/Users/Update';
import DestroyUser from './components/Users/Destroy';

//Acount creation and authentication
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Logout from './components/Auth/Logout';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {

    let [flashMsg, setFlashMsg] = useState();
    let location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        console.log(flashMsg, 'flash');
    }, [flashMsg]);

    //Redirects
    useEffect(() => {
        //redirect for common mistakes, like login instead of /auth/login
        let pathname = location.pathname;
        if (['/login', '/register', '/logout'].includes(pathname)) {
            navigate(`/auth${pathname}`);
        }
    }, [location]);

    return <APIProvider setFlashMsg={setFlashMsg}>
        <Base>
            <Outlet></Outlet>
        </Base>
    </APIProvider>
}

root.render(
    <BrowserRouter>
        <Routes>
            <Route path={'/'} element={<App />}>

                {/* Redirects */}
                {/* <Route path='login' element={<Navigate to={'/auth/login'}/>}></Route> */}

                <Route index element={<Home />}></Route>
                <Route path='/posts'>
                    <Route path='create' element={<CreatePost />}></Route>
                    <Route path='edit/:id' element={<EditPost />}></Route>
                    <Route path='delete/:id' element={<DestroyPost />}></Route>
                    <Route path=':id' element={<ShowPost />}></Route>
                </Route>
                <Route path='/user'>
                    <Route path=':id' element={<ShowUser />}></Route>
                    <Route path='edit/:id' element={<EditUser />}></Route>
                    <Route path='delete/:id' element={<DestroyUser />}></Route>
                </Route>
                <Route path='/auth'>
                    <Route path='login' element={<Login />}></Route>
                    <Route path='register' element={<Register />}></Route>
                    <Route path='logout' element={<Logout />}></Route>
                </Route>
                <Route path='*' element={<h1>404</h1>}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
);