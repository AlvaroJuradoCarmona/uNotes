import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/auth`;

const signUp = () => {
    const request = axios.post(`${baseUrl}/signup`);
    return request.then(response => response.data).catch(error => error.response.data);
}

const methods = {
    signUp
}

export default methods;