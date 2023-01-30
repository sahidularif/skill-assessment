import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Bill from '../bill/bill';
import Nav from '../nav/nav';

const Layout = ({ children }) => {
    const { jwt, user } = useSelector((state) => state.auth)
    return (
        <div className="text-center">
            <div className="row align-items-start g-0 mx-0">
                <div className="col-md-12">
                    <Nav />
                </div>
                <div className="col-md-12">
                    {
                        children
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default Layout;