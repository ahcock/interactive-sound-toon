import { FC, useEffect, useRef, useState } from "react";
import { PageContainer } from "./samplePageIndex.styles";
import {
  GridInfo,
  SoundLayer,
} from "../../components/soundPart/soundLayer/soundLayer.component";
import ImageLayer from "../../components/imageLayer/imageLayer.component";
import { mongoFindImageInfoDocument } from "../../lib/mongo/mongoFindImageInfoDocument";
import { mongoFindAudioInfoDocument } from "../../lib/mongo/mongoFindAudioInfoDocument";

interface ISampleImageType {
  src: string;
}

interface ITotalImageDimensionType {
  width: number;
  height: number;
}

interface IAudioInfoDocument {
  webtoonName: string;
  episode: string;
  audioInfo: {
    src: string;
    index: number;
    gridPosition: GridInfo;
    title: string;
    fileName?: string;
    volume?: number;
    action?: string;
  }[];
}

interface IImageInfoDocument {
  webtoonName: string;
  episode: string;
  sources: string[];
}

interface ISamplePageProps {
  audioInfoDocument: IAudioInfoDocument;
  imageInfoDocument: IImageInfoDocument;
}

const Sample: FC<ISamplePageProps> = ({
  audioInfoDocument,
  imageInfoDocument,
}) => {
  const [imageLayerDimension, setImageLayerDimension] =
    useState<ITotalImageDimensionType>({ width: 0, height: 0 });

  const imagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(
    function getImageContainerDimension() {
      const container = imagesContainerRef.current;
      if (container) {
        const width = container.offsetWidth;
        const height = container.offsetHeight;

        setImageLayerDimension({ width, height });
      }
    },
    [imageInfoDocument.sources]
  );

  return !imageInfoDocument ? (
    <p>Loading Images</p>
  ) : (
    <PageContainer>
      <ImageLayer
        imageSources={imageInfoDocument.sources}
        ref={imagesContainerRef}
      />
      <SoundLayer
        imageLayerDimension={imageLayerDimension}
        audioInfoDocument={audioInfoDocument}
      />
    </PageContainer>
  );
};

const getStaticProps = async () => {
  // TODO 이 webtoonName, episode values를 URL에서 추출해 전역변수에 두어야 하나?
  const webtoonName = "jojo";
  const episode = "1";

  // TODO: 아래 2개의 fetch를 promise all로 모아서 한번에 return해 주어야겠다.

  const audioInfoDocument = await mongoFindAudioInfoDocument(
    webtoonName,
    episode
  );

  const imageInfoDocument = await mongoFindImageInfoDocument(
    webtoonName,
    episode
  );

  return {
    props: {
      audioInfoDocument,
      imageInfoDocument,
    },
  };
};

export default Sample;
export { getStaticProps };
export type { ISampleImageType, IAudioInfoDocument, IImageInfoDocument };
