import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/subject`;

const getSubjects = async () => {
    const request = axios.get(`${baseUrl}/`);
    return request.then(response => response.data).catch(error => error.response.data);
}

const getSubjectsByCourse = async (course) => {
    const request = axios.get(`${baseUrl}/?course=${course}`);
    return request.then(response => response.data).catch(error => error.response.data);
}

const getSubjectById = async (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then(response => response.data).catch(error => error.response.data);
}

const methods = {
    getSubjects,
    getSubjectsByCourse,
    getSubjectById,
}

export default methods;