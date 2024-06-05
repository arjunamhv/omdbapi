import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import Pagination from "./components/Pagination";
import MovieDetailModal from "./components/MovieDetailModal";

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
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearchClick={handleSearchClick}
        errorMessage={errorMessage}
      />
      <MovieList movies={movies} searchDetailMovie={searchDetailMovie} />
      {movies.length > 0 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isMutating={isMutating}
        />
      )}
      <MovieDetailModal movieDetail={movieDetail} />
    </section>
  );
}

export default App;
