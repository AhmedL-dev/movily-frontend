import http from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

http.setJwt(getJwt());

const login = async (email, password) => {
  const { data: jwt } = await http.post(config.authEndpoint, {
    email,
    password,
  });
  localStorage.setItem(tokenKey, jwt);
};

const loginWithJwt = (jwt) => {
  localStorage.setItem(tokenKey, jwt);
};

const logout = () => {
  localStorage.removeItem(tokenKey);
};

const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {}
};

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};
