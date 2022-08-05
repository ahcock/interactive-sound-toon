import styled from "styled-components";

export const LoginPageContainer = styled.div`
  padding: 60px 0;
  margin: 0 40px;
`;

export const LoginPageMain = styled.main`
  max-width: 1044px;
  margin-left: auto;
  margin-right: auto;
`;

export const LoginPageTitleContainer = styled.div`
  @media screen and (min-width: 640px) {
    padding-top: 74px;
  }

  @media screen and (max-width: 639px) {
    padding-top: 18px;
  }
`;

export const LoginPageTitle = styled.span`
  display: block;
  margin-bottom: 48px;
  color: var(--grey800);
  font-weight: bold;

  @media screen and (min-width: 640px) {
    font-size: var(--font-size-h3);
  }

  @media screen and (min-width: 640px) and (max-width: 1023px) {
    font-size: var(--font-size-h4);
  }

  @media screen and (max-width: 639px) {
    margin: 24px 0;
    font-size: var(--font-size-h5);
  }
`;

export const InputContainer = styled.div`
  width: 50%;
`;

export const ButtonContainer = styled.div`
  margin-top: 3rem;
`;

export const LoginGuide = styled.p`
  margin-top: 4%;
`;
