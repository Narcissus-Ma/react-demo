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

const VirtualGuideLineTop = styled.div`
  background-color: transparent;
  position: absolute;
  border-bottom: 1px dotted #6b7587;
  right: 0;
  left: 0;
`;

const VirtualGuideLineLeft = styled.div`
  background-color: transparent;
  position: absolute;
  border-left: 1px dotted #6b7587;
  top: 0;
  bottom: 0;
`;
//#endregion

//#region 子组件
const RulerGenerator = (props: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setVirtualGuide, dimension, setRealGuide } = props;

  useEffect(() => {
    const rulerRef = canvasRef.current;
    if (rulerRef) {
      rulerRef.onmousedown = (e) => {
        if (dimension === RULER_TYPE.TOP) {
          setVirtualGuide(dimension, e.clientY);
          document.onmousemove = (e) => {
            e.preventDefault();
            setVirtualGuide(dimension, e.clientY);
          };
          document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;
            setVirtualGuide(dimension, 0);
            setRealGuide(dimension, e.clientY);
          };
        } else {
          setVirtualGuide(dimension, e.clientX);
          document.onmousemove = (e) => {
            e.preventDefault();
            setVirtualGuide(dimension, e.clientX);
          };
          document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;
            setVirtualGuide(dimension, 0);
            setRealGuide(dimension, e.clientX);
          };
        }
      };
      return () => {
        rulerRef.onmousedown = null;
      };
    }
  }, [dimension, setRealGuide, setVirtualGuide]);

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
    deleteGuide,
  } = props;
  const guideLineRef = useRef<HTMLDivElement>(null);
  const [draggedClass, setDraggedClass] = useState<string>("");

  useEffect(() => {
    const guideline = guideLineRef.current;
    if (guideline) {
      if (dimension === RULER_TYPE.TOP) {
        guideline.onmousedown = (e) => {
          e.preventDefault();
          const diffY = e.clientY - guideline.offsetTop;
          document.onmousemove = (e) => {
            e.preventDefault();
            e.stopPropagation();
            setDraggedClass("rul_line_dragged");
            const rulerContainerHeight = rulerContainer?.current.offsetHeight;
            let moveY = e.clientY - diffY;
            if (moveY < 0) {
              moveY = 0;
            }
            if (moveY > rulerContainerHeight) {
              moveY = rulerContainerHeight;
            }
            guideline.style.top = moveY + "px";
          };
          document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;
            setDraggedClass("");
            handlePositionChange(dimension, e.clientY, index);
          };
        };
      } else {
        guideline.onmousedown = (e) => {
          e.preventDefault();
          const diffX = e.clientX - guideline.offsetLeft;
          document.onmousemove = (e) => {
            e.preventDefault();
            e.stopPropagation();
            setDraggedClass("rul_line_dragged");
            const rulerContainerWidth = rulerContainer?.current.offsetWidth;
            let moveX = e.clientX - diffX;
            if (moveX < 0) {
              moveX = 0;
            }
            if (moveX > rulerContainerWidth) {
              moveX = rulerContainerWidth;
            }
            guideline.style.left = moveX + "px";
          };
          document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;
            setDraggedClass("");
            handlePositionChange(dimension, e.clientX, index);
          };
        };
      }
      return () => {
        guideline.onmousedown = null;
      };
    }
  }, [dimension, handlePositionChange, index, rulerContainer]);

  if (dimension === RULER_TYPE.LEFT) {
    return (
      <GuideLineWrapper
        ref={guideLineRef}
        className={`rul_lineVer ${draggedClass}`}
        style={{ left: position }}
        title="双击删除"
        onDoubleClick={() => deleteGuide(index)}
      />
    );
  } else {
    return (
      <GuideLineWrapper
        ref={guideLineRef}
        className={`rul_lineHor ${draggedClass}`}
        style={{ top: position }}
        title="双击删除"
        onDoubleClick={() => deleteGuide(index)}
      />
    );
  }
};

