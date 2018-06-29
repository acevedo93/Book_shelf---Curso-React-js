import React from 'react';
import Header from '../components/Header/Header'

const Layout = (props) => (
    <div>
        <div>
            <Header/>
            <div>
                {props.children}
            </div>
        </div>
        
    </div>
);

export default Layout;
