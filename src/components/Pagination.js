import React from "react";

const Pagination = ({ currentPage, setCurrentPage, isMutating }) => (
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
);

export default Pagination;
