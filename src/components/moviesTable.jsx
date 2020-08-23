import React from "react";
import { Link } from "react-router-dom";
import Like from "../common/like";
import Table from "../common/table";
import auth from "../services/authService";

const MoviesTable = (props) => {
  const { movies, onDelete, onLike, onSort, sortColumn } = props;

  const DeleteButton = (movie) => (
    <button
      className="btn btn-danger btn-sm"
      onClick={() => onDelete(movie._id)}
    >
      Delete
    </button>
  );

  const LikeButton = (movie) => (
    <Like onLike={() => onLike(movie)} liked={movie.liked} />
  );

  const deleteColumn = {
    key: "delete",
    content: DeleteButton,
  };

  const columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: LikeButton,
    },
  ];

  const user = auth.getCurrentUser();
  if (user && user.isAdmin) columns.push(deleteColumn);

  return (
    <Table
      data={movies}
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default MoviesTable;
