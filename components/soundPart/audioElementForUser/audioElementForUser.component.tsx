import { FC } from "react";
import { GridInfo } from "../soundLayer/soundLayer.component";
import { AudioElementContainer } from "./audioElementForUser.styles";

interface IAudioElementContainer {
  gridInfo: GridInfo;
}

const AudioElementForUserComponent: FC<IAudioElementContainer> = ({
  children,
  gridInfo,
}) => {
  return (
    <AudioElementContainer gridInfo={gridInfo}>
      {children}
    </AudioElementContainer>
  );
};

export { AudioElementForUserComponent };
