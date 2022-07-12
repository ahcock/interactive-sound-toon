import type { AppProps } from "next/app";
import { GlobalStyle } from "../styles/globalStyle";
import { GlobalNavBar } from "../components/globalNavBar/globalNavBar.component";
import { WithMagicAuth } from "../components/withMagicAuth";
import { GetServerSideProps, GetStaticProps } from "next";
import Head from "next/head";

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
      <WithMagicAuth pageProps={pageProps}>
        <GlobalNavBar>
          <Component {...pageProps} />
        </GlobalNavBar>
      </WithMagicAuth>
    </>
  );
}

export default MyApp;
export type { CustomGetStaticProps, CustomGetServerSideProps };
