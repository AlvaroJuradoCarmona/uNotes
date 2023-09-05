import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/user`;

const getUserById = async (idUser) => {
    const request = axios.get(`${baseUrl}/getUserById/${idUser}`);
    return request.then(response => response.data);
}

const methods = {
    getUserById
}

export default methods;