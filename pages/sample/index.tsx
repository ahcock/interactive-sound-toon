import { FC, useEffect, useRef, useState } from "react";
import { PageContainer } from "./samplePageIndex.styles";
import {
  GridInfo,
  SoundLayer,
} from "../../components/soundPart/soundLayer/soundLayer.component";
import ImageLayer from "../../components/imageLayer/imageLayer.component";
import clientPromise from "../../lib/mongodb";

interface ISampleImageType {
  src: string;
}

interface ITotalImageDimensionType {
  width: number;
  height: number;
}

interface IAudioInfoDocument {
  webtoonName: string;
  episode: number;
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

interface ISamplePageProps {
  audioInfoDocument: IAudioInfoDocument;
}

const Sample: FC<ISamplePageProps> = ({ audioInfoDocument }) => {
  const [imageList, setImageList] = useState<ISampleImageType[]>([]);
  const [imageLayerDimension, setImageLayerDimension] =
    useState<ITotalImageDimensionType>({ width: 0, height: 0 });

  const imagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(function fetchSampleImages() {
    fetch("/data/sampleImages.json")
      .then((res) => res.json())
      .then((images) => setImageList(images));
  }, []);

  useEffect(
    function getImageContainerDimension() {
      const container = imagesContainerRef.current;
      if (container) {
        const width = container.offsetWidth;
        const height = container.offsetHeight;

        setImageLayerDimension({ width, height });
      }
    },
    [imageList]
  );

  return imageList.length === 0 ? (
    <p>Loading Images</p>
  ) : (
    <PageContainer>
      <ImageLayer imageList={imageList} ref={imagesContainerRef} />
      <SoundLayer
        imageLayerDimension={imageLayerDimension}
        audioInfoDocument={audioInfoDocument}
      />
    </PageContainer>
  );
};

const getStaticProps = async () => {
  // TODO: 이 fetch 로직을 next api route로 옮겨야 하나? getStaticProps안에서 Next API route에 접근할 수 있나?
  const client = await clientPromise;
  const dbName = process.env.MONGODB_INTERACTIVE_WEEBTOON_DB ?? "";
  const collection = process.env.MONGODB_AUDIO_COLLECTION ?? "";
  const db = client.db(dbName);

  const document = await db.collection(collection).findOne({
    webtoonName: "jojo",
    episode: 1,
  });

  return {
    props: {
      audioInfoDocument: JSON.parse(JSON.stringify(document)),
    },
  };
};

export default Sample;
export { getStaticProps };
export type { ISampleImageType, IAudioInfoDocument };
