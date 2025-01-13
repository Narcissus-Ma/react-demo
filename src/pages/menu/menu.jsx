import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("React项目介绍", "sub1", <MailOutlined />, [getItem("主页", "/")]),
  getItem("Redux的使用", "sub2", <MailOutlined />, [
    getItem("引入redux", "/redux"),
  ]),
  getItem("TodoList", "sub3", <AppstoreOutlined />, [
    getItem("待办事项", "/todoList"),
  ]),
  getItem("表单", "sub4", <AppstoreOutlined />, [
    getItem("表单分割", "/form-hooks"),
  ]),
  getItem("StyledComponent", "sub5", <AppstoreOutlined />, [
    getItem("css-in-js", "/styled-component"),
  ]),
  getItem("Echarts", "sub6", <AppstoreOutlined />, [
    getItem("echarts表格的使用", "/echarts"),
  ]),
  getItem("3d渲染", "sub7", <AppstoreOutlined />, [
    getItem("three.js", "/widgets"),
  ]),
  getItem("标尺辅助线", "sub8", <AppstoreOutlined />, [
    getItem("标尺辅助线的实现", "/ruler"),
  ]),
  getItem("DND组件", "sub9", <AppstoreOutlined />, [
    getItem("基本使用", "/dnd"),
  ]),
  getItem("Hooks使用", "sub10", <AppstoreOutlined />, [
    getItem("基本使用", "/hooks"),
    getItem("useContext", "/useContext"),
    getItem("useReducer", "/useReducer"),
  ]),
  getItem("Redux原理", "sub11", <AppstoreOutlined />, [
    getItem("手写简版redux", "/custom-redux"),
  ]),
  getItem("测试React代码", "sub12", <AppstoreOutlined />, [
    getItem("测试react代码", "/demo"),
  ]),
  //   {
  //     type: "divider",
  //   },
  //   getItem("Navigation Three", "sub4", <SettingOutlined />, [
  //     getItem("Option 9", "9"),
  //     getItem("Option 10", "10"),
  //     getItem("Option 11", "11"),
  //     getItem("Option 12", "12"),
  //   ]),
  //   getItem(
  //     "Group",
  //     "grp",
  //     null,
  //     [getItem("Option 13", "13"), getItem("Option 14", "14")],
  //     "group"
  //   ),
];
const NavMenu = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    // console.log("click ", e);
    navigate(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};
export default NavMenu;
