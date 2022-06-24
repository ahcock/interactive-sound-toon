import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

export const WebtoonCardContainer = styled(Link)``;

export const WebtoonCardInnerContainer = styled.div`
  width: 100%;
  max-width: 550px;
  min-width: 400px;
  height: 190px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr;
  cursor: pointer;
  border: 1px solid rgba(55, 53, 47, 0.16);
  border-radius: 5px;
  &:hover {
    background-color: rgb(217, 238, 248);
  }
`;

export const WebtoonTitle = styled.h3`
  fonst-size: 20px;
`;

export const StyledAnchor = styled.a`
  padding: 14px;
  display: flex;
`;

export const ThumbnailContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const WebtoonThumbnail = styled(Image)`
  border-radius: 5px;
`;
