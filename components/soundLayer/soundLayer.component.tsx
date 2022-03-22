import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
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

  const [fileInfo, setFileInfo] = useState<{
    gridPosition: string;
    file: File | null;
  }>({
    gridPosition: "",
    file: null,
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
    //여기서 받아온 gridInfo를 useRef에 키벨류 값으로 저장 해 둔 후, 바로 아래 onInputChange에서 ref값을 받아와setFileInfo를 file(blob) 값과 함꼐 set 해준다
    inputRef.current?.click();
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setFileInfo({ gridPosition: "", file: event.currentTarget.files[0] });
    }
  };

  console.log(fileInfo);

  return (
    <SoundLayerSection height={height} width={width} show>
      <StickyAudioPlayerContainer>
        <form>
          <input
            id="audio_uploader"
            ref={inputRef}
            type="file"
            accept="*"
            onChange={onInputChange}
            hidden
          />
        </form>
      </StickyAudioPlayerContainer>
      {soundGridItems}
    </SoundLayerSection>
  );
};

export { SoundLayer };
