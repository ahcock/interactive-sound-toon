import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HeaderContainer,
  LayoutContainer,
  LogoAnchor,
  LogoContainer,
  MenuContainer,
  StyledAnchor,
  StyledLi,
  StyledNav,
  StyledUl,
} from "./globalNavBar.styles";
import Menu from "/images/svg/menu.svg";
import Close from "/images/svg/close.svg";
import { useRouter } from "next/router";
import { JSButton } from "../reusable/JSButton/JSButton.component";
import { magicClient } from "../../lib/magicClient";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../../store/user/userSlice";
import { RootState } from "../../store/store";

const GlobalNavBar: FC = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { asPath, events, push } = useRouter();
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(
    (state: RootState) => state.user.isUserLoggedIn
  );

  useEffect(
    function navMenuOpenHandler() {
      events.on("routeChangeStart", () => setIsMenuOpen(false));

      return events.off("routeChangeStart", () => setIsMenuOpen(false));
    },
    [asPath, events]
  );

  const logoutHandler = async () => {
    if (magicClient) {
      await magicClient.user.logout();
      dispatch(userLoggedOut());
      push("/");
    }
  };

  return (
    <LayoutContainer>
      <HeaderContainer>
        <Link href="/" passHref>
          <LogoAnchor>
            <LogoContainer>
              <Image
                src="/favicon.png"
                alt="logo"
                layout="fill"
                objectFit="contain"
              />
            </LogoContainer>
          </LogoAnchor>
        </Link>
        <StyledNav isMenuOpen={isMenuOpen}>
          <StyledUl>
            <StyledLi>
              <Link href="/" passHref>
                <StyledAnchor>Home</StyledAnchor>
              </Link>
            </StyledLi>
            <StyledLi>
              <Link href="/soundWebtoons" passHref>
                <StyledAnchor>Sound Webtoons</StyledAnchor>
              </Link>
            </StyledLi>
            <StyledLi>
              <Link href="/create" passHref>
                <StyledAnchor>CREATE</StyledAnchor>
              </Link>
            </StyledLi>

            {isUserLoggedIn && (
              <StyledLi onClick={logoutHandler}>
                <JSButton small>Log Out</JSButton>
              </StyledLi>
            )}
          </StyledUl>
        </StyledNav>

        <MenuContainer onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <Close style={{ fontSize: "32px" }} /> : <Menu />}
        </MenuContainer>
      </HeaderContainer>

      {children}
    </LayoutContainer>
  );
};

export { GlobalNavBar };
