import React, { useState } from "react";
import { Input, Button, Checkbox } from "antd";

const TodoList = () => {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);

  // 添加todo项
  const handleChange = (e) => {
    if (e.target.value) {
      list.push({ value: e.target.value, checked: false });
      // setList([...list, { value: e.target.value, checked: false }]);
      setList([...list]);
      setValue("");
    }
    setValue("");
  };

  // 清空todo列表
  const handleClear = () => {
    setList([]);
  };

  // 删除todo项
  const handleDelete = (index) => {
    list.splice(index, 1);
    setList([...list]);
  };

  // 修改todo项
  const handleItemChange = (value, index) => {
    list[index] = { ...list[index], value };
    setList([...list]);
  };

  // checked
  const handleCheckedChange = (value, index) => {
    list[index] = { ...list[index], checked: value };
    setList([...list]);
  };

  // 查询todo项
  const handleQuery = () => {
    const item = list.find((i) => i.value === value);
    setResult(item);
  };

  // todo项渲染
  const renderItem = (v, i) => {
    return (
      <div key={i}>
        <span>
          <Checkbox
            value={v.checked}
            onChange={(e) => handleCheckedChange(e.target.checked, i)}
          >
            <Input
              value={v.value}
              onChange={(e) => handleItemChange(e.target.value, i)}
            />
          </Checkbox>
        </span>{" "}
        <Button type="text" onClick={() => handleDelete(i)}>
          删除
        </Button>
      </div>
    );
  };

  return (
    <div>
      <Input
        style={{ width: 200 }}
        value={value}
        onChange={(e) => setValue(e.target.value.trim())}
        onPressEnter={(e) => handleChange(e)}
        placeholder="请输入"
      />
      <Button onClick={handleQuery}>查询</Button>
      <Button onClick={handleClear}>清空</Button>
      {result
        ? renderItem(result, result.index)
        : !result && (
            <div>
              {list.length ? list.map((v, i) => renderItem(v, i)) : null}
            </div>
          )}
    </div>
  );
};

export default TodoList;
