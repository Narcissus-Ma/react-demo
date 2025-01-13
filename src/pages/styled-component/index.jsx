/*
 * @Author: Narcissus 577008637@qq.com
 * @Date: 2022-10-09 11:04:31
 * @LastEditors: Narcissus 577008637@qq.com
 * @LastEditTime: 2022-10-09 14:08:38
 * @FilePath: \react-demo\src\pages\styled-component\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import styled, { css } from "styled-components";

const MyButton = styled.button`
  border: 1px solid #0ff;
  border-radius: 4px;
  padding: 4px 16px;
  cursor: pointer;
  height: ${(props) => props.size || "auto"};

  & span {
    font-weight: 700;
    color: red;
  }

  &:hover {
    background-color: #0ff;
  }

  /* & ~ & {
    margin: 10px;
  } */

  & + & {
    margin: 10px;
  }

  &.red {
    border: 1px solid red;
  }

  ${(props) =>
    props.disabled &&
    css`
      color: #777;
      border: #777;
      cursor: not-allowed;
    `}
`;

const BigButton = styled(MyButton)`
  border: 1px solid blue;
  background-color: pink;
`;

const StyledComponent = () => {
  return (
    <div>
      <MyButton disabled={true} onClick={() => console.log("===hello===")}>
        Hello <span>你好</span>
      </MyButton>
      <span>+</span>
      <MyButton onClick={() => console.log("===hello===")}>
        Hello <span>你好</span>
      </MyButton>
      <MyButton
        className="red"
        size={"50px"}
        onClick={() => console.log("===hello===")}
      >
        Hello <span>你好</span>
      </MyButton>
      <BigButton>继承的样式</BigButton>
    </div>
  );
};

export default StyledComponent;
