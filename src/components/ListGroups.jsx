import React, { Component } from "react";

const ListGroups = props => {
  return (
    <ul className="list-group">
      {props.items.map(g => (
        <li  key={g._id}
          className={
            g === props.selectedItem ? "list-group-item active" : "list-group-item"
          }
         
          onClick={() => props.onItemSelect(g)}
        >
          {g.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroups;
