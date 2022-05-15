import { FC, useEffect, useRef, useState } from "react";
import {
  SoundContainer,
  SoundLayerSection,
  StyledAudio,
} from "./soundLayer.styles";
import { GridForSoundCreator } from "../soundGridForCreator/soundGridForCreator.component";
import { SoundSaveModal } from "../fileUploadModal/fileUploadModal.component";

type GridInfo = {
  column: string;
  row: string;
};

type SavedSound = { name: string; file: File };

type OnGridClick = (gridInfo: GridInfo, index: number) => void;

type OnSavedSoundClick = (
  gridInfo: GridInfo,
  index: number,
  savedSound: SavedSound
) => void;

type OnSoundSave = (
  title: string,
  file?: File,
  savedSound?: SavedSound
) => void;

type OnSoundDelete = (gridPosition: GridInfo) => void;

type OnAdditionalEventSave = (soundName: string, action: string) => void;

interface SoundModalStatus {
  isModalOpen: boolean;
  modalOpenedGridPosition: GridInfo;
  savedSound?: SavedSound;
  clickedGridIndex: number;
}

interface SoundRefs {
  [key: string]: HTMLAudioElement;
}

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
  onGridClick: OnGridClick;
  soundInfo?: {
    src: string;
    title: string;
    key: string;
    onSoundContainerClick: () => void;
  };
}

// TODO: 등록된 사운드 어딘가에 저장하기
// TODO: 저장된 사운드 불러오기, 렌더링 하기
// TODO: 서버에 사운드를 저장하기
// TODO: 서버에서 사운드를 불러오기, 렌더링 하기
// TODO: 데이터 베이스 스키마는 어떻게 짤 것인가?
// TODO: 회차별로 짤 것인가?

