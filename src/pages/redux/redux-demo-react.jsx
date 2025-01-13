import React, { useState, useRef, useEffect } from "react";
import { Select, Button } from "antd";

// import { useSelector, useDispatch, connect } from "react-redux";
import { connect } from "react-redux";

import {
  createDecrementAction,
  createIncrementAction,
  createIncrementIfoddAction,
  createIncrementAsyncAction,
} from "./action";

const ReduxDemoReact = (props) => {
  const [value, setValue] = useState(1);
  const [total, setTotal] = useState(0);

  /**
   * 函数组件用到redux，需要引入三个概念 react-redux库，useSelector更新状态，useDispatch两个hooks
   */
  // 方式一 使用hooks
  // const count = useSelector((state) => state.value);
  // const dispatch = useDispatch();
  // 方式二 ui逻辑分离，props
  const { count, jia, jian, oddJia, asyncJia } = props;

  let timer = useRef(null);

  const handleSelectChange = (v) => {
    setValue(v);
  };

  //#region
  const increment = () => {
    setTotal(total + value);
  };

  const decrement = () => {
    setTotal(total - value);
  };

  const incrementifodd = () => {
    if (total % 2 !== 0) {
      setTotal(total + value);
    }
  };

  const incrementasync = () => {
    timer.current = setTimeout(() => {
      setTotal(total + value);
    }, 2000);
  };

  useEffect(() => {
    return clearTimeout(timer.current);
  }, []);
  //#endregion

  return (
    <div>
      <div>
        <h1>不引入redux的写法</h1>
        <h1>{total}</h1>
        <Select
          style={{ width: 100 }}
          defaultValue={1}
          value={value}
          onChange={handleSelectChange}
        >
          <Select.Option value={1}>加1</Select.Option>
          <Select.Option value={2}>加2</Select.Option>
          <Select.Option value={3}>加3</Select.Option>
        </Select>
        <Button onClick={increment}>+</Button>
        <Button onClick={decrement}>-</Button>
        <Button onClick={incrementifodd}>increment if odd</Button>
        <Button onClick={incrementasync}>increment async</Button>
      </div>
      <br />
      <div>
        <h1>引入redux的写法</h1>
        <h1>{count}</h1>
        <Select
          style={{ width: 100 }}
          defaultValue={1}
          value={value}
          onChange={handleSelectChange}
        >
          <Select.Option value={1}>加1</Select.Option>
          <Select.Option value={2}>加2</Select.Option>
          <Select.Option value={3}>加3</Select.Option>
        </Select>
        {/* <Button onClick={() => dispatch(createIncrementAction(value))}>
          +
        </Button> */}
        <Button onClick={() => jia(value)}>+</Button>
        {/* <Button onClick={() => dispatch(createDecrementAction(value))}>
          -
        </Button> */}
        <Button onClick={() => jian(value)}>-</Button>
        {/* <Button onClick={() => dispatch(createIncrementIfoddAction(value))}>
          increment if odd
        </Button> */}
        <Button onClick={() => oddJia(value)}>increment if odd</Button>
        {/* <Button
          onClick={() => dispatch(createIncrementAsyncAction(value, 2000))}
        >
          increment async
        </Button> */}
        <Button onClick={() => asyncJia(value, 2000)}>increment async</Button>
      </div>
    </div>
  );
};

// export default ReduxDemoReact;

//#region  ui层与逻辑层分离
export default connect(
  (state) => {
    // mapStateToProps
    return {
      count: state.value,
    };
  },
  // (dispatch) => {
  //   // mapDispatchTtoProps
  //   return {
  //     jia: (number) => dispatch(createIncrementAction(number)),
  //     jian: (number) => dispatch(createDecrementAction(number)),
  //     oddJia: (number) => dispatch(createIncrementIfoddAction(number)),
  //     asyncJia: (number, time) =>
  //       dispatch(createIncrementAsyncAction(number, time)),
  //   };
  // }
  // dispatch 简写
  {
    jia: createIncrementAction,
    jian: createDecrementAction,
    oddJia: createIncrementIfoddAction,
    asyncJia: createIncrementAsyncAction,
  }
)(ReduxDemoReact);
//#endregion
