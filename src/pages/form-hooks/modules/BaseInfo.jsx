import React, { useImperativeHandle, useState } from "react";
import { Form, Input } from "antd";

const BaseInfo = (props) => {
  const [values, setValues] = useState({});
  useImperativeHandle(props.selfRef, () => ({
    handleSave: () => {
      return values;
    },
  }));

  return (
    <Form onValuesChange={(val) => setValues(val)}>
      <Form.Item label="表单1" name="formInput1" required>
        <Input style={{ width: 426 }} placeholder="请输入" />
      </Form.Item>
    </Form>
  );
};

export default BaseInfo;
