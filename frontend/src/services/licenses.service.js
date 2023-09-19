import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/license`;

const getLicenses = async () => {
    const request = axios.get(`${baseUrl}/`);
    return request.then(response => response.data);
}

const methods = {
    getLicenses
}

export default methods;