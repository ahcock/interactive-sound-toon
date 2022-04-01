import { FC } from "react";
import { GridContainer, UploadButton } from "./soundGridForCreator.styles";
import { OnPlusClick } from "../soundLayer/soundLayer.component";

type GridPosition = {
  row: string;
  column: string;
};

interface SoundGridForCreatorProps {
  showGrid?: boolean;
  gridPosition: GridPosition;
  onPlusClick: OnPlusClick;
  index: number;
}

const SoundGridForCreator: FC<SoundGridForCreatorProps> = ({
  showGrid = false,
  gridPosition,
  onPlusClick,
  index,
}) => {
  return (
    <GridContainer gridPosition={gridPosition} showGrid={showGrid}>
      <UploadButton
        onClick={() => {
          onPlusClick(gridPosition, index);
        }}
      >
        +
      </UploadButton>
    </GridContainer>
  );
};

export { SoundGridForCreator };
export type { GridPosition };
