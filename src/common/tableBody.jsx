import React from "react";

import _ from "lodash";

const TableBody = ({ data, columns }) => {
  const renderCell = (item, c) => {
    return c.content ? c.content(item) : _.get(item, c.path);
  };

  const createKey = (item, c) => {
    return item._id + (c.path || c.key);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {columns.map((c) => (
            <td key={createKey(item, c)}>{renderCell(item, c)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
