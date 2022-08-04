import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  ButtonContainer,
  InputContainer,
  LoginGuide,
  LoginPageContainer,
  LoginPageMain,
  LoginPageTitle,
  LoginPageTitleContainer,
} from "../styles/pageComponentStyles/loginPage.styles";
import { JSInput } from "../components/reusable/JSInput/JSInput.component";
import { magicClient } from "../lib/magicClient";
import { JSButton } from "../components/reusable/JSButton/JSButton.component";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../store/user/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: 뭔가 유의미한 error 처리를 해야할듯
    if (!magicClient) return;

    try {
      const didToken = await magicClient.auth.loginWithMagicLink({ email });

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${didToken}`,
        },
      });

      if (res.status === 200) {
        const { email: userEmail } = await magicClient.user.getMetadata();
        dispatch(
          userLoggedIn({ email: userEmail as string, isUserLoggedIn: true })
        );
        router.push("/create");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LoginPageContainer>
      <LoginPageMain>
        <LoginPageTitleContainer>
          <LoginPageTitle>사운드 디자이너 로그인</LoginPageTitle>
        </LoginPageTitleContainer>
        <form onSubmit={loginHandler}>
          <InputContainer>
            <JSInput
              onChange={onChangeHandler}
              label="Email"
              id="input-1"
              placeholder="이메일을 입력하세요"
              type="email"
            />
          </InputContainer>
          <ButtonContainer>
            <JSButton type="submit">로그인</JSButton>
          </ButtonContainer>
        </form>

        <LoginGuide>
          &#10024; 앱의 로그인 상태기반 페이지별 접근권한 시연을 위함으로서 평소
          사용하시는 이메일을 입력하시어 로그인 하시면 됩니다.
        </LoginGuide>
      </LoginPageMain>
    </LoginPageContainer>
  );
};

export default Login;
