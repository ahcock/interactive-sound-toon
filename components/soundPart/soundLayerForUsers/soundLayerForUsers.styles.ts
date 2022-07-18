import styled from "styled-components";
import { CSSProperties } from "react";

export const SoundGridItem = styled.div.attrs(
  ({
    gridPosition,
  }: {
    gridPosition: { row: CSSProperties; column: CSSProperties };
  }) => ({
    style: {
      gridColumn: gridPosition.column,
      gridRow: gridPosition.row,
    },
  })
)``;
