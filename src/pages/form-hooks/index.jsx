/**
 * useRef 与表单的拆分
 */

import React, { useRef } from "react";
import BaseInfo from "./modules/BaseInfo";
import Detail from "./modules/Detail";
import Other from "./modules/Other";
import Rules from "./modules/Rules";
import { Button } from "antd";

const FormDemo = () => {
  const baseInfoRef = useRef(null);
  const handleSave = () => {
    console.log("==baseInfoRef==", baseInfoRef.current.handleSave());
  };
  return (
    <div>
      <BaseInfo selfRef={baseInfoRef} />
      <Detail />
      <Other />
      <Rules />
      <Button onClick={handleSave}>提交</Button>
    </div>
  );
};

export default FormDemo;
