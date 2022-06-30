import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalStyle } from "../styles/globalStyle";
import { GlobalNavBar } from "../components/globalNavBar/globalNavBar.component";
import { magicClient } from "../lib/magicClient";
import { useEffect } from "react";
import { WithMagicAuth } from "../components/withMagicAuth";

type CustomPageProps = {
  isPagePrivate?: boolean;
};

function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  useEffect(() => {
    if (magicClient) {
      magicClient.user.logout();
    }
  }, []);
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
export type {};
