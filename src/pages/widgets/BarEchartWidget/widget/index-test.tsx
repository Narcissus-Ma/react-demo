/*
 * @Author: Narcissus 577008637@qq.com
 * @Date: 2022-10-13 16:31:59
 * @LastEditors: Narcissus 577008637@qq.com
 * @LastEditTime: 2022-10-13 17:16:32
 * @FilePath: \react-demo\src\pages\widgets\BarEchartWidget\widget\index-test.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import BarEchartWidget from "../component/index";

const BarChartOption = {
  title: {
    text: '主标题',
    subtext: '副标题',
  },
  xAxis: {
    type: "category",
    data: ["Search Engine", "Direct", "Email", "Union Ads", "Video Ads"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [
        {
          value: 120,
          itemStyle: {
            color: "#5470C6",
          },
        },
        {
          value: 200,
          itemStyle: {
            color: "#91CC75",
          },
        },
        {
          value: 150,
          itemStyle: {
            color: "#FAC858",
          },
        },
        {
          value: 80,
          itemStyle: {
            color: "#EE6666",
          },
        },
        {
          value: 70,
          itemStyle: {
            color: "#73C0DE",
          },
        },
      ],
      type: "bar",
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
      },
    },
  ],
};

const Widget = () => {
  return (
    <div>
      <BarEchartWidget BarChartOption={BarChartOption} />
    </div>
  );
};

export default Widget;
