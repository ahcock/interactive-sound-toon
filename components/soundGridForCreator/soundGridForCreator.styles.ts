import styled, { css, CSSObject } from "styled-components";

export const GridContainer = styled.div<{
  showGrid?: boolean;
  gridPosition: CSSObject;
}>`
  width: 100%;
  height: 100%;
  grid-column: ${({ gridPosition }) => gridPosition.column};
  grid-row: ${({ gridPosition }) => gridPosition.row};

  ${({ showGrid }) =>
    showGrid &&
    css`
      border: 1px solid rgb(204, 209, 209);
    `};
`;
