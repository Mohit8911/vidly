import React from "react";

const ListGroup = ({items,onItemSelect,currItem,textProperty,valueProperty}) => {
  
  if(items.length===0) return null;

  return (
    <ul className="list-group">
      {items.map(item =>(
      <li className={currItem.name===item.name ? "list-group-item active" :"list-group-item"} key={item[valueProperty]} onClick={()=>onItemSelect(item)}>{item[textProperty]}</li>
    ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
}

export default ListGroup;
