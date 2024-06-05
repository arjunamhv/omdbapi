import React from "react";

const MovieDetailModal = ({ movieDetail }) => (
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
                <div>
                  <strong>Ratings:</strong>
                  <ul>
                    {movieDetail.Ratings.map((rating, index) => (
                      <li key={index}>
                        {rating.Source}: {rating.Value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MovieDetailModal;
