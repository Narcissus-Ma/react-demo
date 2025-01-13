import "./dnd.css";
import React, { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

interface BoxProps {
  color: string;
}
function Box(props: BoxProps) {
  const ref = useRef(null);

  const [{ dragging }, drag, dragPreview] = useDrag({
    type: "box",
    item: {
      color: props.color,
    },
    collect(monitor) {
      return {
        dragging: monitor.isDragging(),
      };
    },
  });

  useEffect(() => {
    drag(ref);
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, [drag, dragPreview]);

  return (
    <div
      ref={ref}
      className={dragging ? "box dragging" : "box"}
      style={{ background: props.color || "blue" }}
    ></div>
  );
}

export default Box;
