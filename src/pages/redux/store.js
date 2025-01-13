// 引入创建store 的api
import { createStore, applyMiddleware } from "redux";
// 引入reducer
import { countReducer } from "./reducer.js";
// 引入redux-thunk, 用于支持异步action
import thunk from "redux-thunk";
/**
 * todo 其它的中间件还有saga，这块比较复杂，待引入对比
 */
// 第二个参数，应用中间件
export default createStore(countReducer, applyMiddleware(thunk));
/**
 * 注： 多个reducers 需要合并
 * combineReducers({countReducer, ...})
 */
