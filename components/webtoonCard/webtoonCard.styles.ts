import styled from "styled-components";
import Image from "next/image";

export const StyledAnchor = styled.a`
  padding: 1.1vw;
  flex-basis: 70%;
  max-width: 500px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  height: max-content;
  justify-content: space-between;
  row-gap: 3vw;
  border-radius: 5px;
  border: 2px solid #f2f2f2;

  &:hover {
    background-color: rgb(217, 238, 248);
  }
`;

export const WebtoonTitle = styled.h3`
  flex: 6 1 60%;
  max-width: fit-content;
  font-size: 1.5vmax;
`;

export const ThumbnailContainer = styled.div`
  flex-basis: 40%;
  position: relative;
  max-height: fit-content;
`;

export const StyledImage = styled(Image)`
  border-radius: 5px;
`;
