import { useEffect, useState } from "react";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import Item from "../item/Item";
import { BsImage } from "react-icons/bs";

const Items = () => {
  const [allItems, setAllItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 2 },
    })
  );

  useEffect(() => {
    fetch("/items.json")
      .then((resp) => resp.json())
      .then((data) => setAllItems(data));
  }, []);

  const onDragEnd = (event) => {
    const { active, over } = event;
    // console.log(active, over);
    if (active.id === over.id) {
      return;
    }
    setAllItems((items) => {
      const oldId = items.findIndex((item) => item.id === active.id);
      const newId = items.findIndex((user) => user.id === over.id);
      return arrayMove(allItems, oldId, newId);
    });
  };
  const addSelectedItems = (itemId) => {
    if (selectedItems.includes(itemId)) {
      const newIdsArr = selectedItems.filter((id) => id !== itemId);
      setSelectedItems(newIdsArr);
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const deleteSelectedItems = () => {
    const updatedItems = allItems.filter(
      (item) => !selectedItems.includes(item.id)
    );
    setAllItems(updatedItems);
    setSelectedItems([]);
  };

  return (
    <div className="max-w-4xl mx-auto border rounded-md shadow-md">
      <div className="border-b border-gray-400 px-6 py-4">
        <div>
          {selectedItems.length > 0 ? (
            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  defaultChecked
                  onClick={() => setSelectedItems([])}
                />
                <p className="font-semibold">
                  {selectedItems.length} File
                  {selectedItems.length === 1 ? "" : "s"} Selected
                </p>
              </div>
              <div>
                <button
                  className="text-red-600 font-semibold hover:text-red-700"
                  onClick={deleteSelectedItems}
                >
                  Delete Files
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-lg font-bold">Gallery</p>
            </div>
          )}
        </div>
      </div>
      <div className="p-6">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
          sensors={sensors}
        >
          <SortableContext items={allItems} strategy={rectSortingStrategy}>
            <div className="grid md:grid-cols-5 gap-5">
              {allItems?.map((item, index) => (
                <Item
                  key={item.id}
                  item={item}
                  feature={index === 0 ? true : false}
                  selected={
                    selectedItems.find(
                      (selectedItem) => selectedItem === item.id
                    )
                      ? true
                      : false
                  }
                  addSelectedItems={addSelectedItems}
                />
              ))}
              <div
                className={`rounded-lg border border-dashed border-gray-400 cursor-pointer flex flex-col gap-4 justify-center items-center text-gray-900 bg-gray-100 p-2`}
              >
                <BsImage className="w-5 h-5"></BsImage>
                <p className="text-sm">Add Images</p>
              </div>
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default Items;
