import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/language`;

const getLanguages = async () => {
    const request = axios.get(`${baseUrl}/`);
    return request.then(response => response.data).catch(error => error.response.data);
}

const getLanguagesByYear = async (year) => {
    const request = axios.get(`${baseUrl}/?year=${year}`);
    return request.then(response => response.data).catch(error => error.response.data);
}

const getLanguageById = async (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then(response => response.data).catch(error => error.response.data);
}

const addLanguage = async () => {
    const request = axios.get(`${baseUrl}`);
    return request.then(response => response.data).catch(error => error.response.data);
}

const updateLanguage = async (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then(response => response.data).catch(error => error.response.data);
}

const deleteLanguage = async (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then(response => response.data).catch(error => error.response.data);
}

const methods = {
    getLanguages,
    getLanguagesByYear,
    getLanguageById,
    addLanguage,
    updateLanguage,
    deleteLanguage
}

export default methods;