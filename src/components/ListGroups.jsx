import React from "react";

const ListGroups = ({ items, selectedItem, onItemSelect }) => {
  return (
    <ul className="list-group">
      {items.map(g => (
        <li
          key={g._id}
          className={
            g === selectedItem ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemSelect(g)}
        >
          {g.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroups;
