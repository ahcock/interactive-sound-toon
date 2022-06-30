import { FC, useEffect, useState } from "react";
import { magicClient } from "../lib/magicClient";
import { AppInitialProps } from "next/dist/shared/lib/utils";
import { useRouter } from "next/router";

type CustomPageProps = {
  isPagePrivate?: boolean;
};

interface IWithMagicAuth {
  pageProps: AppInitialProps["pageProps"];
}

const WithMagicAuth: FC<IWithMagicAuth> = ({
  children,
  pageProps: { isPagePrivate = false },
}) => {
  // const [user, setUser] = useState<UserModule>();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<undefined | boolean>();
  const router = useRouter();

  useEffect(
    function checkUserLoginStatus() {
      (async () => {
        if (!magicClient) {
          return;
        }

        const isLoggedIn = await magicClient.user.isLoggedIn();
        setIsUserLoggedIn(isLoggedIn);

        if (!isLoggedIn && isPagePrivate) router.push("/login");
      })();
    },
    [isPagePrivate, router]
  );

  if (isUserLoggedIn || !isPagePrivate) return <>{children}</>;

  return <div>Loading...</div>;
};

export { WithMagicAuth };
export type { CustomPageProps };
