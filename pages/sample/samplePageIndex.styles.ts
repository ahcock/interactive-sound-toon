import styled from "styled-components";

export const PageContainer = styled.div`
  position: relative;
`;

export const ImageLayer = styled.section`
  padding: 0 135px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0;
`;

export const SoundLayer = styled.section<{
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
