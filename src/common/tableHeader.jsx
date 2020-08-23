import React from "react";

const TableHeader = ({ sortColumn, onSort, columns }) => {
  const raiseSort = (path) => {
    const change = sortColumn.path !== path;
    const currentOrder = sortColumn.order;
    const order = change
      ? "asc"
      : ["asc", "desc"].find((o) => o !== currentOrder);

    path && onSort({ sortColumn: { path, order } });
  };

  const renderSortIcon = (c) => {
    if (c.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  return (
    <thead>
      <tr>
        {columns.map((c) => (
          <th
            className="clickable"
            key={c.path || c.key}
            onClick={() => raiseSort(c.path)}
          >
            {c.label} {renderSortIcon(c)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
