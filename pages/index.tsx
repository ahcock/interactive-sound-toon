import type { NextPage } from "next";
import Image from "next/image";
import sampleImage0 from "/public/images/index_sample_0.jpeg";
import sampleImage1 from "/public/images/index_sample_1.jpeg";
import {
  BackgroundGradient,
  IndexPageContainer,
  IndexPageImageContainer,
  IndexPageSection,
  IndexSubtitle,
  IndexTextSection,
  IndexTitle,
} from "../styles/pageComponentStyles/indexPage.styles";
import { useEffect, useRef, useState } from "react";
import { JSSlideUpLink } from "../components/reusable/JSSlideUpLink/JSSlideUpLink.component";

const Home: NextPage = () => {
  const [isLinkIntersecting, setIsLinkIntersecting] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsLinkIntersecting(entry.isIntersecting);
    });

    if (linkRef.current) observer.observe(linkRef.current);
  }, []);

  return (
    <IndexPageContainer>
      <IndexPageSection>
        <IndexPageImageContainer>
          <Image
            src="/images/index_background.jpg"
            alt="첫 페이지 배경 그림"
            layout="fill"
            priority
          />
          <BackgroundGradient />
          <IndexTextSection>
            <IndexTitle>웹툰과 사운드가 만난다면</IndexTitle>
            <IndexSubtitle>
              주인공의 발자국 소리를 나도 들을 수 있다면
            </IndexSubtitle>
            <IndexSubtitle>떨어지는 빗소리를 나도 들을 수 있다면</IndexSubtitle>
          </IndexTextSection>
        </IndexPageImageContainer>
      </IndexPageSection>

      <IndexPageSection>
        <IndexTextSection>
          <IndexSubtitle fontSize="2rem">만약에 이런 웹툰에서</IndexSubtitle>
          <IndexSubtitle fontSize="2rem">
            상상을 더할 소리가 날 수 있다면
          </IndexSubtitle>
        </IndexTextSection>
      </IndexPageSection>

      <IndexPageSection>
        <Image src={sampleImage0} alt="첫번째 샘플 이미지" priority />
        <Image alt="두번째 샘플 이미지" src={sampleImage1} priority />
      </IndexPageSection>

      <IndexPageSection>
        <JSSlideUpLink
          href="/soundWebtoons"
          isIntersecting={isLinkIntersecting}
          ref={linkRef}
        >
          사운드 웹툰 보러 가기
        </JSSlideUpLink>
      </IndexPageSection>
    </IndexPageContainer>
  );
};

export default Home;
