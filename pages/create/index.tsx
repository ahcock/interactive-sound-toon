import { FC } from "react";
import { WebtoonCard } from "../../components/webtoonCard/webtoonCard.component";
import { SoundWebtoonsContainer } from "../../styles/pageComponentStyles/soundWebtoonsPage.styles";
import { mongoFindAllImageInfo } from "../../lib/mongo/mongoFindAllImageInfo";
import { GetServerSideProps, GetStaticProps } from "next";

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

const Create: FC<ISoundWebtoonsProps> = ({ allImageInfoForWebtoonCard }) => {
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

const getServerSideProps: GetServerSideProps = async () => {
  const allImageInfoForWebtoonCard = await mongoFindAllImageInfo();
  return {
    props: {
      allImageInfoForWebtoonCard,
      isPagePrivate: true,
    },
  };
};

export default Create;
export { getServerSideProps };
export type { IWebtoonCardInfo };
