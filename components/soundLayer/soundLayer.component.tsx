import { FC, useEffect, useRef, useState } from "react";
import {
  AudioContainer,
  SoundLayerSection,
  StickyAudioPlayerContainer,
} from "./soundLayer.styles";
import { SoundGridForCreator } from "../soundGridForCreator/soundGridForCreator.component";
import { FileUploadModal } from "../fileUploadModal/fileUploadModal.component";

type GridInfo = {
  column: string;
  row: string;
};

type UploadedAudioInfo = { name: string; file: File };

type OnPlusClick = (
  gridInfo: GridInfo,
  index: number,
  uploadedAudio?: UploadedAudioInfo
) => void;
type OnAudioUpload = (
  title: string,
  file: File,
  uploadedAudio?: UploadedAudioInfo
) => void;

type ModalStatus = {
  isModalOpen: boolean;
  modalOpenedGridPosition: GridInfo;
  uploadedAudio?: UploadedAudioInfo;
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

  const audioRefs: {
    [key: string]: HTMLAudioElement;
  } = {};

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

  useEffect(() => {
    if ("sound" in audioRefs) {
      audioRefs?.sound?.play();
    }
  });

  const onPlusClick: OnPlusClick = (gridInfo, index, uploadedAudio) => {
    console.log("눌림", uploadedAudio);
    clickedGridIndex.current = index;
    setModalStatus({
      modalOpenedGridPosition: gridInfo,
      isModalOpen: true,
      ...(uploadedAudio && { uploadedAudio }),
    });

    console.log({
      modalOpenedGridPosition: gridInfo,
      isModalOpen: true,
      ...(uploadedAudio && uploadedAudio),
    });
  };

  const onSoundUpload: OnAudioUpload = (title, file) => {
    // TODO: 어떻게 업로드된 사운드를 클릭했을 때, 모달이 열리며, 이미 업로드 되있던 사운드 title, file자체를 보여줄까?
    const audioUrl = URL.createObjectURL(file);
    const audioElement = (
      <SoundGridForCreator
        index={clickedGridIndex.current}
        key={title + file.name}
        gridPosition={modalStatus.modalOpenedGridPosition}
        showGrid
        onPlusClick={onPlusClick}
      >
        <AudioContainer
          onClick={() =>
            onPlusClick(
              modalStatus.modalOpenedGridPosition,
              clickedGridIndex.current,
              { name: title, file }
            )
          }
        >
          {title}
          <audio
            src={audioUrl}
            key={audioUrl}
            autoPlay
            ref={(audioNode) => {
              if (!!audioNode) {
                audioRefs[title] = audioNode;
              }
            }}
          />
        </AudioContainer>
      </SoundGridForCreator>
    );

    if (!!soundGridItems) {
      const newSoundGridItems = [...soundGridItems];
      newSoundGridItems[clickedGridIndex.current] = audioElement;
      setSoundGridItems(newSoundGridItems);
    }
  };

  return (
    <SoundLayerSection height={height} width={width} show>
      <StickyAudioPlayerContainer></StickyAudioPlayerContainer>
      {soundGridItems}
      {modalStatus.isModalOpen && (
        <FileUploadModal
          setModalStatus={setModalStatus}
          modalStatus={modalStatus}
          onSoundUpload={onSoundUpload}
        />
      )}
    </SoundLayerSection>
  );
};

export { SoundLayer };
export type {
  OnPlusClick,
  OnAudioUpload,
  ModalStatus,
  GridInfo,
  UploadedAudioInfo,
};