const SoundLayer: FC<SoundLayerProps> = ({
  imageLayerDimension: { height, width },
}) => {
  const [soundGridData, setSoundGridData] = useState<SoundGridData[]>([]);
  const [soundModalStatus, setSoundModalStatus] = useState<SoundModalStatus>({
    isModalOpen: false,
    modalOpenedGridPosition: {
      column: "",
      row: "",
    },
    clickedGridIndex: 0,
  });

  const [savedSoundGridData, setSavedSoundGridData] = useState<SoundGridData[]>(
    []
  );

  const soundRefs = useRef<SoundRefs>({});

  // TODO: 사운드 저장시 필요한 것 아래 push되는 항목에서 onGridClick. showGrid 빼고

  useEffect(function registerSoundGrid() {
    const soundGridInfo: SoundGridData[] = [];

    for (let i = 1; i < 201; i++) {
      for (let j = 1; j < 11; j++) {
        soundGridInfo.push({
          index: soundGridInfo.length,
          key: `row${i}column${j}`,
          gridPosition: { row: `${i} / ${i + 1}`, column: `${j} / ${j + 1}` },
          showGrid: true,
          onGridClick: onGridClick,
        });
      }
    }

    setSoundGridData(soundGridInfo);
  }, []);

  useEffect(
    function setIntersectionObserver() {
      if (!!soundRefs && !!soundRefs.current) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const soundName = entry.target.getAttribute("data-name");
              if (entry.isIntersecting && !!soundName) {
                soundRefs.current[soundName].play();
              }
            });
          },
          { root: null, rootMargin: "0px", threshold: 0 }
        );

        if (soundRefs) {
          Object.values(soundRefs.current).forEach((element) => {
            observer.observe(element);
          });
        }
      }
    },
    [soundGridData]
  );

  const refCallback = (audioNode: HTMLAudioElement) => {
    if (!!audioNode) {
      const soundName = audioNode.getAttribute("data-name");

      if (!!soundName) {
        soundRefs.current[soundName] = audioNode;
      }
    }
  };

  const onGridClick: OnGridClick = (gridInfo, index) => {
    setSoundModalStatus({
      modalOpenedGridPosition: gridInfo,
      isModalOpen: true,
      clickedGridIndex: index,
    });
  };

  const onSavedSoundClick: OnSavedSoundClick = (
    gridInfo,
    index,
    savedSound
  ) => {
    setSoundModalStatus({
      savedSound,
      isModalOpen: true,
      modalOpenedGridPosition: gridInfo,
      clickedGridIndex: index,
    });
  };

  const onSoundSave: OnSoundSave = (title, file) => {
    if (!!file) {
      const audioUrl = URL.createObjectURL(file);

      //TODO: 이중에 서버로 올라가야 할 것
      // index: number,
      // gridPosition: {
      //   column: string;
      //   row: string;
      // }
      // audioInfo: {title: string, src: string;}

      const gridDataWithSound: SoundGridData = {
        index: soundModalStatus.clickedGridIndex,
        key: title + file.name,
        gridPosition: soundModalStatus.modalOpenedGridPosition,
        showGrid: true,
        onGridClick: onGridClick,
        soundInfo: {
          title: title,
          src: audioUrl,
          key: audioUrl,
          onSoundContainerClick: () =>
            onSavedSoundClick(
              soundModalStatus.modalOpenedGridPosition,
              soundModalStatus.clickedGridIndex,
              { name: title, file }
            ),
        },
      };

      if (!!soundGridData) {
        const newSoundGridData = [...soundGridData];
        newSoundGridData[soundModalStatus.clickedGridIndex] = gridDataWithSound;
        setSoundGridData(newSoundGridData);
      }
      return;
    }

    const clickedGridData = soundGridData[soundModalStatus.clickedGridIndex];
    if (!!soundGridData && clickedGridData.soundInfo) {
      clickedGridData.soundInfo.title = title;
      const newSoundGridData = [...soundGridData];
      newSoundGridData[soundModalStatus.clickedGridIndex] = clickedGridData;
      setSoundGridData(newSoundGridData);
    }
  };

  const onSoundDelete: OnSoundDelete = (gridPosition: GridInfo) => {
    if (!!soundGridData) {
      const newSoundGridData = [...soundGridData];
      newSoundGridData[soundModalStatus.clickedGridIndex] = {
        index: soundModalStatus.clickedGridIndex,
        key: `row${gridPosition.row[0]}column${gridPosition.column[0]}`,
        gridPosition: gridPosition,
        showGrid: true,
        onGridClick: onGridClick,
      };

      setSoundGridData(newSoundGridData);
    }
  };

  const getSoundRefList = () => {
    return Object.keys(soundRefs.current);
  };

  const onAdditionalEventSave: OnAdditionalEventSave = (soundName, action) => {
    console.log(soundName, action);
  };

  return (
    <SoundLayerSection height={height} width={width} show>
      {soundGridData.map((data) => {
        const { index, key, gridPosition, showGrid, onGridClick, soundInfo } =
          data;

        return (
          <GridForSoundCreator
            index={index}
            key={key}
            gridPosition={gridPosition}
            showGrid={showGrid}
            onGridClick={onGridClick}
          >
            {soundInfo && (
              <SoundContainer onClick={soundInfo.onSoundContainerClick}>
                {soundInfo.title}
                <StyledAudio
                  ref={refCallback}
                  data-name={soundInfo.title}
                  controls
                >
                  <source src={soundInfo.src} />
                </StyledAudio>
              </SoundContainer>
            )}
          </GridForSoundCreator>
        );
      })}
      {soundModalStatus.isModalOpen && (
        <SoundSaveModal
          setModalStatus={setSoundModalStatus}
          modalStatus={soundModalStatus}
          onSoundUpload={onSoundSave}
          onAudioDelete={onSoundDelete}
          soundRefList={getSoundRefList()}
          onAdditionalEventSave={onAdditionalEventSave}
        />
      )}
      <button
        onClick={() => {
          fetch("/api/insertAudioInfo", {
            method: "PUT",
            body: JSON.stringify(soundGridData),
          });
        }}
      >
        업로드
      </button>
    </SoundLayerSection>
  );
};

export { SoundLayer };
export type {
  OnGridClick,
  OnSoundSave,
  SoundModalStatus,
  GridInfo,
  SavedSound,
  OnSoundDelete,
  SoundRefs,
  OnAdditionalEventSave,
};
