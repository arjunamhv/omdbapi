import React from "react";

const MovieCard = ({ movie, searchDetailMovie }) => (
  <div className="col-md-3">
    <div className="card h-100 bg-gray-500">
      <img
        src={movie.Poster}
        className="card-img-top"
        alt={movie.Title}
        style={{ height: "18rem", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{movie.Title}</h5>
        <p className="card-text">
          {movie.Year} - {movie.Type}
        </p>
        <div className="mt-auto d-flex justify-content-end align-items-end">
          <button
            className="btn btn-secondary"
            onClick={() => searchDetailMovie(movie.imdbID)}
            data-bs-toggle="modal"
            data-bs-target="#DetailMovieModal"
          >
            See Details
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default MovieCard;
