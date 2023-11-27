import React, { FC } from "react";
import { ItemToDoProps } from "../MasonryToDo/MasonryToDo";
import "./ItemToDo.scss";
import RawHTML from "../RawHTML/RawHTML";

const ItemToDo: FC<ItemToDoProps> = ({ item, onDeleteItem, onItemClick }) => {
  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const targetElement = e.target as HTMLElement;
    if (!targetElement.classList.contains("close-btn")) {
      onItemClick?.(item);
    }
  };
  const handleItemKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      onItemClick?.(item);
    }
  };
  const handleCloseKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onDeleteItem(item.id);
    }
  };
  return (
    <div
      className="content flow"
      onClick={handleItemClick}
      onKeyDown={handleItemKeyPress}
    >
      <span
        className="close-btn close"
        onKeyDown={handleCloseKeyPress}
        tabIndex={1}
        onClick={(e) => {
          e.preventDefault();
          onDeleteItem(item.id);
        }}
      >
        &times;
      </span>
      <h1 className="title">{item.title}</h1>
      <RawHTML dirtyHTML={item.content} />
      <span className="createdAt">{item.createdAt}</span>
    </div>
  );
};

export default ItemToDo;
