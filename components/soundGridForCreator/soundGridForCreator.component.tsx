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
      <UploadButton onClick={() => onPlusClick("그리드 포지션 샘플")}>
        +
      </UploadButton>
    </GridContainer>
  );
};

export { SoundGridForCreator };
export type { GridPosition };
