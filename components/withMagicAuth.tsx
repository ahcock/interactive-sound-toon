import { FC, useEffect, useState } from "react";
import { magicClient } from "../lib/magicClient";
import { AppInitialProps } from "next/dist/shared/lib/utils";
import { useRouter } from "next/router";
import { UserModule } from "@magic-sdk/provider/dist/types/modules/user";

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
  const [user, setUser] = useState<UserModule>();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(function initUser() {
    if (magicClient) {
      setUser(magicClient.user);
    }
  }, []);

  useEffect(
    function checkUserLoginStatus() {
      (async () => {
        if (user) {
          const userLoginStatus = await user.isLoggedIn();
          setIsUserLoggedIn(userLoginStatus);
        }
      })();
    },
    [user]
  );

  if (!isPagePrivate || (isPagePrivate && isUserLoggedIn)) {
    return <div>{children}</div>;
  }

  if (isPagePrivate && user && !isUserLoggedIn) router.push("/login");

  return <div>Loading</div>;
};

export { WithMagicAuth };
export type { CustomPageProps };
