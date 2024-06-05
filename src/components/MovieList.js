import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, searchDetailMovie }) => (
  <div className="d-flex flex-wrap justify-content-center gap-4">
    {movies.map((movie) => (
      <MovieCard key={movie.imdbID} movie={movie} searchDetailMovie={searchDetailMovie} />
    ))}
  </div>
);

export default MovieList;
