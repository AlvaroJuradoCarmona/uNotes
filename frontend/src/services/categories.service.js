import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/category`;

const getCategories = async () => {
    const request = axios.get(`${baseUrl}/category`);
    return request.then(response => response.data);
}

const getLanguages = async () => {
    const request = axios.get(`${baseUrl}/language`);
    return request.then(response => response.data);
}

const getLanguageByCategoryId = async (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

const methods = {
    getCategories,
    getLanguages,
    getLanguageByCategoryId
}

export default methods;