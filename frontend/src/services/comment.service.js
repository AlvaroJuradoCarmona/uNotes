import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/comment`;

const getCommentById = async (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

const addComment = (commentData) => {
    const request = axios.post(`${baseUrl}/`, commentData);
    return request.then(response => response.data).catch(error => error.response.data);
}

const deleteComment = async (idComment) => {
    const request = axios.delete(`${baseUrl}/delcomment/${idComment}`)
    return request.then(response => response.data)
}

const   methods = {
    getCommentById,
    addComment,
    deleteComment
}

export default methods;