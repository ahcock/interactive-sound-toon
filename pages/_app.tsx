import type { AppProps } from "next/app";
import { GlobalStyle } from "../styles/globalStyle";
import { GlobalNavBar } from "../components/globalNavBar/globalNavBar.component";
import { WithMagicAuth } from "../components/withMagicAuth";
import { GetServerSideProps, GetStaticProps } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "../store/store";

type CustomPageProps = {
  isPagePrivate?: boolean;
};

type CustomGetStaticProps = GetStaticProps<CustomPageProps>;
type CustomGetServerSideProps = GetServerSideProps<CustomPageProps>;

function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  return (
    <>
      <Head>
        <title>Interactive Sound Toon</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <GlobalStyle />
      <Provider store={store}>
        <WithMagicAuth pageProps={pageProps}>
          <GlobalNavBar>
            <Component {...pageProps} />
          </GlobalNavBar>
        </WithMagicAuth>
      </Provider>
    </>
  );
}

export default MyApp;
export type { CustomGetStaticProps, CustomGetServerSideProps };
