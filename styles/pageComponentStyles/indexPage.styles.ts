import styled from "styled-components";

export const IndexPageContainer = styled.main`
  width: 100%;
  overflow-x: hidden;
`;

export const IndexPageSection = styled.section`
  display: flex;
  padding: 75px 0;
  justify-content: center;
  align-items: center;
  height: auto;
`;

export const IndexPageImageContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  //border-bottom: 8px solid #222;
  color: var(--white);
  height: 471px;

  @media (min-width: 950px) {
    height: 688px;
  }

  @media (min-width: 740px) and (max-width: 949px) {
    height: 713px;
  }

  @media (min-width: 590px) and (max-width: 739px) {
    height: 744px;
  }

  @media (min-width: 550px) and (max-width: 589px) {
    height: 500px;
  }
`;

export const BackgroundGradient = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  //background: rgba(255, 255, 255, 0.1);
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

  @media (max-width: 549px) {
    font-size: 1.6rem;
  }

  @media (min-width: 550px) and (max-width: 1449px) {
    font-size: 3.1rem;
  }

  @media (min-width: 1450px) {
    font-size: 4rem;
  } ;
`;

export const IndexSubtitle = styled.h2`
  margin: 1rem auto;
  max-width: 670px;
  background: linear-gradient(to right, #121fcf 13%, #cf0a3f 98%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  //font-weight: 600;
  //
  //@media (max-width: 549px) {
  //  font-size: 1.6rem;
  //}
  //
  //@media (min-width: 550px) and (max-width: 1449px) {
  //  font-size: 3.1rem;
  //}
  //
  //@media (min-width: 1450px) {
  //  font-size: 4rem;
  //} ;
`;
