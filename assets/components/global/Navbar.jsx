import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { APIConsumer } from '../../context/APIContext';

const Navbar = props => {

    let context = useContext(APIConsumer);
    let isGuest = context.isGuest;
    let userId = !isGuest ? context.appUser.id : null;

    console.log(context.appUser, 'from navbar')

    let guestLinks =
        <>
            <li><Link to={'/auth/login'}> Login </Link></li>
        </>
    let appUserLinks =
        <>
            <li><Link to={'/auth/logout'}> Logout </Link></li>
            <li><Link to={`/user/${userId}`}> Profile </Link></li>
        </>

    return <header>
        <div className='d-flex justify-content-between container-fluid'>
            <div className='left'>
                <span>Symfony Blog</span>
            </div>
            <div className='right'>
                <nav className='site-navigation'>
                    <ul>
                        <li><Link to={'/'}> Home </Link></li>
                        {isGuest ? guestLinks : appUserLinks}
                    </ul>
                </nav>
            </div>
        </div>
    </header>
}

export default Navbar;