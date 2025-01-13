import React from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const HooksDemo = () => {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div>
      <h1>hooks相关面试题</h1>
      <Collapse defaultActiveKey={["1"]} onChange={onChange}>
        <Panel header="useEffect 跟 useLayoutEffect的区别？" key="1">
          <p>
            useEffect： 组件更新挂载完成 =》浏览器dom 绘制完成
            =》执行useEffect回调 ；
          </p>
          <p>
            useLayoutEffect ： 组件更新挂载完成 =》 执行useLayoutEffect回调 =》
            浏览器dom 绘制完成；
          </p>
          <p>直观区别：useEffect 闪动； useLayoutEffect 卡顿</p>
        </Panel>
        <Panel header="Context 有什么缺点，怎么改进？" key="2">
          <p>
            Context 因为是整个大对象，只要数据变更，以下所有内容有可能会需要
            rerender。
          </p>
          <p>1. 细化 context value，拆分，PageContext、WorkSpaceContext</p>
          <p>
            2. 通过定义 xxxProvider，将数据更新局限在 children 层，不再是
            PageContext.Provider，而是 PageProvider
          </p>
        </Panel>
        <Panel header="This is panel header 3" key="3">
          <p>{text}</p>
        </Panel>
      </Collapse>
    </div>
  );
};

export default HooksDemo;
