import React, { FC, useEffect, useState } from "react";
import "./masonryToDo.scss";
import ItemToDo from "../ItemToDo/ItemToDo";
import NewToDoForm from "../NewToDoForm/NewToDoForm";

export interface MasonryItemProps {
  id: number;
  title: string;
  createdAt: string;
  content: string;
}
export interface MasonryToDoProps {
  initial?: MasonryItemProps[];
  brandColor?: string;
  onListChange?: (updatedList: MasonryItemProps[]) => void;
  onItemClick?: (item:MasonryItemProps) => void;
}
export interface ItemToDoProps {
  item: MasonryItemProps;
  onItemClick?: (item:MasonryItemProps) => void;
  onDeleteItem: (id: number) => void;
}
export interface NewToDoFormProps {
  onAddItem: (newItem: Partial<MasonryItemProps>) => void;
}
export interface RawHTMLProps {
  dirtyHTML: string;
}
const MasonryToDo: FC<MasonryToDoProps> = ({
  initial,
  onListChange,
  brandColor = "#175ef7",
  onItemClick,
}) => {
  const [list, setList] = useState(initial);

  useEffect(() => {
    // Вызываем onListChange при каждом изменении списка
    if (onListChange) {
      onListChange(list ?? []);
    }
  }, [list, onListChange]);
  useEffect(() => {
    const rootStyle = document?.querySelector(":root") as HTMLElement | null;
    if (rootStyle) {
      rootStyle.style.setProperty("--clr-primary", brandColor);
    }
  }, [brandColor]);
  const handleAddItem = (newItem: Partial<MasonryItemProps>) => {
    setList((prevList) => [...(prevList ?? []), newItem as MasonryItemProps]);
  };
  return (
    <div className="wrapper">
      <NewToDoForm onAddItem={handleAddItem} />
      <div className="container">
        {list
          ? list?.map((item) => {
              return (
                <ItemToDo
                  key={item.createdAt + item.title}
                  item={item}
                  onDeleteItem={(id) =>
                    setList((p) => p?.filter((el) => el.id !== id))
                  }
                  onItemClick={onItemClick}
                />
              );
            })
          : "Нет ни одной заметки"}
      </div>
    </div>
  );
};

export default MasonryToDo;
