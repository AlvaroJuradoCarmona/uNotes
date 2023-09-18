import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/comment`;

const addComment = (commentData) => {
    const request = axios.post(`${baseUrl}/`, commentData);
    return request.then(response => response.data).catch(error => error.response.data);
}

const   methods = {
    addComment
}

export default methods;