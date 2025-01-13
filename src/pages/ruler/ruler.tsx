import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

//#region 枚举类型
enum RULER_TYPE {
  LEFT = "LEFT",
  TOP = "TOP",
}
//#endregion

//#region 样式
const RulerWrapper = styled.div`
  width: 1200px;
  height: 800px;
  margin: 50px;
  position: relative;
  overflow: hidden;
  canvas:nth-child(1) {
    position: absolute;
    left: 15px;
  }
  canvas:nth-child(2) {
    transform: rotateZ(90deg);
    position: absolute;
    left: -592px;
    top: 608px;
  }
  .rul_lineVer {
    top: 0;
    bottom: 0;
  }
  .rul_lineHor {
    right: 0;
    left: 0;
  }
  .rul_lineVer:hover {
    cursor: ew-resize;
  }
  .rul_lineHor:hover {
    cursor: ns-resize;
  }
  .rul_line_dragged {
    border: 1px dotted #6b7587;
  }
`;

const ClearButton = styled.div`
  width: 15px;
  height: 15px;
  background-color: red;
`;

const GuideLineWrapper = styled.div`
  color: transparent;
  background-color: transparent;
  border-bottom: 1px solid #3bb7c7;
  border-left: 1px solid #3bb7c7;
  z-index: 1000;
  position: absolute;
`;
//#endregion

//#region 子组件
const RulerGenerator = (props: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setGuides, dimension } = props;

  useEffect(() => {
    const rulerRef = canvasRef.current;
    const mousedown = (e: MouseEvent) => {
      setGuides(dimension, e);
    };
    rulerRef?.addEventListener("mousedown", mousedown);
    return () => {
      rulerRef?.removeEventListener("mousedown", mousedown);
    };
  }, [setGuides, dimension]); // 这里要监听props的变化

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (context) {
      context.strokeStyle = "gray";
      context.lineWidth = 1;
      context.beginPath();
      let label = "",
        pointLength = 0,
        draw = false,
        lineLengthMax = 0,
        lineLengthMed = 15 / 4,
        lineLengthMin = 15 / 2;
      for (let pos = 0; pos < 1200; pos++) {
        draw = false;
        label = "";
        if (pos % 50 === 0) {
          pointLength = lineLengthMax;
          label = String(pos);
          draw = true;
        } else if (pos % 25 === 0) {
          pointLength = lineLengthMed;
          draw = true;
        } else if (pos % 5 === 0) {
          pointLength = lineLengthMin;
          draw = true;
        }
        if (draw) {
          context.moveTo(pos, 15);
          context.lineTo(pos, pointLength);
          context.fillText(label, pos + 1, 15 / 2 + 1);
        }
      }
      context.stroke();
    }
  }, []);
  return (
    <canvas
      ref={canvasRef}
      height="15"
      width="1200"
      style={{ backgroundColor: "#fff" }}
    />
  );
};

