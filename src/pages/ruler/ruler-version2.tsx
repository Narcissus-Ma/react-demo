import React, { useRef, useEffect, useState } from "react";
import { v4 } from "uuid";
import styled from "styled-components";
// import "./index.scss";

const RulerWrapper = styled.div`
  .ruler {
    width: 100%;
    height: 20px;
    background-color: #ccc;
    border-bottom: 1px solid #000;
    position: absolute;
    z-index: 1;
    .virtual-guides-line {
      height: 1px;
      width: 100%;
      background-color: #aaa;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  // 参考线样式
  .guides-line {
    position: absolute;
    &.guides-line__h {
      left: 0;
      top: 0;
      height: 5px;
      width: 100%;
      &:hover {
        cursor: n-resize;
      }
      &::before {
        content: " ";
        display: block;
        background-color: aqua;
        height: 1px;
        width: 100%;
      }
    }
  }
`;

const createUUID = () => {
  return v4();
};

const GuidesLine = (props) => {
  const { id, top, removeCb, updateCb } = props;
  const dragRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const drag = dragRef.current;
    if (drag) {
      drag.onmousedown = (ev) => {
        ev.preventDefault();
        const diffY = ev.clientY - drag.offsetTop;
        document.onmousemove = (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          let moveY = ev.clientY - diffY;
          drag.style.top = moveY + "px";
        };
        document.onmouseup = (ev) => {
          document.onmousemove = null;
          document.onmouseup = null;
          // 如果小于等于20则去除参考线
          if (ev.clientY <= 20) {
            removeCb(id);
          } else {
            updateCb(id, ev.clientY);
          }
        };
      };
      return () => {
        drag.onmousedown = null;
      };
    }
  }, [id, props, removeCb, updateCb]);

  return (
    <div
      ref={dragRef}
      className="guides-line guides-line__h"
      data-id={id}
      style={{ top: `${top}px` }}
      onDoubleClick={() => {
        // 双击删除
        removeCb(id);
      }}
    ></div>
  );
};

// 坐标尺
const Ruler = () => {
  const rulerRef = useRef<HTMLDivElement>(null);
  const [guidesLineList, setGuidesLineList] = useState([]); //参考线列表
  const [virtualGuidesTop, setVirtualGuidesTop] = useState(0); //虚拟参考线距离顶部高度

  useEffect(() => {
    const el = rulerRef.current;
    if (el) {
      el.onmousedown = (ev) => {
        setVirtualGuidesTop(ev.clientY);
        document.onmousemove = (ev) => {
          ev.preventDefault();
          setVirtualGuidesTop(ev.clientY);
        };
        document.onmouseup = (ev) => {
          document.onmousemove = null;
          document.onmouseup = null;
          setVirtualGuidesTop(0);
          if (ev.clientY > 20) {
            // 添加新的参考线
            const list = [
              ...guidesLineList,
              {
                id: createUUID(),
                top: ev.clientY,
              },
            ];
            console.log(list);
            setGuidesLineList(list);
          }
        };
      };

      return () => {
        el.onmousedown = null;
      };
    }
  }, [guidesLineList]);

  return (
    <RulerWrapper>
      <div className="ruler" ref={rulerRef}>
        1111111
        {virtualGuidesTop !== 0 && virtualGuidesTop > 20 && (
          <div
            className="virtual-guides-line guides-line-h"
            style={{ top: `${virtualGuidesTop}px` }}
          ></div>
        )}
      </div>

      {/* 渲染参考线列表 */}
      {guidesLineList.map((item) => {
        return (
          <GuidesLine
            key={item.id}
            id={item.id}
            top={item.top}
            removeCb={(id) => {
              setGuidesLineList(
                guidesLineList.filter((item) => item.id !== id)
              );
            }}
            updateCb={(id, top) => {
              console.log(id);
              setGuidesLineList(
                guidesLineList.map((item) => {
                  if (item.id === id) {
                    item.top = top;
                  }
                  return item;
                })
              );
            }}
          />
        );
      })}
    </RulerWrapper>
  );
};

export default Ruler;
