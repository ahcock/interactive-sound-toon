import { FC, useEffect, useState } from "react";
import { magicClient } from "../lib/magicClient";
import { AppInitialProps } from "next/dist/shared/lib/utils";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn, userLoggedOut } from "../store/user/userSlice";
import { RootState } from "../store/store";
import { Loader } from "./loader/loader.component";

interface IWithMagicAuth {
  pageProps: AppInitialProps["pageProps"];
}

const WithMagicAuth: FC<IWithMagicAuth> = ({
  children,
  pageProps: { isPagePrivate = false },
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(
    (state: RootState) => state.user.isUserLoggedIn
  );

  useEffect(
    function monitorRouterChange() {
      const { events } = router;

      events.on("routeChangeStart", () => setIsLoading(true));
      events.on("routeChangeComplete", () => setIsLoading(false));

      return () => {
        events.off("routeChangeStart", () => setIsLoading(true));
        events.off("routeChangeComplete", () => setIsLoading(false));
      };
    },
    [router, router.asPath]
  );

  useEffect(
    function checkUserLoginStatus() {
      (async () => {
        if (!magicClient) {
          return;
        }

        // TODO: 여기서 너무 느려지는 것 같음
        const isLoggedIn = await magicClient.user.isLoggedIn();

        if (isLoggedIn && !isUserLoggedIn) {
          const { email } = await magicClient.user.getMetadata();
          dispatch(userLoggedIn({ email, isUserLoggedIn: true }));
        }

        if (!isLoggedIn && isPagePrivate) {
          dispatch(userLoggedOut());
          router.push("/login");
        }
      })();
    },
    [isUserLoggedIn, dispatch, isPagePrivate, router]
  );

  if (isLoading) return <Loader />;

  if (isUserLoggedIn || !isPagePrivate) return <>{children}</>;

  return <Loader />;
};

export { WithMagicAuth };
