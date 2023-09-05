import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/file`;

const getFiles = async () => {
    const request = axios.get(`${baseUrl}/`);
    return request.then(response => response.data).catch(error => error.response.data);
}

const addFile = (fileData) => {
    const request = axios.get(`${baseUrl}/`, fileData);
    return request.then(response => response.data).catch(error => error.response.data);
}

const methods = {
    getFiles,
    addFile
}

export default methods;