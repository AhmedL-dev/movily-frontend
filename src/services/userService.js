import http from "./httpService";
import config from "../config.json";

const register = async (user) => {
  return http.post(config.userEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
};

export { register };
