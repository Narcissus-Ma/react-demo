import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import StoreWrapper from "./pages/redux/storeWrapper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TodoList from "./pages/todoList/TodoList";
import FormDemo from "./pages/form-hooks";
import StyledComponent from "./pages/styled-component/index";
import EchartsDemo from "./pages/echarts/index";
import WidgetsTest from "./pages/widgets/WidgetsTest";
import Ruler from "./pages/ruler/ruler-version3";
import NavMenu from "./pages/menu/menu";
import Home from "./pages/home/Home";
import DndDemo from "./pages/dnd/dndDemo/dndDemo";
import HooksDemo from "./pages/hooks/HooksDemo";
import UseContextDemo from "./pages/hooks/useContext/Father";
import UseReducerDemo from "./pages/hooks/useReducer/useReducer";
import { CustomReduxDemo } from "./pages/custom-redux/CustomReduxDemo";
import Test from "./pages/demo/test";

const Header = () => <h1 className="mainHeader">React面试学习笔记</h1>;
const ContentBox = () => (
  <div className="contentBox">
    <NavMenu />
    <div className="mainContent">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/redux" element={<StoreWrapper />}></Route>
        <Route path="/todoList" element={<TodoList />}></Route>
        <Route path="/form-hooks" element={<FormDemo />}></Route>
        <Route path="/styled-component" element={<StyledComponent />}></Route>
        <Route path="/echarts" element={<EchartsDemo />}></Route>
        <Route path="/widgets" element={<WidgetsTest />}></Route>
        <Route path="/ruler" element={<Ruler />}></Route>
        <Route
          path="/dnd"
          element={
            <DndProvider backend={HTML5Backend}>
              <DndDemo />
            </DndProvider>
          }
        ></Route>
        <Route path="/hooks" element={<HooksDemo />}></Route>
        <Route path="/useContext" element={<UseContextDemo />}></Route>
        <Route path="/useReducer" element={<UseReducerDemo />}></Route>
        <Route path="/custom-redux" element={<CustomReduxDemo />}></Route>
        <Route path="/demo" element={<Test />}></Route>
      </Routes>
    </div>
  </div>
);

const App = () => {
  return (
    <div className="mainBox">
      <Header />
      <ContentBox />
    </div>
  );
};

export default App;
