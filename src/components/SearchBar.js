import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm, handleSearchClick, errorMessage }) => (
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
);

export default SearchBar;
