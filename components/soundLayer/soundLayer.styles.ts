import styled from "styled-components";

export const SoundLayerSection = styled.section<{
  width: number;
  height: number;
  show?: boolean;
}>`
  position: absolute;
  top: 0;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(200, 1fr);
`;
