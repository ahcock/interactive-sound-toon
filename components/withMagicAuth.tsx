import { FC, useEffect } from "react";
import { magicClient } from "../lib/magicClient";
import { AppInitialProps } from "next/dist/shared/lib/utils";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../store/user/userSlice";
import { RootState } from "../store/store";

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
  const router = useRouter();
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(
    (state: RootState) => state.user.isUserLoggedIn
  );

  useEffect(
    function checkUserLoginStatus() {
      (async () => {
        if (!magicClient) {
          return;
        }

        const isLoggedIn = await magicClient.user.isLoggedIn();

        if (!isLoggedIn && isPagePrivate) {
          dispatch(userLoggedOut());
          router.push("/login");
        }
      })();
    },
    [dispatch, isPagePrivate, router]
  );

  if (isUserLoggedIn || !isPagePrivate) return <>{children}</>;

  return <div>Loading...</div>;
};

export { WithMagicAuth };
export type { CustomPageProps };
