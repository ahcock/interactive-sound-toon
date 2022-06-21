import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalStyle } from "../styles/globalStyle";
import { GlobalNavBar } from "../components/globalNavBar/globalNavBar.component";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <GlobalNavBar>
        <Component {...pageProps} />
      </GlobalNavBar>
    </>
  );
}

export default MyApp;
