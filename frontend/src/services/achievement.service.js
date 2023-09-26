import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/achievement`;

const getAchievementsByUser = async (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

const getAchievementsCount = async () => {
    const request = axios.get(`${baseUrl}/`);
    return request.then(response => response.data);
}

const getAchievementsByUserCount = async (id) => {
    const request = axios.get(`${baseUrl}/count/${id}`);
    return request.then(response => response.data);
}

const methods = {
    getAchievementsByUser,
    getAchievementsCount,
    getAchievementsByUserCount
}

export default methods;