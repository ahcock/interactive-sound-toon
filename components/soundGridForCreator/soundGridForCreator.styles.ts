import styled, { css } from "styled-components";
import { CSSProperties } from "react";

export const GridContainer = styled.div.attrs(
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
)`
  width: 100%;
  height: 100%;
  font-size: 40px;

  ${({ showGrid }) =>
    showGrid &&
    css`
      border: 1px solid rgb(204, 209, 209);
    `};
`;

export const UploadButton = styled.p`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  &:hover {
    background: rgba(124, 115, 230, 0.3);
    opacity: 1;
    color: black;
    cursor: pointer;
  }
`;
