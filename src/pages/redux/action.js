import { INCREMENT, DECREMENT, INCREMENTIFODD } from "./const";

export const createIncrementAction = (value) => ({
  type: INCREMENT,
  data: value,
});

export const createDecrementAction = (value) => ({
  type: DECREMENT,
  data: value,
});

export const createIncrementIfoddAction = (value) => ({
  type: INCREMENTIFODD,
  data: value,
});

// 异步action, 指的是action的值为函数， 只有函数类型可以开启异步任务
export const createIncrementAsyncAction = (value, time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(createIncrementAction(value));
    }, time);
  };
};
