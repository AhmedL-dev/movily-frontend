import http from "./httpService";
import config from "../config.json";

const getMovies = async () => {
  return (await http.get(config.movieEndpoint)).data;
};

const getMovie = async (id) => {
  return (await http.get(config.movieEndpoint + "/" + id)).data;
};

const deleteMovie = async (id) => {
  return (await http.delete(config.movieEndpoint + "/" + id)).data;
};

const saveMovie = async (movie) => {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return (await http.put(config.movieEndpoint + "/" + movie._id, body)).data;
  }
  return (await http.post(config.movieEndpoint, movie)).data;
};

export { getMovies, getMovie, deleteMovie, saveMovie };
