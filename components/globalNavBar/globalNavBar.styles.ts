import styled from "styled-components";

export const LayoutContainer = styled.main`
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
`;

// 링크 선택됐을 때 color: rgb(242,170,75)

export const StyledNav = styled.nav`
  width: 70%;
  display: flex;
  margin-left: auto;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
  line-height: 20px;
  //color: var(--white);
`;

export const StyledUl = styled.ul`
  width: 100%;
  list-style: none;
  display: flex;
  justify-content: space-around;
`;

export const StyledLink = styled.a<{ noPadding?: boolean }>`
  width: 200px;
  overflow: hidden;
  //height: 100px;
  padding: ${({ noPadding }) => (noPadding ? 0 : "12px 10px")};
`;

export const LogoContainer = styled.div`
  position: relative;
  height: 4rem;
  width: 4rem;

  @media (min-width: 550px) and (max-width: 949px) {
    height: 6rem;
    width: 6rem;
  }

  @media (min-width: 950px) and (max-width: 1449px) {
    height: 8rem;
    width: 8rem;
  }

  @media (min-width: 1450px) {
    width: 10rem;
    height: 10rem;
  } ;
`;
