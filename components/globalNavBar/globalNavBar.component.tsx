import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HeaderContainer,
  LayoutContainer,
  LogoContainer,
  StyledLink,
  StyledNav,
  StyledUl,
} from "./globalNavBar.styles";

const GlobalNavBar: FC = ({ children }) => {
  return (
    <LayoutContainer>
      <HeaderContainer>
        <Link href="/" passHref>
          <StyledLink noPadding>
            <LogoContainer>
              <Image
                src="/favicon.png"
                alt="logo"
                layout="fill"
                objectFit="contain"
              />
            </LogoContainer>
          </StyledLink>
        </Link>
        <StyledNav>
          <StyledUl>
            <li>
              <Link href="/" passHref>
                <StyledLink>Home</StyledLink>
              </Link>
            </li>
            <li>
              <Link href="/soundWebtoons" passHref>
                <StyledLink>Sound Webtoons</StyledLink>
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
