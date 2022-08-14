import React from 'react';

import Navbar from './Navbar';
import Footer from './Footer';

const Base = props => {
    return <div id='site'>
        <Navbar />
        <div id='site-content'>
            {props.children}
        </div>
        <Footer />
    </div>
}

export default Base;