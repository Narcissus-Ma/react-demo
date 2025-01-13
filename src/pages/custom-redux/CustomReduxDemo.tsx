import React, { useSyncExternalStore } from "react";
import { createStore, combineReducer, applyMiddleware } from "./redux";

const personReducer = (state = { name: "heyi", age: 0 }, action: any) => {
  switch (action.type) {
    case "incremented_age": {
      return {
        ...state,
        age: state.age + 1,
      };
    }
  }
};

const PageReducer = (state = { title: "home" }, action: any) => {
  switch (action.type) {
    case "change_title": {
      return {
        ...state,
        title: action.payload,
      };
    }
  }
};

const store = createStore(
  combineReducer({ page: PageReducer, person: personReducer }),
  applyMiddleware(
    (store) => (next) => (action) => {
      console.log("🚀 ~ file: index.tsx:41 ~ action", action, store.getState());
      next(action);
    },
    (store) => (next) => (action) => {
      console.log("🚀 ~ file: index.tsx:34 ~ thunk ~ action:", "thunk", action);

      next(action);
    }
  )
);

store.dispatch({ type: "incremented_age" });

export const CustomReduxDemo = () => {
  // 当下 外部状态跟 react 状态对接，非常简单，一个 api
  // useSyncExternalStore
  const state = useSyncExternalStore(store.subscribe, store.getState);

  return (
    <div onClick={() => store.dispatch({ type: "incremented_age" })}>
      he redux demo
      {state.person.age}
    </div>
  );
};
