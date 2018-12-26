import React, { Component } from "react";

const ListGroups = props => {
  return (
    <ul className="list-group">
      {props.items.map(g => (
        <li
          className={
            g === props.selectedItem ? "list-group-item active" : "list-group-item"
          }
          key={g._id}
          onClick={() => props.onItemSelect(g)}
        >
          {g.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroups;
