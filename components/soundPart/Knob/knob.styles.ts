import styled from "styled-components";

export const KnobContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 31px;
  height: 20px;
  cursor: ns-resize;
  -webkit-user-drag: none;
  user-select: none;
`;

export const KnobBody = styled.div`
  width: 22px;
  height: 22px;
  background-color: var(--background-base);
  border: 1px solid var(--essential-subdued);
  border-radius: 40px;
  position: absolute;
  top: 4px;
`;

export const KnobPointer = styled.div<{ knobDeg: number }>`
  position: absolute;
  top: 3px;
  left: 11px;
  width: 2px;
  height: 24px;
  //background-color: rgb(155, 122, 231);
  border-top: 12px solid white;

  transform: ${({ knobDeg }) => `rotate(${knobDeg}deg)`};
`;
