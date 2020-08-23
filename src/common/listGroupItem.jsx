import React from "react";

const ListGroup = (props) => {
  const { item, active } = props;
  return (
    <a
      onClick={() => props.onItemSelect(item.name)}
      href="!#"
      className={`list-group-item list-group-item-action ${active}`}
    >
      {item.name}
    </a>
  );
};

export default ListGroup;
