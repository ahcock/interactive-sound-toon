import { FC, useEffect, useRef, useState } from "react";
import { PageContainer } from "./samplePageIndex.styles";
import { SoundLayer } from "../../components/soundPart/soundLayer/soundLayer.component";
import ImageLayer from "../../components/imageLayer/imageLayer.component";
import clientPromise from "../../lib/mongodb";

interface SampleImageType {
  src: string;
}

interface TotalImageDimensionType {
  width: number;
  height: number;
}

const Sample: FC<{ data: any }> = ({ data }) => {
  console.log(data);
  const [imageList, setImageList] = useState<SampleImageType[]>([]);
  const [imageLayerDimension, setImageLayerDimension] =
    useState<TotalImageDimensionType>({ width: 0, height: 0 });

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
      <SoundLayer imageLayerDimension={imageLayerDimension} />
    </PageContainer>
  );
};

const getStaticProps = async () => {
  const client = await clientPromise;
  const dbName = process.env.MONGODB_INTERACTIVE_WEEBTOON_DB ?? "";
  const collection = process.env.MONGODB_AUDIO_COLLECTION ?? "";
  const db = client.db(dbName);

  const document = await db
    .collection(collection)
    .find({
      webtoonName: "jojo",
      episode: 1,
    })
    .toArray();

  return {
    props: {
      data: JSON.parse(JSON.stringify(document)),
    },
  };
};

export default Sample;
export { getStaticProps };
export type { SampleImageType };
