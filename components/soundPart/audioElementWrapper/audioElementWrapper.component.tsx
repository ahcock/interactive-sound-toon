import { FC } from "react";
import { GridInfo } from "../soundLayer/soundLayer.component";
import { AudioElementContainer } from "./audioElementWrapper.styles";

interface IAudioElementWrapperProps {
  gridInfo: GridInfo;
}

const AudioElementWrapper: FC<IAudioElementWrapperProps> = ({
  children,
  gridInfo,
}) => {
  return (
    <AudioElementContainer gridInfo={gridInfo}>
      {children}
    </AudioElementContainer>
  );
};

export { AudioElementWrapper };
