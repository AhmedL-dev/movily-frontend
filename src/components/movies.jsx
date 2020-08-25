import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";

import MoviesTable from "./moviesTable";
import { paginate } from "../utils/paginate";

import Pagination from "../common/pagination";
import ListGroup from "../common/listGroup";
import SearchBox from "../common/searchBox";

import { getGenres } from "../services/genreService";
import { getMovies, deleteMovie } from "../services/movieService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 0,
    pageSize: 4,
    selectedGenre: { _id: 0, name: "All Genres" },
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  constructor(props) {
    super(props);
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    const genres = [{ _id: 0, name: "All Genres" }, ...(await getGenres())];

    const movies = this._isMounted && (await getMovies());
    if (this._isMounted)
      this.setState({
        movies: movies,
        genres: genres,
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleDelete = async (id) => {
    const origineMovies = this.state.movies;
    const movies = origineMovies.filter((m) => m._id !== id);

    this.setState({ movies });
    try {
      await deleteMovie(id);
    } catch (ex) {
      this.setState({ movies: origineMovies });
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const movieInDb = movies.find((m) => m === movie);
    movieInDb.liked = movie.liked === false;
    this.setState(movies);
  };

  handlePageChange = (p) => {
    this.setState({ currentPage: p });
  };

  handleGenresSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 0, searchQuery: "" });
  };

  handleSorte = (sortColumn) => {
    this.setState(sortColumn);
  };

  handleSearch = (query) => {
    this.setState({
      selectedGenre: { _id: 0, name: "All Genres" },
      currentPage: 0,
      searchQuery: query,
    });
  };

  render() {
    let {
      selectedGenre,
      pageSize,
      currentPage,
      movies: allMovies,
      sortColumn,
      searchQuery,
    } = this.state;

    const { user } = this.props;

    let movies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    movies = _.orderBy(
      movies,
      [
        sortColumn.path && isNaN(_.get(movies[0], sortColumn.path))
          ? (movies) => _.get(movies, sortColumn.path).toLowerCase()
          : sortColumn.path,
      ],
      [sortColumn.order]
    );

    const { length: count } = movies;

    movies = paginate(movies, currentPage, pageSize);

    if (searchQuery)
      movies = movies.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return (
      <main className="container">
        <div className=" row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenresSelect}
            />
          </div>
          <div className="col">
            {user && (
              <Link
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
                to="/movies/new"
              >
                New Movie
              </Link>
            )}
            <div>Showing {count} movies in the database</div>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />

            {count === 0 ? (
              <div>No movie in the database</div>
            ) : (
              <div>
                <MoviesTable
                  onSort={this.handleSorte}
                  movies={movies}
                  onDelete={this.handleDelete}
                  onLike={this.handleLike}
                  sortColumn={sortColumn}
                  baseRoute="/movies"
                />
                <Pagination
                  onClick={this.handlePageChange}
                  currentPage={currentPage}
                  itemsCount={count}
                  pageSize={pageSize}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }
}

export default Movies;
