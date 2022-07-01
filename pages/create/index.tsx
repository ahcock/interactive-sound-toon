import { FC } from "react";
import { WebtoonCard } from "../../components/webtoonCard/webtoonCard.component";
import { SoundWebtoonsContainer } from "../../styles/pageComponentStyles/soundWebtoonsPage.styles";
import { mongoFindAllImageInfo } from "../../lib/mongo/mongoFindAllImageInfo";
import { GetStaticProps } from "next";

interface IWebtoonCardInfo {
  _id: string;
  title: string;
  thumbnail: string;
  webtoonName: string;
  episode: string;
}

interface ISoundWebtoonsProps {
  allImageInfoForWebtoonCard: IWebtoonCardInfo[];
}

const SoundWebtoons: FC<ISoundWebtoonsProps> = ({
  allImageInfoForWebtoonCard,
}) => {
  return (
    <SoundWebtoonsContainer>
      {allImageInfoForWebtoonCard.map((webtoonCardInfo) => (
        <WebtoonCard
          key={webtoonCardInfo._id}
          webtoonCardInfo={webtoonCardInfo}
        />
      ))}
    </SoundWebtoonsContainer>
  );
};

const getStaticProps: GetStaticProps = async () => {
  const allImageInfoForWebtoonCard = await mongoFindAllImageInfo();
  return {
    props: {
      allImageInfoForWebtoonCard,
      isPagePrivate: true,
    },
  };
};

export default SoundWebtoons;
export { getStaticProps };
export type { IWebtoonCardInfo };
