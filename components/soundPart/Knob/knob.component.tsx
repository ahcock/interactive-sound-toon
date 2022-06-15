import { FC, MouseEvent, useRef, useState } from "react";
import { KnobBody, KnobContainer, KnobPointer } from "./knob.styles";

const Knob: FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [knobDeg, setKnobDeg] = useState(0);

  const knob = useRef<HTMLDivElement>(null);

  const isMouseDown = useRef(false);

  const onKnobChange = (e: MouseEvent<HTMLDivElement>) => {
    console.log(e.type, isMouseDown.current);
    if (!isMouseDown.current && e.type === "mousedown") {
      isMouseDown.current = true;
    } else if (
      isMouseDown.current &&
      e.type === "mousemove" &&
      !!knob.current
    ) {
      const h = knob.current.clientHeight / 2;
      const w = knob.current.clientWidth / 2;
      const x = e.nativeEvent.clientX - knob.current.offsetLeft;
      const y = e.nativeEvent.clientY - knob.current.offsetTop;

      const deltaX = w - x;
      const deltaY = h - y;

      const rad = Math.atan2(deltaY, deltaX);

      const deg = rad * (180 / Math.PI);

      const result = Math.floor(deg - 90);
      setKnobDeg(result);
    } else if (e.type === "mouseup") {
      isMouseDown.current = false;
    }
  };

  console.log(knobDeg);
  return (
    <KnobContainer
      ref={knob}
      onMouseDown={onKnobChange}
      onMouseUp={onKnobChange}
      onMouseMove={onKnobChange}
    >
      <div>
        <KnobBody />
        <KnobPointer knobDeg={knobDeg} />
      </div>
    </KnobContainer>
  );
};

export { Knob };
