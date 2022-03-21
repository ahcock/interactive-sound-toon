import { FC } from "react";
import { GridContainer, UploadButton } from "./soundGridForCreator.styles";

type GridPosition = {
  row: string;
  column: string;
};

interface SoundGridForCreatorProps {
  showGrid?: boolean;
  gridPosition: GridPosition;
  onPlusClick: (info: string) => void;
}

const SoundGridForCreator: FC<SoundGridForCreatorProps> = ({
  showGrid = false,
  gridPosition,
  onPlusClick,
}) => {
  return (
    <GridContainer gridPosition={gridPosition} showGrid={showGrid}>
      <UploadButton onClick={onPlusClick}>+</UploadButton>
    </GridContainer>
  );
};

export { SoundGridForCreator };
export type { GridPosition };
