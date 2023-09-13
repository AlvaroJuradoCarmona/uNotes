import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/category`;

const getCategories = async () => {
    const request = axios.get(`${baseUrl}/`);
    return request.then(response => response.data);
}

const methods = {
    getCategories
}

export default methods;