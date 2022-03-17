import { FC, useEffect, useRef, useState } from "react";
import {
  SoundLayerSection,
  StickyAudioPlayerContainer,
} from "./soundLayer.styles";
import { SoundGridForCreator } from "../soundGridForCreator/soundGridForCreator.component";

interface SoundLayerProps {
  imageLayerDimension: {
    height: number;
    width: number;
  };
}

const SoundLayer: FC<SoundLayerProps> = ({
  imageLayerDimension: { height, width },
}) => {
  const [soundGridItems, setSoundGridItems] = useState<
    JSX.Element[] | undefined
  >();

  const [fileInfo, setFileInfo] = useState({
    gridPosition: "",
    file: new Blob(),
  });

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(function registerSoundGrid() {
    const soundGrids = [];
    for (let i = 1; i < 201; i++) {
      for (let j = 1; j < 11; j++) {
        soundGrids.push(
          <SoundGridForCreator
            key={`row${i}column${j}`}
            gridPosition={{ row: `${i} / ${i + 1}`, column: `${j} / ${j + 1}` }}
            showGrid
            onPlusClick={onPlusClick}
          />
        );
      }
    }

    setSoundGridItems(soundGrids);
  }, []);

  const onPlusClick = (info: string) => {
    setFileInfo({ gridPosition: info, file: new Blob() });
    inputRef.current?.click();
  };
  return (
    <SoundLayerSection height={height} width={width} show>
      <StickyAudioPlayerContainer>
        <input
          ref={inputRef}
          type="file"
          accept="*"
          onChange={(e) => console.log(e)}
        />
      </StickyAudioPlayerContainer>
      {soundGridItems}
    </SoundLayerSection>
  );
};

export { SoundLayer };
