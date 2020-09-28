const axios = require("axios");

export function addUser(object) {
    return axios({
        url: 'http://localhost:8080/user/signup',
        method: 'post',
        data: {
            email: object.username,
            name: object.fName,
            lName: object.lName,
            password: object.password
        }
    });
}

export function login(object) {
    return axios({
        url: 'http://localhost:8080/user/login',
        method: 'post',
        data: {
            email: object.email,
            password: object.password
        }
    });
}

export function resetPassLink(email){
    return axios({
        url: `http://localhost:8080/user/forgetpassword?email=${email}`,
        method:'get',
    })
}

export function resetPassword(object){
    return axios({
        url: `http://localhost:8080/user/forgetpassword?token=${object.token}`,
        method:'post',
        data:{
            email:object.email,
            password: object.password
        }
    });
}