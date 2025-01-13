import React from "react";
import { useDragLayer } from "react-dnd";
import "./dnd.css";
const DragLayer = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging) {
    return null;
  }
  return (
    <div
      className="drag-layer"
      style={{
        left: currentOffset?.x,
        top: currentOffset?.y,
      }}
    >
      {item.color} 拖拖拖
    </div>
  );
};
export default DragLayer;
