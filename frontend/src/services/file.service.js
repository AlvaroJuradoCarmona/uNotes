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

const addViewLog = async (fileData) => {
    const request = axios.post(`${baseUrl}/view`, fileData);
    return request.then(response => response.data).catch(error => error.response.data);
}

const getViewsByWeekDayByUser = async (idUser) => {
    const request = axios.get(`${baseUrl}/weekviewsbyuser/${idUser}`);
    return request.then(response => response.data);
}

const getViewsByWeekDay = async () => {
    const request = axios.get(`${baseUrl}/weekviews`);
    return request.then(response => response.data);
}

const deleteFile = async (idDocument) => {
    const request = axios.delete(`${baseUrl}/${idDocument}`)
    return request.then(response => response.data)
}

const addReport = async (fileData) => {
    const request = axios.post(`${baseUrl}/report`, fileData);
    return request.then(response => response.data).catch(error => error.response.data);
}

const deleteReport = async (idReport) => {
    const request = axios.delete(`${baseUrl}/${idReport}`)
    return request.then(response => response.data)
}

const getReports = async () => {
    const request = axios.get(`${baseUrl}/getReports`);
    return request.then(response => response.data);
}

const getFileCountLastWeek = async () => {
    const request = axios.get(`${baseUrl}/getFileCountLastWeek`);
    return request.then(response => response.data);
}

const getReportCountLastWeek = async () => {
    const request = axios.get(`${baseUrl}/getReportCountLastWeek`);
    return request.then(response => response.data);
}

const getFileCountByCategory = async () => {
    const request = axios.get(`${baseUrl}/getFileCountByCategory`);
    return request.then(response => response.data);
}

const   methods = {
    getFiles,
    getFileById,
    addFile,
    addCode,
    getFilesBySubjectId,
    getFilesByUserId,
    addViewLog,
    getViewsByWeekDayByUser,
    getViewsByWeekDay,
    deleteFile,
    addReport,
    deleteReport,
    getReports,
    getFileCountLastWeek,
    getReportCountLastWeek,
    getFileCountByCategory
}

export default methods;