import { FC } from "react";
import {
  StyledAnchor,
  StyledImage,
  ThumbnailContainer,
  WebtoonTitle,
} from "./webtoonCard.styles";
import { IWebtoonCardInfo } from "../../pages/create";
import Link from "next/link";

interface IWebtoonCardProps {
  webtoonCardInfo: IWebtoonCardInfo;
  forUsers?: boolean;
}

const WebtoonCard: FC<IWebtoonCardProps> = ({
  webtoonCardInfo,
  forUsers = false,
}) => {
  const { title, thumbnail, webtoonName, episode } = webtoonCardInfo;
  const baseRoute = forUsers ? "soundWebtoons" : "create";

  // TODO: 아래 href의 url을 route 파일 같은 곳에서 한곳에서 관리해야 함. create, soundWebtoons 페이지 별로 base route 따로 지정해야 함
  return (
    <Link href={`/${baseRoute}/${webtoonName}/${episode}`} passHref>
      <StyledAnchor>
        <WebtoonTitle>{title}</WebtoonTitle>
        <ThumbnailContainer>
          <StyledImage
            src={thumbnail}
            alt={`${title} 대표 이미지`}
            height={100}
            width={100}
            layout="responsive"
            objectFit="cover"
            objectPosition="50% 50%"
          />
        </ThumbnailContainer>
      </StyledAnchor>
    </Link>
  );
};

export { WebtoonCard };
