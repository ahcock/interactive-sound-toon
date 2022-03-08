import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalStyleReset } from "../styles/globalStyleReset";
import { GlobalNavBar } from "../components/globalNavBar/globalNavBar.component";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyleReset />
      <GlobalNavBar>
        <Component {...pageProps} />;
      </GlobalNavBar>
    </>
  );
}

export default MyApp;
