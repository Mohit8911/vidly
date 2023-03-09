import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint ="/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
    const { data: jwt } = await http.post(apiEndpoint, { email, password });
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
    localStorage.setItem("token", jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
      const jwt = localStorage.getItem(tokenKey);
        const user = jwtDecode(jwt);
        console.log(user);
        return user;
    } catch (error) {
        return null;
    }
}

export function getJwt() {
    return localStorage.getItem(tokenKey);
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    login,
    loginWithJwt,
    logout,
    getCurrentUser,
    getJwt 
};