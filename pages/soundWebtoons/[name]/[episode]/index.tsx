import { FC, useEffect, useRef, useState } from "react";
import { mongoFindAudioInfoDocument } from "../../../../lib/mongo/mongoFindAudioInfoDocument";
import { mongoFindImageInfoDocument } from "../../../../lib/mongo/mongoFindImageInfoDocument";
import { mongoFindAllSoundWebtoons } from "../../../../lib/mongo/mongoFindAllSoundWebtoons";
import ImageLayer from "../../../../components/imageLayer/imageLayer.component";
import {
  AdditionalAction,
  GridInfo,
} from "../../../../components/soundPart/soundLayer/soundLayer.component";
import { PageContainer } from "../../../../styles/pageComponentStyles/soundWebtoonPage.styles";
import { GetStaticProps } from "next";
import { SoundLayerForUsers } from "../../../../components/soundPart/soundLayerForUsers/soundLayerForUsers.component";
import { debounce } from "lodash";

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
    volume: number;
    action?: AdditionalAction;
  }[];
}

interface IImageInfoDocument {
  webtoonName: string;
  episode: string;
  sources: string[];
}

interface ISoundWebtoonProps {
  audioInfoDocument: IAudioInfoDocument;
  imageInfoDocument: IImageInfoDocument;
}

// TODO: 사운드 웹툰 페이지, Create 인덱스 페이지 합치기

const SoundWebtoon: FC<ISoundWebtoonProps> = ({
  audioInfoDocument,
  imageInfoDocument,
}) => {
  const [imageLayerDimension, setImageLayerDimension] =
    useState<ITotalImageDimensionType>({ width: 0, height: 0 });

  const imagesContainerRef = useRef<HTMLDivElement>(null);

  const resizeObserverCallback = (entries: ResizeObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.contentBoxSize) {
        const { width, height } = entry.contentRect;
        setImageLayerDimension({
          width,
          height,
        });
      }
    });
  };

  useEffect(
    function connectResizeObserver() {
      if (!imagesContainerRef.current) return;

      const resizeObserver = new ResizeObserver(
        debounce(resizeObserverCallback, 150)
      );

      resizeObserver.observe(imagesContainerRef.current);

      return () => resizeObserver.disconnect();
    },
    [
      imagesContainerRef?.current?.offsetWidth,
      imagesContainerRef?.current?.offsetHeight,
    ]
  );

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
      <SoundLayerForUsers
        imageLayerDimension={imageLayerDimension}
        audioInfoDocument={audioInfoDocument}
      />
    </PageContainer>
  );
};

const getStaticPaths = async () => {
  const allDocuments = await mongoFindAllSoundWebtoons();

  const paths = allDocuments.map((webtoon: IAudioInfoDocument) => ({
    params: { name: webtoon.webtoonName, episode: webtoon.episode },
  }));

  return { paths, fallback: false };
};

const getStaticProps: GetStaticProps = async ({ params }) => {
  const webtoonName = typeof params?.name === "string" ? params.name : "";
  const episode = typeof params?.episode === "string" ? params.episode : "";

  const [audioInfoDocument, imageInfoDocument] = await Promise.all([
    mongoFindAudioInfoDocument(webtoonName, episode),
    mongoFindImageInfoDocument(webtoonName, episode),
  ]);

  return {
    props: {
      audioInfoDocument,
      imageInfoDocument,
    },
  };
};

export default SoundWebtoon;
export { getStaticPaths, getStaticProps };
export type {
  ITotalImageDimensionType,
  IAudioInfoDocument,
  IImageInfoDocument,
  ISoundWebtoonProps,
};
