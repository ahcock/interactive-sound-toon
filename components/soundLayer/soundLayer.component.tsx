import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import {
  SoundLayerSection,
  StickyAudioPlayerContainer,
} from "./soundLayer.styles";
import { SoundGridForCreator } from "../soundGridForCreator/soundGridForCreator.component";
import { FileUploadModal } from "../fileUploadModal/fileUploadModal.component";

type GridInfo = {
  column: string;
  row: string;
};

type OnPlusClick = (gridInfo: GridInfo, index: number) => void;

type ModalStatus = {
  isModalOpen: boolean;
  modalOpenedGridPosition: GridInfo;
};

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
    (JSX.Element | File)[] | undefined
  >();

  const [modalStatus, setModalStatus] = useState<ModalStatus>({
    isModalOpen: false,
    modalOpenedGridPosition: {
      column: "",
      row: "",
    },
  });

  console.log(modalStatus);

  // const [fileInfo, setFileInfo] = useState<{
  //   gridPosition: GridInfo;
  //   file: File | null;
  // }>({
  //   gridPosition: { row: "", column: "" },
  //   file: null,
  // });

  const inputRef = useRef<HTMLInputElement>(null);
  const clickedGridIndex = useRef<number>(0);

  useEffect(function registerSoundGrid() {
    const soundGrids: JSX.Element[] = [];
    for (let i = 1; i < 201; i++) {
      for (let j = 1; j < 11; j++) {
        soundGrids.push(
          <SoundGridForCreator
            index={soundGrids.length}
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

  const onPlusClick: OnPlusClick = (gridInfo, index) => {
    clickedGridIndex.current = index;
    setModalStatus({ modalOpenedGridPosition: gridInfo, isModalOpen: true });
    // inputRef.current?.click();
  };

  // TODO: input으로부터 받은 파일을 어떻게 soundGridItems배열에 대체 시킬 것인가?

  const onSoundUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && soundGridItems) {
      // setFileInfo({
      //   gridPosition: clickedGridInfo.current,
      //   file: event.currentTarget.files[0],
      // });

      const audioUrl = URL.createObjectURL(event.currentTarget.files[0]);

      const audioElement = (
        <audio src={audioUrl} key={audioUrl} controls>
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      );

      const clickedItem = soundGridItems[clickedGridIndex.current];

      const newItems = [...soundGridItems];
      newItems[clickedGridIndex.current] = audioElement;

      soundGridItems[clickedGridIndex.current] = audioElement;
      setSoundGridItems(newItems);
    }
  };

  return (
    <SoundLayerSection height={height} width={width} show>
      <StickyAudioPlayerContainer>
        <form>
          <input
            id="audio_uploader"
            ref={inputRef}
            type="file"
            accept="*"
            onChange={onSoundUpload}
            hidden
          />
        </form>
      </StickyAudioPlayerContainer>
      {soundGridItems}
      {modalStatus.isModalOpen && (
        <FileUploadModal
          setModalStatus={setModalStatus}
          modalStatus={modalStatus}
        />
      )}
    </SoundLayerSection>
  );
};

export { SoundLayer };
export type { OnPlusClick, ModalStatus };
