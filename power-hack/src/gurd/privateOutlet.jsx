import React from 'react'
import jwtDecode from 'jwt-decode';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
export default function PrivateOutlet() {
    const location = useLocation()
    const { jwt } = useSelector((state) => state.auth);
    const auth = false;
    let from = location.state?.from?.pathname || "/login";
    const isValidJWT = () => {
        const token = sessionStorage.getItem('token');
        if (!jwt) return false;
        const decodedToken = jwtDecode(token);
        const jwtExpirationMs = decodedToken.exp * 1000;
        return decodedToken.exp > jwtExpirationMs;
    }
    useEffect(() => {
        if (!jwt && !isValidJWT) return;
    }, [])

    return (jwt && isValidJWT) ?
        <Outlet />
        :
        <Navigate
            to={{
                pathname: '/login',
                state: { from: location },
            }} />;
}
