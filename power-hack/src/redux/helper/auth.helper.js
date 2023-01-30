import axios from 'axios';
import jwt_decode from 'jwt-decode';

//Base Url

const API_URL = "http://localhost:5000/api/"

// User Registration
const register = async (newUser) => {
    const response = await axios.post(API_URL + "registration", newUser);
    console.log(response)
    return response.data;
};


// User Login
const login = async (user) => {
    const response = await axios.post(API_URL + "login", user);
console.log(response)
    if (response.data) {
        localStorage.setItem('jwt', JSON.stringify(response.data.token));
        // console.log(response.data)
        const decodedJwt = jwt_decode(response.data.token);
        // console.log(decodedJwt)
        localStorage.setItem('user', JSON.stringify(decodedJwt.user));
        return { jwt: response.data.token, user: decodedJwt.user };
    }
    return { jwt: response.data, user: null };
};


// User Logout
const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
};


const authService = {
    register,
    login,
    logout,
};

export default authService;
