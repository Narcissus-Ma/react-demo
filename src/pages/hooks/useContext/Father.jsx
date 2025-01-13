import React, { createContext } from "react";
import Child from "./Child";
import Child1 from "./Child1";

export const Context = createContext({
  name: "默认name",
});

const Father = () => {
  return (
    <div>
      <Context.Provider value={{ name: "aaa" }}>
        <Child />
        <Child1 />
      </Context.Provider>
    </div>
  );
};

export default Father;
