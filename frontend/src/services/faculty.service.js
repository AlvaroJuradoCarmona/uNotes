import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/faculty`;

const getFaculties = async () => {
    const request = axios.get(`${baseUrl}/`);
    return request.then(response => response.data).catch(error => error.response.data);
}

const getFacultiesByUniversity = async (idUniversity) => {
    const request = axios.get(`${baseUrl}/?idUniversity=${idUniversity}`);
    return request.then(response => response.data).catch(error => error.response.data);
}

const getFacultyById = async (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then(response => response.data).catch(error => error.response.data);
}

const methods = {
    getFaculties, 
    getFacultiesByUniversity,
    getFacultyById
}

export default methods;