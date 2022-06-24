import { FC } from "react";
import {
  StyledAnchor,
  ThumbnailContainer,
  WebtoonCardContainer,
  WebtoonCardInnerContainer,
  WebtoonThumbnail,
  WebtoonTitle,
} from "./webtoonCard.styles";

const WebtoonCardComponent: FC = () => {
  return (
    <WebtoonCardContainer href="/" passHref>
      <WebtoonCardInnerContainer>
        <StyledAnchor>
          <WebtoonTitle>{"내일의 조 1화"}</WebtoonTitle>
        </StyledAnchor>
        <ThumbnailContainer>
          <WebtoonThumbnail
            src="https://interactive-sound-toon.s3.ap-northeast-2.amazonaws.com/images/jojo/ep1/thumbnail_jojo_1.jpeg"
            alt="웹툰 대표 이미지"
            layout="fill"
          />
        </ThumbnailContainer>
      </WebtoonCardInnerContainer>
    </WebtoonCardContainer>
  );
};

export { WebtoonCardComponent };
