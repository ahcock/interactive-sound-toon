import { FC } from "react";
import {
  StyledAnchor,
  ThumbnailContainer,
  WebtoonCardContainer,
  WebtoonCardInnerContainer,
  WebtoonThumbnail,
  WebtoonTitle,
} from "./webtoonCard.styles";
import { IWebtoonCardInfo } from "../../pages/soundWebtoons";

interface IWebtoonCardProps {
  webtoonCardInfo: IWebtoonCardInfo;
}

const WebtoonCard: FC<IWebtoonCardProps> = ({ webtoonCardInfo }) => {
  const { title, thumbnail, webtoonName, episode } = webtoonCardInfo;

  // TODO: 아래 href의 url을 route 파일 같은 곳에서 한곳에서 관리해야 함
  return (
    <WebtoonCardContainer
      href={`/soundWebtoons/${webtoonName}/${episode}`}
      passHref
    >
      <WebtoonCardInnerContainer>
        <StyledAnchor>
          <WebtoonTitle>{title}</WebtoonTitle>
        </StyledAnchor>
        <ThumbnailContainer>
          <WebtoonThumbnail
            src={thumbnail}
            alt={`${title} 대표 이미지`}
            layout="fill"
          />
        </ThumbnailContainer>
      </WebtoonCardInnerContainer>
    </WebtoonCardContainer>
  );
};

export { WebtoonCard };
