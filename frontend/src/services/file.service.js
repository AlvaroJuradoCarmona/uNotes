import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/file`;

const getFiles = async () => {
    const request = axios.get(`${baseUrl}/`);
    return request.then(response => response.data);
}

const getFileById = async (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

const addFile = (fileData) => {
    const request = axios.post(`${baseUrl}/file`, fileData);
    return request.then(response => response.data).catch(error => error.response.data);
}

const addCode = (fileData) => {
    const request = axios.post(`${baseUrl}/code`, fileData);
    return request.then(response => response.data).catch(error => error.response.data);
}

const getFilesBySubjectId = async (idSubject) => {
    const request = axios.get(`${baseUrl}/subject/${idSubject}`);
    return request.then(response => response.data);
}

const getFilesByUserId = async (idUser) => {
    const request = axios.get(`${baseUrl}/profile/${idUser}`);
    return request.then(response => response.data);
}

const addViewLog = (fileData) => {
    const request = axios.post(`${baseUrl}/view`, fileData);
    return request.then(response => response.data).catch(error => error.response.data);
}

const   methods = {
    getFiles,
    getFileById,
    addFile,
    addCode,
    getFilesBySubjectId,
    getFilesByUserId,
    addViewLog
}

export default methods;