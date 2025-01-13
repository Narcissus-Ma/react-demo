import React from "react";
import { Context } from "./Father";

const Child = () => {
  return (
    <Context.Consumer>{(value) => <div>{value.name}</div>}</Context.Consumer>
  );
};

export default Child;
