/* eslint-disable react/prop-types */

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./item.css";

const Item = ({ item, feature, addSelectedItems, selected }) => {
  const { transform, transition, setNodeRef, attributes, listeners } =
    useSortable({ id: item.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      className={`mainContainer relative rounded-lg border border-gray-300 ${
        feature === true ? "col-span-2 row-span-2" : ""
      } ${selected ? "before:bg-white before:bg-opacity-50" : ""}`}
      style={style}
    >
      <input
        type="checkbox"
        className={`absolute left-2 top-2 z-10 ${
          selected ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => {
          addSelectedItems(item.id);
        }}
        onChange={() => {}}
        checked={selected ? true : false}
      />
      <div
        className="hover-div"
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      ></div>
      <img className="w-full rounded-lg z-10" src={item.image} alt="" />
    </div>
  );
};

export default Item;
