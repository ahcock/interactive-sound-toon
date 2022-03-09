import { FC } from "react";
import Link from "next/link";
import {
  LayoutContainer,
  HeaderContainer,
  HeadingTitle,
  StyledNav,
  StyledLink,
  StyledUl,
} from "./globalNavBar.styles";

const GlobalNavBar: FC = ({ children }) => {
  return (
    <LayoutContainer>
      <HeaderContainer>
        <HeadingTitle>Interactive</HeadingTitle>
        <StyledNav>
          <StyledUl>
            <li>
              <Link href="/" passHref>
                <StyledLink>Home</StyledLink>
              </Link>
            </li>
            <li>
              <Link href="/sample" passHref>
                <StyledLink>SAMPLE</StyledLink>
              </Link>
            </li>
            <li>
              <Link href="/list" passHref>
                <StyledLink>LIST</StyledLink>
              </Link>
            </li>
            <li>
              <Link href="/create" passHref>
                <StyledLink>CREATE</StyledLink>
              </Link>
            </li>
          </StyledUl>
        </StyledNav>
      </HeaderContainer>
      {children}
    </LayoutContainer>
  );
};

export { GlobalNavBar };
