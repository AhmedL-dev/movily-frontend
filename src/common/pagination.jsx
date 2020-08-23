import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, currentPage, onClick }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(0, pagesCount);

  return (
    <nav aria-label="...">
      <ul className="pagination">
        {pages.map((p) => (
          <li
            key={p}
            className={`page-item ${p === currentPage ? "active" : ""}`}
          >
            <a onClick={() => onClick(p)} className="page-link">
              {p + 1}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Pagination;
