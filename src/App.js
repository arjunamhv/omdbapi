import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [movieDetail, setMovieDetail] = useState({});
  const [isMutating, setIsMutating] = useState(false);

  const searchMovies = async () => {
    setIsMutating(true);
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${searchTerm}&apikey=b5e97c31&page=${currentPage}`
      );
      if (response.data.Search) {
        setMovies(response.data.Search);
        setErrorMessage("");
      } else {
        setMovies([]);
        setErrorMessage(response.data.Error);
      }
    } catch (error) {
      console.error("Error searching for movies:", error);
      setErrorMessage("An error occurred while searching for movies.");
    }
    setIsMutating(false);
  };

  useEffect(() => {
    if (searchTerm) {
      searchMovies();
    }
  }, [currentPage]);

  const handleSearchClick = () => {
    setCurrentPage(1);
    searchMovies();
  };

  const searchDetailMovie = async (imdbID) => {
    setIsMutating(true);
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?i=${imdbID}&apikey=b5e97c31`
      );
      setMovieDetail(response.data);
    } catch (error) {
      console.error("Error searching for movie details:", error);
      setErrorMessage("An error occurred while searching for movie details.");
    }
    setIsMutating(false);
  };
  return (
    <section className="p-5">
      <div className="bg-secondary p-4 mb-4 rounded-1">
        <h1 className="text-center mb-4">Movie Search</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control bg-light"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter movie title"
            aria-label="Movie title"
            aria-describedby="button-search"
          />
          <button
            className="btn btn-dark"
            type="button"
            id="button-search"
            onClick={handleSearchClick}
          >
            Search
          </button>
        </div>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
      </div>
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="col-md-3">
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
        ))}
      </div>

      {movies.length > 0 && (
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1 || isMutating}
          >
            {isMutating && currentPage === 1 ? "Loading..." : "Previous"}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={isMutating}
          >
            {isMutating ? "Loading..." : "Next"}
          </button>
        </div>
      )}
      <div
        className="modal fade"
        id="DetailMovieModal"
        tabIndex={-1}
        aria-labelledby="DetailMovieModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="DetailMovieModalLabel">
                {movieDetail.Title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-4">
                  <img
                    src={movieDetail.Poster}
                    className="img-fluid"
                    alt={movieDetail.Title}
                  />
                </div>
                <div className="col-8">
                  <p>
                    <strong>Director:</strong> {movieDetail.Director}
                  </p>
                  <p>
                    <strong>Writer:</strong> {movieDetail.Writer}
                  </p>
                  <p>
                    <strong>Actors:</strong> {movieDetail.Actors}
                  </p>
                  <p>
                    <strong>Genre:</strong> {movieDetail.Genre}
                  </p>
                  <p>
                    <strong>Plot:</strong> {movieDetail.Plot}
                  </p>
                  <p>
                    <strong>Rating:</strong> {movieDetail.imdbRating}/10 (IMDb)
                  </p>
                  <p>
                    <strong>Awards:</strong> {movieDetail.Awards}
                  </p>
                  <p>
                    <strong>Box Office:</strong> {movieDetail.BoxOffice}
                  </p>
                  <p>
                    <strong>Runtime:</strong> {movieDetail.Runtime}
                  </p>
                  <p>
                    <strong>Language:</strong> {movieDetail.Language}
                  </p>
                  <p>
                    <strong>Country:</strong> {movieDetail.Country}
                  </p>
                  <p>
                    <strong>Released:</strong> {movieDetail.Released}
                  </p>
                  <p>
                    <strong>DVD:</strong> {movieDetail.DVD}
                  </p>
                  <p>
                    <strong>Metascore:</strong> {movieDetail.Metascore}
                  </p>
                  {movieDetail && movieDetail.Ratings && (
                    <p>
                      <strong>Ratings:</strong>
                      {movieDetail.Ratings.map((rating, index) => (
                        <li key={index}>
                          {rating.Source} ({rating.Value}),{" "}
                        </li>
                      ))}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
