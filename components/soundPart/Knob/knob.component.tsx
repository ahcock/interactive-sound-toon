import { FC, useState, MouseEvent, useRef } from "react";
import { KnobBody, KnobContainer, KnobPointer } from "./knob.styles";

const Knob: FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMouseDown = useRef(false);

  const onKnobChange = (e: MouseEvent<HTMLDivElement>) => {
    console.log(e.type, isMouseDown.current);
    if (e.type === "mousedown") {
      isMouseDown.current = true;
      setMousePosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    } else if (isMouseDown.current && e.type === "mousemove") {
      setMousePosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    } else if (e.type === "mouseup") {
      isMouseDown.current = false;
      setMousePosition({ x: 0, y: 0 });
    }
  };

  console.log(mousePosition);
  return (
    <KnobContainer
      onMouseDown={onKnobChange}
      onMouseUp={onKnobChange}
      onMouseMove={onKnobChange}
    >
      <div>
        <KnobBody />
        <KnobPointer />
      </div>
    </KnobContainer>
  );
};

export { Knob };
