import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  ButtonContainer,
  InputContainer,
  LoginPageContainer,
  LoginPageMain,
  LoginPageTitle,
  LoginPageTitleContainer,
} from "../styles/pageComponentStyles/loginPage.styles";
import { JSInput } from "../components/reusable/JSInput/JSInput.component";
import { magicClient } from "../lib/magicClient";
import { JSButton } from "../components/reusable/JSButton/JSButton.component";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");

  const router = useRouter();

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
      </LoginPageMain>
    </LoginPageContainer>
  );
};

export default Login;
