import styled, { keyframes, css } from "styled-components";

const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const IndexPageContainer = styled.main`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

export const IndexPageSection = styled.section`
  display: flex;
  padding: 75px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
`;

export const IndexPageImageContainer = styled.div`
  position: relative;
  width: 100%;
  color: var(--white);
  height: 471px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 950px) {
    height: 688px;
  }

  @media screen and (min-width: 740px) and (max-width: 949px) {
    height: 713px;
  }

  @media screen and (min-width: 590px) and (max-width: 739px) {
    height: 744px;
  }

  @media screen and (min-width: 550px) and (max-width: 589px) {
    height: 500px;
  }
`;

export const BackgroundGradient = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    white 0%,
    white 59px,
    rgba(255, 255, 255, 0) 100%
  );
`;

export const IndexTextSection = styled.div`
  position: relative;
  color: rgb(0, 0, 0);
  width: 100%;
  max-width: 960px;
  line-height: 1.4;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  row-gap: 3px;
`;

export const IndexTitle = styled.h1`
  margin: 0 auto;
  max-width: 670px;
  font-weight: 650;

  @media screen and (max-width: 549px) {
    font-size: 2rem;
  }

  @media screen and (min-width: 550px) and (max-width: 1449px) {
    font-size: 3.5rem;
  }

  @media screen and (min-width: 1450px) {
    font-size: 4.2rem;
  } ;
`;

export const IndexSubtitle = styled.h2<{ fontSize?: string }>`
  margin: 1rem auto;
  max-width: 670px;
  background: linear-gradient(to right, #121fcf 13%, #1c2c59 98%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: ${({ fontSize }) => fontSize || "1.1rem"};
  font-weight: 650;

  @media screen and (min-width: 550px) {
    font-size: ${({ fontSize }) => fontSize || "1.6rem"};
  }
`;

export const IndexAnchor = styled.a<{ isIntersecting: boolean }>`
  font-size: 1.5vw;
  font-weight: 600;
  padding: 1em;
  cursor: pointer;
  border-radius: 5px;
  opacity: 0;

  ${({ isIntersecting }) =>
    isIntersecting &&
    css`
      animation: ${slideUp} 1.2s ease 0s 1 normal forwards;
    `}

  &:hover {
    background-color: var(--grey200);
  }
`;
