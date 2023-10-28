import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/user`;

const getUsers = async () => {
    const request = axios.get(`${baseUrl}/users`);
    return request.then(response => response.data);
}

const getUserById = async (idUser) => {
    const request = axios.get(`${baseUrl}/getUserById/${idUser}`);
    return request.then(response => response.data);
}

const deleteUser = async (idUser) => {
    const request = axios.delete(`${baseUrl}/${idUser}`)
    return request.then(response => response.data)
}

const getUsersCountLastWeek = async () => {
    const request = axios.get(`${baseUrl}/getUsersCountLastWeek`);
    return request.then(response => response.data);
}

const methods = {
    getUsers,
    getUserById,
    deleteUser,
    getUsersCountLastWeek
}

export default methods;