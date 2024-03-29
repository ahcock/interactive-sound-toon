import { FC } from "react";
import { GridContainer, UploadButton } from "./soundGridForCreator.styles";
import {
  GridInfo,
  OnGridClick,
  SavedSound,
} from "../soundLayer/soundLayer.component";

interface IGridForSoundCreatorProps {
  showGrid?: boolean;
  gridPosition: GridInfo;
  onGridClick: OnGridClick;
  index: number;
  savedSound?: SavedSound;
}

const GridForSoundCreator: FC<IGridForSoundCreatorProps> = ({
  showGrid = false,
  gridPosition,
  onGridClick,
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
            onGridClick(gridPosition, index);
          }}
        >
          +
        </UploadButton>
      )}
    </GridContainer>
  );
};

export { GridForSoundCreator };
