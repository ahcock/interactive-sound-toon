import styled from "styled-components";

export const LayoutContainer = styled.main`
  width: 100vw;
  max-width: 100%;
  display: flex;
  padding: 2px 24px;
  flex-direction: column;
`;

export const HeaderContainer = styled.header`
  margin-top: 22px;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export const HeadingTitle = styled.h1`
  text-align: center;
`;

export const StyledNav = styled.nav`
  width: 70%;
  display: flex;
  align-items: center;
`;

export const StyledUl = styled.ul`
  width: 100%;
  list-style: none;
  display: flex;
  justify-content: space-around;
`;

export const StyledLink = styled.a`
  width: 200px;
  height: 100px;
`;
