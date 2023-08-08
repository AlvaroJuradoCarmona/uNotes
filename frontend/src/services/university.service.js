import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/university`;

const getUniversities = async () => {
    const request = axios.get(`${baseUrl}/`);
    return request.then(response => response.data).catch(error => error.response.data);
}

const getUniversityById = async (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then(response => response.data).catch(error => error.response.data);
}

const methods = {
    getUniversities,
    getUniversityById
}

export default methods;