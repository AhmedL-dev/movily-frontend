import http from "./httpService";
import config from "../config.json";

const getGenres = async () => {
  return (await http.get(config.genreEndpoint)).data;
};

export { getGenres };
