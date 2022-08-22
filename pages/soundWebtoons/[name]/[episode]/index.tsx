import { FC, useEffect, useRef, useState } from "react";
import { mongoFindAudioInfoDocument } from "../../../../lib/mongo/mongoFindAudioInfoDocument";
import { mongoFindImageInfoDocument } from "../../../../lib/mongo/mongoFindImageInfoDocument";
import { ImageLayer } from "../../../../components/imageLayer/imageLayer.component";
import {
  AdditionalAction,
  GridInfo,
} from "../../../../components/soundPart/soundLayer/soundLayer.component";
import { PageContainer } from "../../../../styles/pageComponentStyles/soundWebtoonPage.styles";
import { GetServerSideProps } from "next";
import { SoundLayerForUsers } from "../../../../components/soundPart/soundLayerForUsers/soundLayerForUsers.component";
import { debounce } from "lodash";
import { ImagerLayerLinkContainer } from "../../../../components/imageLayer/imageLayer.styles";
import { JSSlideUpLink } from "../../../../components/reusable/JSSlideUpLink/JSSlideUpLink.component";

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

// TODO: 사운드 웹툰 페이지, Create 인덱스 페이지 코드 합치기. 비슷한 구조로 인해 코드를 합치는 방법을 모색해 봐야 할 듯.

const SoundWebtoon: FC<ISoundWebtoonProps> = ({
  audioInfoDocument,
  imageInfoDocument,
}) => {
  const [imageLayerDimension, setImageLayerDimension] =
    useState<ITotalImageDimensionType>({ width: 0, height: 0 });
  const [isLinkIntersecting, setIsLinkIntersecting] = useState(false);

  const linkRef = useRef<HTMLAnchorElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsLinkIntersecting(entry.isIntersecting);
    });

    if (linkRef.current) observer.observe(linkRef.current);
  }, []);

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
      <ImagerLayerLinkContainer>
        <JSSlideUpLink
          href="/create/jojo/1"
          passHref
          ref={linkRef}
          isIntersecting={isLinkIntersecting}
        >
          사운드가 어떻게 디자인 되어있는지 보러 가기
        </JSSlideUpLink>
      </ImagerLayerLinkContainer>
    </PageContainer>
  );
};

const getServerSideProps: GetServerSideProps = async ({ params }) => {
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
export { getServerSideProps };
export type {
  ITotalImageDimensionType,
  IAudioInfoDocument,
  IImageInfoDocument,
  ISoundWebtoonProps,
};
