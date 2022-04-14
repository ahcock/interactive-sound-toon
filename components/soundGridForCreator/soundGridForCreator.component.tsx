import { FC } from "react";
import { GridContainer, UploadButton } from "./soundGridForCreator.styles";
import {
  GridInfo,
  OnPlusClick,
  UploadedAudioInfo,
} from "../soundLayer/soundLayer.component";

interface SoundGridForCreatorProps {
  showGrid?: boolean;
  gridPosition: GridInfo;
  onPlusClick: OnPlusClick;
  index: number;
  uploadedAudio?: UploadedAudioInfo;
}

const SoundGridForCreator: FC<SoundGridForCreatorProps> = ({
  showGrid = false,
  gridPosition,
  onPlusClick,
  index,
  children,
}) => {
  return (
    <GridContainer gridPosition={gridPosition} showGrid={showGrid}>
      {!!children ? (
        children
      ) : (
        <UploadButton
          onClick={() => {
            onPlusClick(gridPosition, index);
          }}
        >
          +
        </UploadButton>
      )}
    </GridContainer>
  );
};

export { SoundGridForCreator };
