import React, { useContext } from "react";
import { Context } from "./Father";

const Child1 = () => {
  const value = useContext(Context);
  return <div>{value.name}</div>;
};

export default Child1;
