import { FC } from "react";
import { IAudioInfoDocument } from "../sample";
import { WebtoonCardComponent } from "../../components/webtoonCard/webtoonCard.component";
import { SoundWebtoonsContainer } from "./soundWebtoonsIndex.styles";
import { mongoFindAllSoundWebtoons } from "../../lib/mongo/mongoFindAllSoundWebtoons";

interface ISoundWebtoonsProps {
  allSoundWebtoons: IAudioInfoDocument[];
}

const SoundWebtoons: FC<ISoundWebtoonsProps> = ({ allSoundWebtoons }) => {
  return (
    <SoundWebtoonsContainer>
      <WebtoonCardComponent>헬로</WebtoonCardComponent>
    </SoundWebtoonsContainer>
  );
};

const getStaticProps = async () => {
  const allSoundWebtoons = await mongoFindAllSoundWebtoons();
  return {
    props: {
      allSoundWebtoons,
    },
  };
};

export default SoundWebtoons;
export { getStaticProps };
