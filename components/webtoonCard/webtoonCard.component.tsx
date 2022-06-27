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
