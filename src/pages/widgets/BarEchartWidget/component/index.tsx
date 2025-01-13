/*
 * @Author: Narcissus 577008637@qq.com
 * @Date: 2022-10-13 15:45:49
 * @LastEditors: Narcissus 577008637@qq.com
 * @LastEditTime: 2022-10-13 17:39:00
 * @FilePath: \react-demo\src\pages\widgets\BarEchartWidget\component\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import styled from "styled-components";

const ChartBox = styled.div`
  width: 800px;
  height: 500px;
`;

function BarEchartComponent(props: BarEchartComponentProps) {
  const { BarChartOption } = props;
  const barChartRef = useRef(null);
  useEffect(() => {
    if (barChartRef.current) {
      const myCharts = echarts.init(barChartRef.current);
      myCharts.setOption(BarChartOption);
    }
  }, [BarChartOption]);
  return (
    <div>
      <ChartBox ref={barChartRef}></ChartBox>
      {/* <div ref={barChartRef} style={{ width: 800, height: 500 }}></div> */}
    </div>
  );
}

export interface BarEchartComponentProps {
  BarChartOption: {
    xAxis: {
      type: string;
      data: String[];
    };
    yAxis: {
      type: string;
    };
    series: Array<{
      data: Array<{
        value: number;
        itemStyle: {
          color: string;
        };
      }>;
      type: string;
      showBackground: boolean;
      backgroundStyle: {
        color: string;
      };
    }>;
  };
}

export default BarEchartComponent;
