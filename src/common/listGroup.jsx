import React from "react";

const ListGroup = (props) => {
  const {
    items,
    selectedItem,
    textProperty,
    valueProperty,
    onItemSelect,
  } = props;
  return (
    <div className="list-group">
      {items.map((item) => (
        <a
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          className={`clickable list-group-item list-group-item-action ${
            selectedItem[valueProperty] === item[valueProperty] ? "active" : ""
          }`}
        >
          {item[textProperty]}
        </a>
      ))}
    </div>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
