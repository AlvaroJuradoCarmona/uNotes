const setToken = (token) => {
    console.log(token.token)
    window.localStorage.setItem("token", token)
}

const removeToken = () => {
    window.localStorage.removeItem("token")
}

const getToken = async () => {
    return window.localStorage.getItem("token")
}
 
const methods = {
    setToken,
    removeToken,
    getToken
}

export default methods