// reducer文件
import { INCREMENT, DECREMENT, INCREMENTIFODD, INCREMENTASYNC } from "./const";
import initState from "./state.js";

export function countReducer(state = initState, action) {
  const { type, data } = action;

  switch (type) {
    case INCREMENT:
      return { value: state.value + data };
    case DECREMENT:
      return { value: state.value - data };
    case INCREMENTIFODD:
      if (state.value % 2 !== 0) return { value: state.value + data };
      return state;
    case INCREMENTASYNC:
      return 0;
    default:
      return state;
  }
}
