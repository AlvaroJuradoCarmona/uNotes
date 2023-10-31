import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/auth`;

const signUp = (userData) => {
    const request = axios.post(`${baseUrl}/signup`, userData);
    return request.then(response => response.data).catch(error => error.response.data);
}

const confirmAccount = (token) => {
    const request = axios.get(`${baseUrl}/confirmAccount/${token}`)
    return request.then(response => response.data);
}

const getAccount = async (token) => {
    const request = axios.get(`${baseUrl}/${token}`)
    return request.then(response => response.data);
}

const signIn = (userData) => {
    const request = axios.post(`${baseUrl}/signin`, userData);
    return request.then(response => response.data).catch(error => error.response.data);
}

const recoverPassword = (userData) => {
    const request = axios.put(`${baseUrl}/recover-password`, userData);
    return request.then(response => response.data).catch(error => error.response.data);
}

const updateAvatar = (userData) => {
    const request = axios.put(`${baseUrl}/updateAvatar`, userData);
    return request.then(response => response.data).catch(error => error.response.data);
}

const updateUsername = (userData) => {
    const request = axios.put(`${baseUrl}/updateUsername`, userData);
    return request.then(response => response.data).catch(error => error.response.data);
}

const updateEmail = (userData) => {
    const request = axios.put(`${baseUrl}/updateEmail`, userData);
    return request.then(response => response.data).catch(error => error.response.data);
}

const updatePassword = (userData) => {
    const request = axios.put(`${baseUrl}/updatePassword`, userData);
    return request.then(response => response.data).catch(error => error.response.data);
}

const updateStudies = (userData) => {
    const request = axios.put(`${baseUrl}/updateStudies`, userData);
    return request.then(response => response.data).catch(error => error.response.data);
}

const methods = {
    signUp,
    confirmAccount,
    getAccount,
    signIn,
    recoverPassword,
    updateAvatar,
    updateUsername,
    updateEmail,
    updatePassword,
    updateStudies
}

export default methods;