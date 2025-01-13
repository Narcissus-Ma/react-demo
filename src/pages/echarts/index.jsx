/*
 * @Author: Narcissus 577008637@qq.com
 * @Date: 2022-10-09 11:45:22
 * @LastEditors: Narcissus 577008637@qq.com
 * @LastEditTime: 2022-10-11 12:48:43
 * @FilePath: \react-demo\src\pages\echarts\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component } from "react";
import * as echarts from "echarts";
// import * as A from './exportTest';
export default class EchartsDemo extends Component {
  componentDidMount() {
    // console.log("===echarts===", echarts);
    let myCharts = echarts.init(document.getElementById("mycharts"));
    myCharts.setOption({
      title: {
        text: "主标题"
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
    });
  }
  render() {
    return (
      <div>
        <div id="mycharts" style={{ width: 600, height: 500 }}></div>
      </div>
    );
  }
}
