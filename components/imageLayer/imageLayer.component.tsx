import { forwardRef } from "react";
import { ImageLayerSection } from "./imageLayer.styles";
import { IImageInfoDocument } from "../../pages/create/[name]/[episode]";
import Image from "next/image";

interface ImageLayerProps {
  imageSources: IImageInfoDocument["sources"];
}

const ImageLayer = forwardRef<HTMLDivElement, ImageLayerProps>(
  ({ imageSources }, ref) => {
    return (
      <ImageLayerSection ref={ref}>
        {imageSources.map((src, index) => (
          <Image
            priority
            key={src + index}
            src={src}
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
export { ImageLayer };
