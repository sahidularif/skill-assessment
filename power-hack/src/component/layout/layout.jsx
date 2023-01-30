import React from 'react';
import Bill from '../bill/bill';
import Nav from '../nav/nav';

const Layout = () => {
    return (
        <div className="text-center">
            <div className="row align-items-start g-0 mx-0">
                <div className="col-md-12">
                    <Nav />
                </div>
                <div className="col-md-12">
                    <Bill/>
                </div>
            </div>
        </div>
    );
};

export default Layout;