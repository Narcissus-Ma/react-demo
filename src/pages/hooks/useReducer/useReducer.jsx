import React, { useReducer } from "react";
// import MyChildren from "./MyChildren";

// useState 本质上也是对useReducer的封装
// 业务中经常将 useReducer+useContext 代替Redux

const DemoUseReducer = () => {
  const [number, dispatchNumber] = useReducer((state, action) => {
    const { payload, name } = action;
    switch (name) {
      case "a":
        return state + 1;
      case "b":
        return state - 1;
      case "c":
        return payload;
      default:
        return state;
    }
  }, 0);
  return (
    <div>
      <h1>当前值{number}</h1>
      <button onClick={() => dispatchNumber({ name: "a" })}>增加</button>
      <button onClick={() => dispatchNumber({ name: "b" })}>减少</button>
      <button onClick={() => dispatchNumber({ name: "c", payload: 666 })}>
        赋值
      </button>
      {/* <MyChildren dispatch={dispatchNumber} State={{ number }} /> */}
    </div>
  );
};

export default DemoUseReducer;
