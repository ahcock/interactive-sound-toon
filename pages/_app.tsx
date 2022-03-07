import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalStyleReset } from "../styles/globalStyleReset";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyleReset />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
