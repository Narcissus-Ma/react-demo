import "./dnd.css";
import React from "react";
import Box from "./Box";
import Container from "./Container";
import DragLayer from "./DragLayer";

function DndDemo() {
  return (
    <div>
      <Container></Container>
      <Box color={"blue"}></Box>
      <Box color={"red"}></Box>
      <Box color={"green"}></Box>
      <DragLayer></DragLayer>
    </div>
  );
}

export default DndDemo;
