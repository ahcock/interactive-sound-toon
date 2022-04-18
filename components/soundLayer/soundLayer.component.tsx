import { FC, useEffect, useRef, useState } from "react";
import {
  AudioContainer,
  SoundLayerSection,
  StyledAudio,
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

type OnAudioDelete = (gridPosition: GridInfo) => void;

type ModalStatus = {
  isModalOpen: boolean;
  modalOpenedGridPosition: GridInfo;
  uploadedAudio?: UploadedAudioInfo;
  clickedGridIndex: number;
};

interface SoundLayerProps {
  imageLayerDimension: {
    height: number;
    width: number;
  };
}

interface SoundGridData {
  index: number;
  key: string;
  gridPosition: GridInfo;
  showGrid: boolean;
  onPlusClick: OnPlusClick;
  audioInfo?: {
    src: string;
    title: string;
    key: string;
    onAudioContainerClick: () => void;
  };
}

const SoundLayer: FC<SoundLayerProps> = ({
  imageLayerDimension: { height, width },
}) => {
  const [soundGridData, setSoundGridData] = useState<SoundGridData[]>([]);

  const [modalStatus, setModalStatus] = useState<ModalStatus>({
    isModalOpen: false,
    modalOpenedGridPosition: {
      column: "",
      row: "",
    },
    clickedGridIndex: 0,
  });

  const audioRef = useRef<{ [key: string]: HTMLAudioElement }>({});

  useEffect(function registerSoundGrid() {
    const soundGridInfo: SoundGridData[] = [];

    for (let i = 1; i < 201; i++) {
      for (let j = 1; j < 11; j++) {
        soundGridInfo.push({
          index: soundGridInfo.length,
          key: `row${i}column${j}`,
          gridPosition: { row: `${i} / ${i + 1}`, column: `${j} / ${j + 1}` },
          showGrid: true,
          onPlusClick: onPlusClick,
        });
      }
    }

    setSoundGridData(soundGridInfo);
  }, []);

  useEffect(() => {
    if (!!audioRef && !!audioRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const soundName = entry.target.getAttribute("data-name");
            if (entry.isIntersecting && !!soundName) {
              audioRef.current[soundName].play();
            }
          });
        },
        { root: null, rootMargin: "0px", threshold: 0 }
      );

      if (audioRef) {
        Object.values(audioRef.current).forEach((element) => {
          observer.observe(element);
        });
      }
    }
  }, [soundGridData]);

  const refCallback = (audioNode: HTMLAudioElement) => {
    if (!!audioNode) {
      const soundName = audioNode.getAttribute("data-name");

      if (!!soundName) {
        audioRef.current[soundName] = audioNode;
      }
    }
  };

  const onPlusClick: OnPlusClick = (gridInfo, index, uploadedAudio) => {
    setModalStatus({
      modalOpenedGridPosition: gridInfo,
      isModalOpen: true,
      clickedGridIndex: index,
      ...(uploadedAudio && { uploadedAudio }),
    });
  };

  const onSoundUpload: OnAudioUpload = (title, file) => {
    const audioUrl = URL.createObjectURL(file);

    const soundGridDataWithAudioInfo: SoundGridData = {
      index: modalStatus.clickedGridIndex,
      key: title + file.name,
      gridPosition: modalStatus.modalOpenedGridPosition,
      showGrid: true,
      onPlusClick: onPlusClick,
      audioInfo: {
        title: title,
        src: audioUrl,
        key: audioUrl,
        onAudioContainerClick: () =>
          onPlusClick(
            modalStatus.modalOpenedGridPosition,
            modalStatus.clickedGridIndex,
            { name: title, file }
          ),
      },
    };

    if (!!soundGridData) {
      const newSoundGridData = [...soundGridData];
      newSoundGridData[modalStatus.clickedGridIndex] =
        soundGridDataWithAudioInfo;
      setSoundGridData(newSoundGridData);
    }
  };

  const onAudioDelete: OnAudioDelete = (gridPosition: GridInfo) => {
    if (!!soundGridData) {
      const newSoundGridData = [...soundGridData];
      newSoundGridData[modalStatus.clickedGridIndex] = {
        index: modalStatus.clickedGridIndex,
        key: `row${gridPosition.row[0]}column${gridPosition.column[0]}`,
        gridPosition: gridPosition,
        showGrid: true,
        onPlusClick: onPlusClick,
      };

      setSoundGridData(newSoundGridData);
    }
  };

  return (
    <SoundLayerSection height={height} width={width} show>
      {soundGridData.map((soundGridProp) => {
        const { index, key, gridPosition, showGrid, onPlusClick, audioInfo } =
          soundGridProp;

        return (
          <SoundGridForCreator
            index={index}
            key={key}
            gridPosition={gridPosition}
            showGrid={showGrid}
            onPlusClick={onPlusClick}
          >
            {audioInfo && (
              <AudioContainer onClick={audioInfo.onAudioContainerClick}>
                {audioInfo.title}
                <StyledAudio
                  ref={refCallback}
                  data-name={audioInfo.title}
                  controls
                >
                  <source src={audioInfo.src} />
                </StyledAudio>
              </AudioContainer>
            )}
          </SoundGridForCreator>
        );
      })}
      {modalStatus.isModalOpen && (
        <FileUploadModal
          setModalStatus={setModalStatus}
          modalStatus={modalStatus}
          onSoundUpload={onSoundUpload}
          onAudioDelete={onAudioDelete}
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
  OnAudioDelete,
};
