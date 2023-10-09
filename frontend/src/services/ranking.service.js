import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/ranking`;

const getExperienceRanking = async (idUser) => {
    const request = axios.get(`${baseUrl}/exp/${idUser}`);
    return request.then(response => response.data);
}

const getPointsRanking = async (idUser) => {
    const request = axios.get(`${baseUrl}/pts/${idUser}`);
    return request.then(response => response.data);
}

const getExperienceSum = async () => {
    const request = axios.get(`${baseUrl}/expsum`);
    return request.then(response => response.data);
}

const getPointsSum = async () => {
    const request = axios.get(`${baseUrl}/ptssum`);
    return request.then(response => response.data);
}

const methods = {
    getExperienceRanking,
    getPointsRanking,
    getExperienceSum,
    getPointsSum
}

export default methods;