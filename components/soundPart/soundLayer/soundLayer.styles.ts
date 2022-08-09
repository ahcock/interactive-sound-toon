import styled from "styled-components";
import { SoundInfoType } from "./soundLayer.component";

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

export const SoundContainer = styled.div<{ soundInfoType?: SoundInfoType }>`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background-color: ${({ soundInfoType }) =>
    soundInfoType === SoundInfoType.ACTION ? "red" : "aliceblue"};
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const UploadButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  padding-bottom: 2em;
  padding-right: 2em;
`;
