import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import ReduxDemoRedux from "./redux-demo-react";

const StoreWrapper = () => {
  return (
    <Provider store={store}>
      <ReduxDemoRedux />
    </Provider>
  );
};

export default StoreWrapper;
