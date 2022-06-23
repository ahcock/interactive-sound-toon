import { FC } from "react";
import { IAudioInfoDocument } from "../sample";

interface ISoundWebtoonsProps {
  audioInfoDocument: IAudioInfoDocument;
}

const SoundWebtoons: FC<ISoundWebtoonsProps> = ({ audioInfoDocument }) => {
  return <div></div>;
};

const getStaticProps = async () => {
  const webtoonName = "jojo";
  const episode = 1;

  const audioInfoDocument = await fetch(
    `http://localhost:3000/api/mongoFindAudioInfoDocument?webtoonName=${webtoonName}&episode=${episode}`
  ).then((res) => res.json());

  return {
    props: {
      audioInfoDocument,
    },
  };
};

export default SoundWebtoons;
export { getStaticProps };
