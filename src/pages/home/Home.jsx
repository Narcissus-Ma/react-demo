import { Collapse } from "antd";
import React from "react";
const { Panel } = Collapse;

const Home = () => {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div>
      <h1>React常考面试题总结</h1>
      <Collapse defaultActiveKey={["1"]} onChange={onChange}>
        <Panel header="高阶组件" key="1">
          <h2>使用高阶组件的原因</h2>
          <p>1. 抽取重复代码，实现组件复用：相同功能组件复用</p>
          <p>2. 条件渲染，控制组件的渲染逻辑（渲染劫持）：权限控制。</p>
          <p>
            3.
            捕获/劫持被处理组件的生命周期，常见场景：组件渲染性能追踪、日志打点。
          </p>
          <h2>高阶组件的实现方式</h2>
          <p>属性代理</p>
          <p>反向继承</p>
        </Panel>
        <Panel header="Hooks VS HOC" key="2">
          <p>
            1.
            Hook最典型的就是取代掉生命周期中大多数的功能，可以把更相关的逻辑放在一起，而非零散在各个生命周期方法中；
          </p>
          <p>
            2. 高阶组件可以将外部的属性功能到一个基础 Component
            中，更多作为扩展能力的插件（如 react-swipeable-views中的 autoPlay
            高阶组件，通过注入状态化的 props
            的方式对组件进行功能扩展，而不是直接将代码写在主库中）；
          </p>
          <p>
            3. Hook 的写法可以让代码更加紧凑，更适合做 Controller
            或者需要内聚的相关逻辑，一般与目标组件内强依赖，HOC更强调对原先组件能力的扩展；
          </p>
          <p>
            4. 目前 Hook 还处于相对早期阶段（React 16.8.0 才正式发布Hook
            稳定版本），一些第三方的库可能还暂时无法兼容 Hook；
          </p>
        </Panel>
        <Panel header="异步组件" key="3">
          <p>React.lazy 和 React.Suspense</p>
          <p>ErrorBoundary </p>
        </Panel>
      </Collapse>
    </div>
  );
};
export default Home;
