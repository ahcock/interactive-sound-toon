import { cloneElement, FC, useEffect, useState, isValidElement } from "react";
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

  // 유저 로그인 상태 전달
  if (isValidElement(children) && (isUserLoggedIn || !isPagePrivate))
    return cloneElement(children, { isUserLoggedIn });

  return <div>Loading...</div>;
};

export { WithMagicAuth };
export type { CustomPageProps };
