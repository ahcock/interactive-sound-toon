import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalStyle } from "../styles/globalStyle";
import { GlobalNavBar } from "../components/globalNavBar/globalNavBar.component";
import { WithMagicAuth } from "../components/withMagicAuth";
import { GetServerSideProps, GetStaticProps } from "next";
import { useEffect } from "react";
import { magicClient } from "../lib/magicClient";

type CustomPageProps = {
  isPagePrivate?: boolean;
};

type CustomGetStaticProps = GetStaticProps<CustomPageProps>;
type CustomGetServerSideProps = GetServerSideProps<CustomPageProps>;

function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  // TODO: 임시 로그아웃 기능. 추후 로그아웃 기능을 만들어야 함

  // useEffect(() => {
  //   if (magicClient) {
  //     magicClient.user.logout();
  //   }
  // }, []);

  return (
    <>
      <GlobalStyle />
      <GlobalNavBar>
        <WithMagicAuth pageProps={pageProps}>
          <Component {...pageProps} />
        </WithMagicAuth>
      </GlobalNavBar>
    </>
  );
}

export default MyApp;
export type { CustomGetStaticProps, CustomGetServerSideProps };
