import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImagesContainer } from "./samplePageIndex.styles";

interface SampleImageType {
  src: string;
}

interface TotalImageDimensionType {
  width: number;
  height: number;
}

const Sample: FC = () => {
  const [imageList, setImageList] = useState<SampleImageType[]>([]);
  const [totalImageDimension, setTotalImageDimension] =
    useState<TotalImageDimensionType>();

  const imagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(function fetchSampleImages() {
    fetch("/data/sampleImages.json")
      .then((res) => res.json())
      .then((images) => setImageList(images));
  }, []);

  useEffect(
    function getImageContainerDimension() {
      const container = imagesContainerRef.current;
      console.log(container);
      if (container) {
        const width = container.offsetWidth;
        const height = container.offsetHeight;

        setTotalImageDimension({ width, height });
      }
    },
    [imagesContainerRef]
  );

  console.log(totalImageDimension);

  return imageList.length === 0 ? (
    <p>Loading Images</p>
  ) : (
    <ImagesContainer ref={imagesContainerRef}>
      {imageList.map((image, index) => (
        <Image
          key={index}
          src={image.src}
          width={690}
          height={1600}
          alt="webtoon image"
        />
      ))}
    </ImagesContainer>
  );
};

export default Sample;