const GuideLine = (props: any) => {
  const {
    dimension,
    position,
    handlePositionChange,
    index,
    rulerContainer,
    event,
    deleteGuide,
  } = props;
  const guideLineRef = useRef<HTMLDivElement>(null);
  const [draggedClass, setDraggedClass] = useState<string>("");

  useEffect(() => {
    const guideline = guideLineRef.current;

    const startMoving = (e?: MouseEvent) => {
      e?.stopPropagation();
      setDraggedClass("rul_line_dragged");
      if (dimension === RULER_TYPE.LEFT) {
        const posX = e ? e.clientX : 0;
        const divLeft = Number(position) || 0;
        const eWi = guideline?.offsetWidth;
        const cWi = rulerContainer?.current.offsetWidth;

        const diffX = posX - divLeft;
        document.onmousemove = (e: MouseEvent) => {
          const posX = e.clientX;
          let aX = posX - diffX;
          if (aX < 0) {
            aX = 0;
          }
          if (eWi && aX + eWi > cWi) {
            aX = cWi - eWi;
          }
          handlePositionChange(dimension, aX, index);
        };
      } else {
        const posY = e ? e.clientY : 0;
        const divTop = Number(position) || 0;
        const eHe = guideline?.offsetHeight;
        const cHe = rulerContainer?.current.offsetHeight;

        const diffY = posY - divTop;
        document.onmousemove = (e: MouseEvent) => {
          const posY = e.clientY;
          let aY = posY - diffY;
          if (aY < 0) {
            aY = 0;
          }
          if (eHe && aY + eHe > cHe) {
            aY = cHe - eHe;
          }
          handlePositionChange(dimension, aY, index);
        };
      }
    };

    const stopMoving = (e: MouseEvent) => {
      document.onmousemove = null;
      setDraggedClass("");
    };
    if (event) {
      startMoving(event);
    }
    guideline?.addEventListener("mousedown", startMoving);
    guideline?.addEventListener("mouseup", stopMoving);
    guideline?.addEventListener("dblclick", () => deleteGuide(index));

    return () => {
      guideline?.removeEventListener("mousedown", startMoving);
      guideline?.removeEventListener("mouseup", stopMoving);
      guideline?.removeEventListener("dblclick", () => deleteGuide(index));
    };
  }, [
    dimension,
    handlePositionChange,
    index,
    position,
    rulerContainer,
    event,
    deleteGuide,
  ]);

  if (dimension === RULER_TYPE.LEFT) {
    return (
      <GuideLineWrapper
        ref={guideLineRef}
        className={`rul_lineVer ${draggedClass}`}
        style={{ left: position }}
      />
    );
  } else {
    return (
      <GuideLineWrapper
        ref={guideLineRef}
        className={`rul_lineHor ${draggedClass}`}
        style={{ top: position }}
        title="双击删除"
      />
    );
  }
};

//#endregion

const Ruler = () => {
  const rulerContainerRef = useRef<HTMLDivElement>(null);
  const [guides, setGuides] = useState<Array<any>>([]);
  //   const [assigned, setAssigned] = useState<boolean>(false);

  const constructGuide = (dimension: RULER_TYPE, e: MouseEvent) => {
    let position: number = 0;
    if (rulerContainerRef.current) {
      if (dimension === RULER_TYPE.LEFT) {
        position =
          e.clientX - rulerContainerRef.current.getBoundingClientRect().left;
      } else {
        position =
          e.clientY - rulerContainerRef.current.getBoundingClientRect().top;
      }
      guides.push({
        dimension,
        position,
        event: e,
      });
      setGuides([...guides]);
    }
  };

  const clearGuides = () => {
    setGuides([]);
  };

  const deleteGuide = (index: number) => {
    guides.splice(index, 1);
    setGuides([...guides]);
  };

  //   const backToDeleteGuide = (index: number, position: number) => {
  //     if (!assigned) {
  //       if (position > 15) {
  //         setAssigned(true);
  //       }
  //       return;
  //     }

  //     if (assigned && position < 15) {
  //       setAssigned(false);
  //       deleteGuide(index);
  //       document.onmousemove = null;
  //     }
  //   };

  const handlePositionChange = (
    dimension: RULER_TYPE,
    position: number,
    index: number
  ) => {
    if (dimension === RULER_TYPE.LEFT) {
      guides[index] = { dimension: RULER_TYPE.LEFT, position };
      setGuides([...guides]);
    } else {
      guides[index] = { dimension: RULER_TYPE.TOP, position };
      setGuides([...guides]);
    }
    // backToDeleteGuide(index, position);
  };

  return (
    <RulerWrapper ref={rulerContainerRef}>
      <RulerGenerator setGuides={constructGuide} dimension={RULER_TYPE.TOP} />
      <RulerGenerator setGuides={constructGuide} dimension={RULER_TYPE.LEFT} />
      <ClearButton onClick={clearGuides} />
      {guides.length
        ? guides.map((v, i) => {
            return (
              <GuideLine
                dimension={v.dimension}
                position={v.position}
                event={v.event}
                index={i}
                handlePositionChange={handlePositionChange}
                deleteGuide={deleteGuide}
                rulerContainer={rulerContainerRef}
                key={i}
              />
            );
          })
        : null}
    </RulerWrapper>
  );
};

export default Ruler;
