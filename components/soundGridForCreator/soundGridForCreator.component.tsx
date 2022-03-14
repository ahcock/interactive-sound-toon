import { CSSProperties, FC } from "react";
import { GridContainer } from "./soundGridForCreator.styles";
import { CSSObject } from "styled-components";

type GridPosition = {
  row: string;
  column: string;
};

interface SoundGridForCreatorProps {
  showGrid?: boolean;
  gridPosition: GridPosition;
}

const SoundGridForCreator: FC<SoundGridForCreatorProps> = ({
  showGrid = false,
  gridPosition,
}) => {
  return (
    <GridContainer gridPosition={gridPosition} showGrid={showGrid}>
      test
    </GridContainer>
  );
};

export { SoundGridForCreator };
export type { GridPosition };
