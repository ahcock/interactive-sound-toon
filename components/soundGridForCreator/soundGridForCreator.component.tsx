import { CSSProperties, FC } from "react";
import { GridContainer } from "./soundGridForCreator.styles";
import { CSSObject } from "styled-components";

interface SoundGridForCreatorProps {
  showGrid?: boolean;
  gridPosition: CSSObject;
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
