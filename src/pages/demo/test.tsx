import React, { useState } from "react";

function Child() {
  console.log("child render");
  return <span>child</span>;
}

function Test() {
  const [num, updateNum] = useState(0);
  console.log("App render", num);
  return (
    <div onClick={() => updateNum(1)}>
      <Child />
    </div>
  );
}

export default Test;
