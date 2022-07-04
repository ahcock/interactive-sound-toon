import styled from "styled-components";
import { CSSProperties } from "react";

export const AudioElementContainer = styled.div.attrs(
  ({
    gridInfo,
  }: {
    gridInfo: { row: CSSProperties; column: CSSProperties };
  }) => ({
    style: {
      gridColumn: gridInfo.column,
      gridRow: gridInfo.row,
    },
  })
)`
  width: 100%;
  height: 100%;
`;
