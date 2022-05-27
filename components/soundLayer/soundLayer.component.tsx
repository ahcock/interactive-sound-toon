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

type SavedSound = { name: string; file?: File | null };

type OnGridClick = (gridInfo: GridInfo, index: number) => void;

type OnSavedSoundClick = (
  gridInfo: GridInfo,
  index: number,
  savedSound: SavedSound
) => void;

type OnSoundSave = (
  title: string,
  file?: File,
  volume?: number,
  savedSound?: SavedSound
) => void;

type OnSoundDelete = (gridPosition: GridInfo) => void;

type OnAdditionalEventSave = (soundName: string, action: string) => void;

interface ISoundModalStatus {
  isModalOpen: boolean;
  modalOpenedGridPosition: GridInfo;
  savedSound?: SavedSound;
  clickedGridIndex: number;
}

interface ISoundRefs {
  [key: string]: HTMLAudioElement;
}

interface ISoundLayerProps {
  imageLayerDimension: {
    height: number;
    width: number;
  };
}

interface ISoundGridData {
  index: number;
  key: string;
  gridPosition: GridInfo;
  showGrid: boolean;
  onGridClick: OnGridClick;
  soundInfo?: {
    src?: string;
    title: string;
    volume: number;
    key: string;
    onSoundContainerClick: () => void;
    action?: string;
  };
}

// TODO: 등록된 사운드 어딘가에 저장하기
// TODO: 저장된 사운드 불러오기, 렌더링 하기
// TODO: 서버에 사운드를 저장하기
// TODO: 서버에서 사운드를 불러오기, 렌더링 하기
// TODO: 데이터 베이스 스키마는 어떻게 짤 것인가?
// TODO: 회차별로 짤 것인가?

const SoundLayer: FC<ISoundLayerProps> = ({
  imageLayerDimension: { height, width },
}) => {
  const [soundGridData, setSoundGridData] = useState<ISoundGridData[]>([]);
  const [soundModalStatus, setSoundModalStatus] = useState<ISoundModalStatus>({
    isModalOpen: false,
    modalOpenedGridPosition: {
      column: "",
      row: "",
    },
    clickedGridIndex: 0,
  });

  const [savedSoundGridData, setSavedSoundGridData] = useState<
    ISoundGridData[]
  >([]);

  const soundRefs = useRef<ISoundRefs>({});

  // TODO: 사운드 저장시 필요한 것 아래 push되는 항목에서 onGridClick. showGrid 빼고

  useEffect(function registerSoundGrid() {
    const soundGridInfo: ISoundGridData[] = [];

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
              //TODO: https://bobbyhadz.com/blog/javascript-get-all-attributes-of-element 적용
              const soundName = entry.target.getAttribute("data-name");
              const action = entry.target.getAttribute("data-action");
              const volume = entry.target.getAttribute("data-volume") || "1";

              if (
                entry.isIntersecting &&
                !!action &&
                !!soundName &&
                action === "stop" &&
                soundRefs.current[soundName].currentTime > 0
              ) {
                soundRefs.current[soundName.split("-")[0]].volume = 0.5;
                soundRefs.current[soundName.split("-")[0]].volume = 0.4;
                soundRefs.current[soundName.split("-")[0]].volume = 0.3;
                soundRefs.current[soundName.split("-")[0]].volume = 0.2;
                soundRefs.current[soundName.split("-")[0]].volume = 0.1;
                soundRefs.current[soundName.split("-")[0]].volume = 0;
                soundRefs.current[soundName.split("-")[0]].pause();
                soundRefs.current[soundName.split("-")[0]].currentTime = 0;
                return;
              }

              if (
                entry.isIntersecting &&
                !!soundName &&
                action !== "stop" &&
                soundRefs.current[soundName].currentTime === 0 &&
                soundRefs.current[soundName].paused
              ) {
                soundRefs.current[soundName].volume = parseFloat(volume);
                soundRefs.current[soundName].play();
                return;
              }
            });
          },
          { root: null, rootMargin: "0px", threshold: 0.3 }
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
      const additionalAction = audioNode.getAttribute("data-action");
      const soundName = additionalAction
        ? `${additionalAction}-${audioNode.getAttribute("data-name")}`
        : audioNode.getAttribute("data-name");

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

  const onSoundSave: OnSoundSave = (title, file, volume) => {
    if (!!file) {
      const audioUrl = URL.createObjectURL(file);

      //TODO: 이중에 서버로 올라가야 할 것
      // index: number,
      // gridPosition: {
      //   column: string;
      //   row: string;
      // }
      // audioInfo: {title: string, src: string;}

      const gridDataWithSound: ISoundGridData = {
        index: soundModalStatus.clickedGridIndex,
        key: title + file.name,
        gridPosition: soundModalStatus.modalOpenedGridPosition,
        showGrid: true,
        onGridClick: onGridClick,
        soundInfo: {
          title,
          volume,
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
    //TODO: 입력받은 soundName, action으로 soundGridData에 additionalAction이라는 콤포넌트를 만들어 data-soundName-<action>형식으로 추가하기.
    //TODO: 어쩌면 soundRefs라는 이름을 버리고 보편적 이름을 선택하여, refs뿐만 아니라, additionalAction엘레멘트가 지나갈때 data-soundName-<action> 이름을 인식하여 어떤 사운드 네임의 어떤 액션을 행하도록 IntersectionObserve에서 실행

    const gridDataWithSound: ISoundGridData = {
      index: soundModalStatus.clickedGridIndex,
      key: soundName + action,
      gridPosition: soundModalStatus.modalOpenedGridPosition,
      showGrid: true,
      onGridClick: onGridClick,
      soundInfo: {
        action,
        title: soundName,
        key: soundName + action,
        volume: 1,
        onSoundContainerClick: () =>
          onSavedSoundClick(
            soundModalStatus.modalOpenedGridPosition,
            soundModalStatus.clickedGridIndex,
            { name: soundName }
          ),
      },
    };

    if (!!soundGridData) {
      const newSoundGridData = [...soundGridData];
      newSoundGridData[soundModalStatus.clickedGridIndex] = gridDataWithSound;
      setSoundGridData(newSoundGridData);
    }
    return;
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
                  data-action={soundInfo.action}
                  data-volume={soundInfo.volume}
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
          onSoundSave={onSoundSave}
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
  ISoundModalStatus,
  GridInfo,
  SavedSound,
  OnSoundDelete,
  ISoundRefs,
  OnAdditionalEventSave,
};
