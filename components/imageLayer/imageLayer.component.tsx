import { FC, forwardRef } from "react";
import { ImageLayerSection } from "./imageLayer.styles";
import { SampleImageType } from "../../pages/sample";
import Image from "next/image";

interface ImageLayerProps {
  imageList: SampleImageType[];
}

const ImageLayer = forwardRef<HTMLDivElement, ImageLayerProps>(
  ({ imageList }, ref) => {
    return (
      <ImageLayerSection ref={ref}>
        {imageList.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            width={690}
            height={1600}
            alt="webtoon image"
          />
        ))}
      </ImageLayerSection>
    );
  }
);

ImageLayer.displayName = "ImageLayer";
export default ImageLayer;
