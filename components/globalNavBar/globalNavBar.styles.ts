import styled from "styled-components";

export const LayoutContainer = styled.main`
  position: relative;
  width: 100%;
  display: flex;
  padding: 2px 0;
  flex-direction: column;
`;

export const HeaderContainer = styled.header`
  margin: 0 auto 0;
  width: 100%;
  display: flex;
  z-index: 2;

  @media screen and (max-width: 768px) {
    height: initial;
    max-height: 100vh;
    flex-direction: column;
  } ;
`;

export const StyledNav = styled.nav<{ isMenuOpen?: boolean }>`
  flex-direction: inherit;
  width: 70%;
  display: flex;
  margin-left: auto;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
  line-height: 20px;

  @media screen and (max-width: 768px) {
    width: 100%;
    display: ${({ isMenuOpen }) => (isMenuOpen ? "block" : "none")};
    background: linear-gradient(
      180deg,
      white 0%,
      white 59px,
      rgba(255, 255, 255, 0) 100%
    );
  } ;
`;

export const StyledUl = styled.ul`
  flex-direction: inherit;
  width: 100%;
  list-style: none;
  display: flex;
  justify-content: space-around;

  @media screen and (max-width: 768px) {
    align-items: center;
    gap: 10px;
  } ;
`;

export const StyledLi = styled.li`
  width: inherit;
  display: flex;
  justify-content: center;
`;

export const StyledAnchor = styled.a`
  overflow: hidden;
  text-align: center;
  padding: 15px 12px;
  border-radius: 8px;

  &:hover {
    background-color: var(--greyOpacity100);
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  } ;
`;

export const LogoAnchor = styled.a`
  max-width: max-content;
`;

export const LogoContainer = styled.div`
  position: relative;
  height: 4rem;
  width: 4rem;

  @media screen and (min-width: 550px) and (max-width: 949px) {
    height: 6rem;
    width: 6rem;
  }

  @media screen and (min-width: 950px) and (max-width: 1449px) {
    height: 8rem;
    width: 8rem;
  }

  @media screen and (min-width: 1450px) {
    width: 10rem;
    height: 10rem;
  } ;
`;

export const MenuContainer = styled.span`
  position: absolute;
  top: 31px;
  right: 32px;
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
  @media screen and (max-width: 549px) {
    top: 19px;
  } ;
`;
