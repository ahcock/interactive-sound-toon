import type { NextPage } from "next";
import Image from "next/image";
import {
  BackgroundGradient,
  IndexPageContainer,
  IndexPageImageContainer,
  IndexPageSection,
  IndexSubtitle,
  IndexTextSection,
  IndexTitle,
} from "../styles/pageComponentStyles/indexPage.styles";

const Home: NextPage = () => {
  return (
    <IndexPageContainer>
      <IndexPageSection>
        <IndexPageImageContainer>
          <Image
            src="/images/index_background.jpg"
            alt="첫 페이지 배경 그림"
            layout="fill"
          />
          <BackgroundGradient />
        </IndexPageImageContainer>

        <IndexTextSection>
          <IndexTitle>웹툰과 사운드가 만난다면</IndexTitle>
          <IndexSubtitle>
            주인공의 발자국 소리를 나도 들을 수 있다면
          </IndexSubtitle>
          <IndexSubtitle>떨어지는 빗소리를 나도 들을 수 있다면</IndexSubtitle>
        </IndexTextSection>
      </IndexPageSection>
    </IndexPageContainer>
  );
};

export default Home;