//#endregion

const Ruler = () => {
  const rulerContainerRef = useRef<HTMLDivElement>(null);
  const [guides, setGuides] = useState<Array<any>>([]);
  const [virtualGuideTop, setVirtualGuideTop] = useState<number>(0);
  const [virtualGuideLeft, setVirtualGuideLeft] = useState<number>(0);

  const constructVirtualGuide = (dimension: RULER_TYPE, ePosition: number) => {
    if (rulerContainerRef.current) {
      if (dimension === RULER_TYPE.TOP) {
        const position =
          ePosition - rulerContainerRef.current.getBoundingClientRect().top;
        setVirtualGuideTop(position);
      } else {
        const position =
          ePosition - rulerContainerRef.current.getBoundingClientRect().left;
        setVirtualGuideLeft(position);
      }
    }
  };

  const constructGuide = (dimension: RULER_TYPE, ePosition: number) => {
    let position: number = 0;
    if (rulerContainerRef.current) {
      if (dimension === RULER_TYPE.LEFT) {
        position =
          ePosition - rulerContainerRef.current.getBoundingClientRect().left;
        if (position > 15 && position < rulerContainerRef.current.offsetWidth) {
          guides.push({
            dimension,
            position,
          });
          setGuides([...guides]);
        }
      } else {
        position =
          ePosition - rulerContainerRef.current.getBoundingClientRect().top;
        if (
          position > 15 &&
          position < rulerContainerRef.current.offsetHeight
        ) {
          guides.push({
            dimension,
            position,
          });
          setGuides([...guides]);
        }
      }
    }
  };

  const clearGuides = () => {
    setGuides([]);
  };

  const deleteGuide = (index: number) => {
    guides.splice(index, 1);
    setGuides([...guides]);
  };

  const handlePositionChange = (
    dimension: RULER_TYPE,
    ePosition: number,
    index: number
  ) => {
    if (rulerContainerRef.current) {
      if (dimension === RULER_TYPE.LEFT) {
        const position =
          ePosition - rulerContainerRef.current.getBoundingClientRect().left;
        if (position > 15 && position < rulerContainerRef.current.offsetWidth) {
          guides[index] = {
            dimension: RULER_TYPE.LEFT,
            position,
          };
          setGuides([...guides]);
        } else {
          deleteGuide(index);
        }
      } else {
        const position =
          ePosition - rulerContainerRef.current.getBoundingClientRect().top;
        if (
          position > 15 &&
          position < rulerContainerRef.current.offsetHeight
        ) {
          guides[index] = {
            dimension: RULER_TYPE.TOP,
            position,
          };
          setGuides([...guides]);
        } else {
          deleteGuide(index);
        }
      }
    }
    // backToDeleteGuide(index, position);
  };

  return (
    <RulerWrapper ref={rulerContainerRef}>
      <RulerGenerator
        setVirtualGuide={constructVirtualGuide}
        setRealGuide={constructGuide}
        dimension={RULER_TYPE.TOP}
      />
      <RulerGenerator
        setVirtualGuide={constructVirtualGuide}
        setRealGuide={constructGuide}
        dimension={RULER_TYPE.LEFT}
      />
      <ClearButton onClick={clearGuides} />
      {virtualGuideTop !== 0 && virtualGuideTop > 15 && (
        <VirtualGuideLineTop style={{ top: `${virtualGuideTop}px` }} />
      )}
      {virtualGuideLeft !== 0 && virtualGuideLeft > 15 && (
        <VirtualGuideLineLeft style={{ left: `${virtualGuideLeft}px` }} />
      )}
      {guides.length
        ? guides.map((v, i) => {
            return (
              <GuideLine
                dimension={v.dimension}
                position={v.position}
                rulerContainer={rulerContainerRef}
                key={i}
                index={i}
                handlePositionChange={handlePositionChange}
                deleteGuide={deleteGuide}
              />
            );
          })
        : null}
    </RulerWrapper>
  );
};

export default Ruler;
